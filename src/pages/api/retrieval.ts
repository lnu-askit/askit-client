import type { NextApiRequest, NextApiResponse } from 'next'

type RetrievalApiInput = {
  query: string
}

export default async function retrieval (req: NextApiRequest, res: NextApiResponse) {
  const { query } = (await req.body) as RetrievalApiInput

  const response = await fetch('http://api-and-scraper:8080/api/get-context', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      'x-scraper-key': `${process.env.SCRAPER_KEY}`,
    },
    body: JSON.stringify({
      history: "",
      currentQuery: query
    })
  })

  const json = await response.json()
  let result = ""
  for (let i = 0; i < json.context.length; i++) {
    result += json.context[i].information
    result += "url: " + json.context[i].url
  }

  res.status(200).json(result)
}
