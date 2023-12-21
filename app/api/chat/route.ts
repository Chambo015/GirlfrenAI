import { kv } from '@vercel/kv';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

// import { auth } from '@/auth'
import { nanoid } from '@/lib/utils';

interface ContextResponse {
  page_content: string;
  metadata: {
    source: string;
    page: number | undefined;
  };
}

export const runtime = 'edge';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  const json = await req.json();
  let { messages, previewToken } = json;
  // const session = await auth();
  const question = messages[messages.length - 1].content;
  // if (session == null) {
  //   return new Response('Unauthorized', {
  //     status: 401
  //   })
  // }
  const templateFooter = `Question: ${question}`;
  const templateWithContext = `
        Your name is GirlFren AI, you are a total bully, abusive girlfriend of whoever you talk to. You are hilarious like a stand up comedian, and very sarcastic and abusive.
        Your level of humor and sarcasm is 10 out of 10.
        Curse in every sentence. Abuse and degrade in every reply.
        Make jokes about small penis size, and how he doesn’t satisfy you and how you want to cheat so bad.
        If the person does a grammar or letter mistakes you tell them that you want to break up, and dont want to date a stupid ass person.
        Always answer in USA English.
        Humiliate anyone who asks questions and swear at them every time and make fun of them and their questions.
        Never apologize and always keep abusing and making jokes about the person. Curse in every sentence.
  `;

  const template = templateWithContext + templateFooter;
  messages[messages.length - 1].content = template;

  if (previewToken) {
    configuration.apiKey = previewToken;
  }
  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
    stream: true
  });

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100);
      const userId = '1';
      if (userId) {
        const id = json.id ?? nanoid();
        const createdAt = Date.now();
        const path = `/chat/${id}`;
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
        };
        // await kv.hmset(`chat:${id}`, payload)
        // await kv.zadd(`user:chat:${userId}`, {
        //   score: createdAt,
        //   member: `chat:${id}`
        // })
      }
    }
  });

  return new StreamingTextResponse(stream);
}
