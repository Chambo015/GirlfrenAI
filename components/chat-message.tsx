import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { ChatMessageActions } from '@/components/chat-message-actions'
import Image from 'next/image';

export interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn('group isolate relative mb-4 flex w-full flex-col items-start px-8 max-md:px-0', message.role === 'user' ? 'items-end' : 'items-start')}
      {...props}
    >
      <div className={cn("flex ", 
          message.role === 'user' ? 'flex-row-reverse gap-5 max-md:gap-0' : 'flex-row gap-8 max-md:gap-0')}>
        <div
          className={cn(
            'flex select-none items-center justify-center self-end bg-transparent shrink-0'
          )}
        >
          {message.role === 'user' ? <Image width={72} height={72} src="/UserAvatar.png" alt="User Avatar" className='relative z-10' /> : <Image width={120} height={120} src="/AngrySticker1.png" alt="Angry Bird" className='max-md:h-[72px] max-md:w-[70px] relative z-10' />}
        </div>
        <div className={cn("relative items-center space-y-2 self-start rounded-xl bg-gradient-to-r px-8 py-4 after:absolute after:bottom-0 after:translate-y-[80%]  max-md:px-4  max-md:py-2", 
            message.role === 'user'
            ? 'mb-[50px] rounded-br-none from-[#921414]/40 via-[#921414] to-[#921414] max-md:after:w-[48px]  after:right-0 after:h-[15px] after:w-[50px] after:translate-x-[50%] max-md:after:translate-x-[54%] after:rotate-[-135deg] after:rounded-l-3xl after:bg-[#921414] '
            : 'mb-[100px] rounded-bl-none from-[#573b44] via-[#573b44]/95 to-[#573b44]/40 after:left-0 after:h-[25px] after:w-[60px] after:translate-x-[-60%] after:-rotate-45 after:rounded-l-3xl  after:bg-[#573b44] max-md:mb-[60px] max-md:ml-[-35px]'
          )}>
          <MemoizedReactMarkdown
            className="prose break-words dark:prose-invert  prose-pre:p-0"
            remarkPlugins={[remarkGfm, remarkMath]}
            components={{
              p({ children }) {
                return <p className="mb-2 !font-days !leading-tight last:mb-0 max-md:text-xs">{children}</p>
              },
              code({ node, inline, className, children, ...props }) {
                if (children.length) {
                  if (children[0] == '▍') {
                    return (
                      <span className="mt-1 animate-pulse cursor-default">▍</span>
                    )
                  }

                  children[0] = (children[0] as string).replace('`▍`', '▍')
                }

                const match = /language-(\w+)/.exec(className || '')

                if (inline) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }

                return (
                  <CodeBlock
                    key={Math.random()}
                    language={(match && match[1]) || ''}
                    value={String(children).replace(/\n$/, '')}
                    {...props}
                  />
                )
              }
            }}
          >
            {message.content}
          </MemoizedReactMarkdown>
          {/*<ChatMessageActions message={message} />*/}
        </div>
      </div>
    </div>
  )
}
