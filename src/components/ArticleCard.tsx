type articleProps = {
  title: string
  content: string
  url: string
}

export const ArticleCard = (props: articleProps) => {
  const { title, content, url } = props
  return (
    <div
      key={title + url}
      className="flex h-[300px] w-[300px] flex-col items-center gap-2 overflow-y-auto rounded-md border border-slate-800 bg-slate-200 p-2 text-justify text-xs outline-none scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 scrollbar-track-rounded-md scrollbar-thumb-rounded-lg"
    >
      <div className="w-full border-b border-slate-300 pb-2 text-center font-extrabold">
        {title}
      </div>
      <a className="whitespace-nowrap font-semibold decoration-inherit hover:underline" href={url}>
        Source URL
      </a>
      <div className="normal-whitespace ">{content}</div>
    </div>
  )
}
