/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import Head from 'next/head'
import { useState } from 'react'
import { AdminPageLayout } from '~/components/adminLayout'
import { dummyData } from 'utils/dummyContent'

export type InfoblobProps = {
  title: string
  content: string
  url: string
}

export default function Home() {
  const [data, setData] = useState<InfoblobProps[]>(dummyData)

  return (
    <>
      <Head>
        <title>AskIT</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminPageLayout>
        <div className="flex h-full w-1/3 flex-col gap-1 overflow-hidden p-1 text-slate-200">
          <div className="mr-2 flex h-auto w-full flex-col rounded-sm border border-slate-800 bg-slate-700 text-slate-200">
            <div className="border-b border-slate-800 bg-slate-600 p-2 text-center">
              API Management
            </div>
            <div className="flex w-full justify-evenly gap-2 p-1">
              <button className="w-auto shrink-0 grow rounded-md border border-slate-800 bg-slate-600 p-1">
                Start Scraper
              </button>
              <button className="w-auto shrink-0 grow rounded-md border border-slate-800 bg-slate-600 p-1">
                Sync with Pinecone
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-full w-full flex-col bg-slate-700">
          <div className="w-full flex-nowrap border-b border-slate-800 bg-slate-600 p-2 text-center text-slate-200">
            Scraped Content
          </div>
          <div className="p flex w-full flex-wrap justify-evenly gap-2 overflow-y-auto py-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-500 scrollbar-thumb-rounded-lg">
            {data.map(({ title, content, url }) => (
              <div
                key={title + url}
                className="normal-whitespace flex h-[300px] w-[300px] resize-none flex-col items-center gap-2 overflow-y-auto rounded-md border border-slate-800 bg-slate-200 bg-transparent p-2 text-justify text-xs outline-none scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 scrollbar-track-rounded-md scrollbar-thumb-rounded-lg"
              >
                <div className="w-full border-b border-slate-300 pb-2 text-center font-extrabold">
                  {title}
                </div>
                <a
                  className="whitespace-nowrap font-semibold decoration-inherit hover:underline"
                  href={url}
                >
                  Source URL
                </a>
                <div>{content}</div>
              </div>
            ))}
          </div>
        </div>
      </AdminPageLayout>
    </>
  )
}