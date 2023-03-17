/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
import type {
  CreateChatCompletionRequest,
  ChatCompletionRequestMessage
} from "openai";

interface SubscribeRequest extends NextApiRequest {
  body: ChatCompletionRequestMessage[];
}

export default async function handler(
  req: SubscribeRequest,
  res: NextApiResponse
) {

  const reqMessages: ChatCompletionRequestMessage[] = req.body.map((message) => ({
    role: message.role,
    content: message.content
  }));

  const prompt = 'You are a chatbot. Behave accordingly.'
  const messages: ChatCompletionRequestMessage[] = [
    { role: 'system', content: prompt },
    ...reqMessages
  ]

  const chatRequestOpts: CreateChatCompletionRequest = {
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.1
  }

  console.log(messages)
  console.log(chatRequestOpts)

  const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
			headers: {
				Authorization: `Bearer ${OPENAI_KEY}`,
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(chatRequestOpts)
		})

  const answer = await chatResponse.json()

  console.log(answer)
  res.status(200).json(answer.choices[0].message)
}
