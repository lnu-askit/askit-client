import type { NextApiRequest, NextApiResponse } from "next";
import type {
  ChatCompletionRequestMessage,
} from "openai";

interface SubscribeRequest extends NextApiRequest {
  body: ChatCompletionRequestMessage[];
}

export default function handler(
  req: SubscribeRequest,
  res: NextApiResponse
) {

  const reqMessages: ChatCompletionRequestMessage[] = req.body;

  console.log(reqMessages)
  setTimeout(() => {
    res.status(200).json({user: 'assistant', content: 'what?'})
    return
  }, 2000)
}
