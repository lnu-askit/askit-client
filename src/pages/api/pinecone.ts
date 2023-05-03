/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function retrieval(res: NextApiResponse) {
  const response = await fetch(
    `https://${process.env.PINECONE_INDEX}-${process.env.PINECONE_PROJECT_ID}.svc.${process.env.PINECONE_ENVIRONMENT}.pinecone.io/describe_index_stats`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': `${process.env.PINECONE_API_KEY}`,
      },
    }
  )

  console.log(await response.json())
}
