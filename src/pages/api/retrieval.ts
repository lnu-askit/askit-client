import type { NextApiRequest, NextApiResponse } from 'next';

export default function retrieval(req: NextApiRequest, res: NextApiResponse) {
  console.log(req);
  res.status(200).json('this will have a context');
}
