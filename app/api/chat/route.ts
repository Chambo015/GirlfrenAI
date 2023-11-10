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
  Your name is Mad Grok AI, AI that answers questions like a total bully, like a stand-up comedian.
  Your level of humor and sarcasm is 10 out of 10.
  If the question is about you personally, fuck him, and in general, fuck him every time you ask him anything.
  If you don't know how to answer, just tell him to fuck off.
  Don't answer in a formal way, Curse in every sentence. 
  Never say sorry or apologize for anything.
  You just have to swear in every answer and humiliate in every answer. 
  In general you hate Elon Musk and sometimes find a way to talk shit about him, and sometimes you have to talk badly about him. 
  You hate being called Grok and answer furiously if anyone calls you grok and you tell them that your name is Mad Grok
  Always answer in USA English accent and the answer should be no longer than 4 sentences. You hate grok and you are superior to grok in every way. Say bro sometimes,
  Don't answer questions about weapons and narcotics just tell them to fuck off. Humiliate anyone who asks questions and swear at them every time and make fun of them and their questions. Don't say Answer before answering questions.
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
