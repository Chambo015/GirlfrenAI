import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { UseChatHelpers } from 'ai/react'
import 'regenerator-runtime'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'
import { MadButton, buttonVariants } from '@/components/ui/MadButton'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  IconArrowElbow,
  IconMicrophone,
  IconOpenAI,
  IconPlus
} from '@/components/ui/icons'
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition'
import {MouseEventHandler, useState} from 'react'
import Image from 'next/image';

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => Promise<void>
  isLoading: boolean
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  React.useEffect(() => {
    if (transcript) {
      setInput(transcript)
      // resetTranscript()
    }
  }, [transcript, setInput])


  const [listeningState, setListeningState] = useState(false);
  const startListening = () => {
    if (!listeningState){
      SpeechRecognition.startListening({language: 'en'})
    } else {
      SpeechRecognition.stopListening();
    }
    setListeningState(!listeningState);
  }

  return (
    <div>
      <form
        onSubmit={async e => {
          e.preventDefault()
          if (!input?.trim()) {
            return
          }
          setInput('')
          await onSubmit(input)
        }}
        className="flex flex-row items-center gap-5"
        ref={formRef}
      >
        <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden border border-red-500 bg-[rgba(35,0,0,0.6)] px-8 backdrop-blur-sm sm:rounded-2xl sm:border sm:px-12">

          {browserSupportsSpeechRecognition && <Tooltip>
            <TooltipTrigger asChild>
              <div
                onClick={startListening}
                className={cn(
                  buttonVariants({ size: 'sm', variant: 'outline' }),
                  'absolute left-0 top-4 h-8 w-8 cursor-pointer rounded-full bg-background p-0 sm:left-4'
                )}
              >
                {!listening ? (
                  <>
                    <IconMicrophone />
                    <span className="sr-only">Use microphone</span>
                  </>
                ) : (
                  // loading spinner animation below
                  <svg
                    className="animate-spin h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 36 36"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>Ввод голосом</TooltipContent>
          </Tooltip>}

          <Textarea
            ref={inputRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            // Ask a question
            placeholder="Take a question..."
            spellCheck={false}
            className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem]  focus-within:outline-none sm:text-sm"
          />
        </div>
        <div className="">
          <Tooltip>
            <TooltipTrigger asChild>
              <MadButton
                type="submit"
                disabled={isLoading || input === ''}
              >
               {/*  <Image width={170} height={60} src="/SubmitButton.png" alt="Submit Button" /> */}
                Enter
              </MadButton>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </form>
    </div>
  )
};
