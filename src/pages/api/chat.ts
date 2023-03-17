import type { NextApiRequest, NextApiResponse } from "next";
interface SubscribeRequest extends NextApiRequest {
  body: {
    message: string;
  };
}

export default function handler(req: SubscribeRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }

  const messages = req.body;
  //do something with the message

  console.log(messages);

  return res.status(200).json({ success: true });
}
