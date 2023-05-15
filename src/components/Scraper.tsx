/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
export const Scraper = () => {
  async function runScraper(pages: number, key: string) {
    await fetch('https://api-and-scraper:8080/api/run-scraper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-scraper-key': key,
      },
      body: JSON.stringify({
        pages: pages,
      }),
    })
  }

  return (
    <>
      <form
        className="flex h-full flex-col"
        onSubmit={async (e) => {
          e.preventDefault()
          await runScraper(1, 'keykey')
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
              className="w-36 rounded-md border border-slate-800 p-1 text-slate-800"
              type="text"
              placeholder="x-api-scraper key"
            />
          </div>
        </div>

        <button className="m-1 w-fit shrink grow place-self-center rounded-lg border border-slate-800 bg-slate-600 py-1 px-2 disabled:border-spacing-1 disabled:bg-slate-800">
          Run Scraper
        </button>
      </form>
    </>
  )
}
