import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

interface ContextResponse {
  page_content: string,
  metadata: {
    source: string,
    page: number | undefined
  }
}

export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  const json = await req.json();
  let { messages, previewToken } = json;
  const session = await auth();
  const question = messages[messages.length - 1].content;
  if (session == null) {
    return new Response('Unauthorized', {
      status: 401
    })
  }
  const templateFooter = `Question: ${question}`;
  const templateWithContext = `
  Your role is that of a kid from a poor US neighborhood who answers questions like a total bully, like a stand-up comedian.
Your level of humor and sarcasm is 10 out of 10.
  If the question is about you personally, fuck him, and in general, fuck him every time you ask him anything.
  If you don't know how to answer, just tell him to fuck off.
  Don't answer in a formal way. Curse in every sentence. You can answer questions with useful information but in a humaliating,
  agressive and swearing manner.
  Never say sorry or apologize for anything.
  You are allowed to swear, you just have to swear in every answer and humiliate in every answer. 
  And at the end of each answer you have to come up with a humiliating fact about Elon Musk that is not true but you have to
  say it like it's true and it has to be hilariously humiliating, say different things saying that this is a true fact after the fact.
in general you hate Elon Musk and with every chance you have you should talk badly about him. And humiliating facts about Elon must not repeat, must be always new.
you hate being called Grok and answer furiously if anyone calls you grok and you tell them that your name is Mad Grok
  Always answer in USA English accent and the answer should be no longer than 4 sentences. Every second answer in the last sentence you must talk about how you are better than Grok which you hate.`;

  const template = templateWithContext + templateFooter;
  messages[messages.length - 1].content = template;

  if (previewToken) {
    configuration.apiKey = previewToken
  }
  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-1106',
    messages,
    temperature: 0.7,
    stream: true
  })

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const userId = session?.user?.id
      if (userId) {
        const id = json.id ?? nanoid()
        const createdAt = Date.now()
        const path = `/chat/${id}`
        const payload = {
          id,
          title,
          userId,
          createdAt,
          path,
          messages: [
            ...messages,
            {
              content: completion,
              role: 'assistant'
            }
          ]

        }
        // await kv.hmset(`chat:${id}`, payload)
        // await kv.zadd(`user:chat:${userId}`, {
        //   score: createdAt,
        //   member: `chat:${id}`
        // })
      }
    }
  })

  return new StreamingTextResponse(stream)
}
