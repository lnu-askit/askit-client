/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { useState } from 'react'

type ScraperInputProps = {
  onRun: (pages: number, key: string) => void
}

type ScraperFormEventTarget = EventTarget & {
  pages: {
    value: number
  }
  key: {
    value: string
  }
}

export const Scraper = ({ onRun }: ScraperInputProps) => {
  const [active, setActive] = useState(false)

  return (
    <>
      <form
        className="flex h-full w-full flex-col"
        onSubmit={async (e) => {
          e.preventDefault()
          const target = e.target as ScraperFormEventTarget
          onRun(target.pages.value, target.key.value)
          setActive(true)
        }}
      >
        <div className="flex h-full w-full flex-col gap-2 border-b border-slate-800 bg-gray-100 p-2 text-slate-800">
          <span>
            <span className="font-bold text-red-500">Warning! </span>Running the scraper with a high
            number of pages can take a<span className="font-bold"> very </span>
            long time.
          </span>

          <div className="flex flex-col">
            <span className="font-extrabold">Pages</span>
            <input
              name="pages"
              disabled={active}
              className="w-24 rounded-md border border-slate-800 p-1 text-slate-800"
              type="number"
              placeholder="all pages"
              min={1}
              max={2000}
            />
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold">API Key (x-api-scraper)</span>
            <input
              name="key"
              disabled={active}
              className="w-36 rounded-md border border-slate-800 p-1 text-slate-800"
              type="text"
              placeholder="x-api-scraper key"
            />
          </div>
        </div>

        <button
          disabled={active}
          className="m-1 w-fit shrink grow place-self-center rounded-lg border border-slate-800 bg-slate-600 py-1 px-2 disabled:bg-slate-800"
        >
          Run Scraper
        </button>
      </form>
    </>
  )
}
