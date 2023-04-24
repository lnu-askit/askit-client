/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { NextRequest } from 'next/server';
import type { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';
import { OpenAIStream } from 'utils/OpenAIStream';
import type { ChatMessageProps } from '..';

type ChatApiInput = {
  system: string;
  context: string;
  chatMessages: ChatMessageProps[];
};

export default async function chat (req: NextRequest) {
  const { system, context, chatMessages } = (await req.json()) as ChatApiInput;

  const systemMessage = formatSystemMessage(system, context);
  const formattedMessages = formatMessages(systemMessage, chatMessages);

  const apiKey = process.env.OPENAI_API_KEY || '';
  const stream: ReadableStream = await OpenAIStream(apiKey, {
    model: 'gpt-3.5-turbo',
    messages: formattedMessages,
    temperature: 0.1,
    max_tokens: 500,
  });

  return new Response(stream);
}

const formatSystemMessage = (system: string, context: string) => {
  return `${system}
  
  CONTEXT: ${context}`;
};

const formatMessages = (systemMessage: string, messages: ChatMessageProps[]) => {
  const filteredMessages: ChatCompletionRequestMessage[] = messages.map(
    (message: { role: string; content: string }) => ({
      role: message.role as ChatCompletionRequestMessageRoleEnum,
      content: message.content,
    })
  );

  const formatted: ChatCompletionRequestMessage[] = [
    { role: 'system', content: systemMessage },
    ...filteredMessages,
  ];

  return formatted;
};

export const config = {
  runtime: 'edge',
};
