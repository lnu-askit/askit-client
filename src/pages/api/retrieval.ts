import type { NextApiRequest, NextApiResponse } from 'next'
import type { RetrievalQueryResponse } from '~/types/retrievalQueryResponse'

type RetrievalApiInput = {
  query: string
}

export default async function retrieval(req: NextApiRequest, res: NextApiResponse) {
  const { query } = (await req.body) as RetrievalApiInput

  const response = await fetch('http://retrieval-plugin:8080/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
    body: JSON.stringify({
      queries: [
        {
          query: query,
          filter: {
            source: 'email',
          },
          top_k: 3,
        },
      ],
    }),
  })

  const json = (await response.json()) as RetrievalQueryResponse
  const topResult = json?.results[0]?.results[0]?.text

  res.status(200).json(topResult)
}
