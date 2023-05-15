import type { NextApiRequest, NextApiResponse } from 'next'

type ScraperApiInput = {
  pages: number,
  key: string
}

export default async function scraper (req: NextApiRequest, res: NextApiResponse) {
  const { pages, key } = (await req.body) as ScraperApiInput

  const response = await fetch('http://api-and-scraper:8080/api/run-scraper', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-scraper-key': key,
    },
    body: JSON.stringify({
      pages: pages,
    }),
  })

  console.log(await response.json())
}
