/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { NextRequest } from 'next/server';
import type { ChatCompletionRequestMessage } from 'openai';
import { OpenAIStream } from 'utils/OpenAIStream';

export interface ChatApiInput {
  messages: ChatCompletionRequestMessage[];
}

export default async function chat(req: NextRequest) {
  const { messages } = await req.json();

  const filteredMessages: ChatCompletionRequestMessage[] = messages.map(
    (message: { role: string; content: string }) => ({
      role: message.role,
      content: message.content,
    })
  );

  const prompt = 'You are a chatbot. Behave accordingly.';
  const sendMessages: ChatCompletionRequestMessage[] = [
    { role: 'system', content: prompt },
    ...filteredMessages,
  ];

  const apiKey = process.env.OPENAI_KEY || '';

  const stream: ReadableStream = await OpenAIStream(apiKey, {
    model: 'gpt-3.5-turbo',
    messages: sendMessages,
    temperature: 0.1,
    max_tokens: 500,
  });

  return new Response(stream);
}

export const config = {
  runtime: 'edge',
};
