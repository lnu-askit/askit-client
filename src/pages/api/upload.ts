/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function upload(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch('http://api-and-scraper:8080/api/upload-scraped', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-scraper-key': `${process.env.SCRAPER_KEY}`,
    },
  })

  res.status(response.status).end()
}
