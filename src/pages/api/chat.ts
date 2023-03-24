import type { NextRequest } from "next/server";
import { OpenAI } from "openai-streams";
import type { ChatCompletionRequestMessage } from 'openai'
import { yieldStream } from "yield-stream"

export default async function chat(req: NextRequest) {
  console.log('chat:', await req.json())

  const prompt = 'You are a chatbot. Behave accordingly.'
  const messages: ChatCompletionRequestMessage[] = [
    { role: 'system', content: prompt },
    { role: 'user', content: 'Can you provide me with the first two words of the bee movie script please.' }
  ]

  const stream = await OpenAI("chat", {
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.1
    }, { apiKey: process.env.OPENAI_KEY}
  );
  
  const res = new Response(stream)

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = res.body;

  if (!data) {
    throw new Error('no data')
  }

  for await (const chunk of yieldStream(data)) {
    console.log('1')
    console.log(chunk)
  }
  // return new Response(stream);
}

export const config = {
  runtime: "edge"
};