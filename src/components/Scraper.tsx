export const Scraper = () => {
  return (
    <>
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
      </div>

      <button className="m-1 w-fit shrink grow rounded-lg border border-slate-800 bg-slate-600 py-1 px-2">
        Run Scraper
      </button>
    </>
  )
}
