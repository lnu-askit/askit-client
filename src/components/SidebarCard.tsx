import type { PropsWithChildren } from 'react'

type CardProps = PropsWithChildren & {
  title: string
}

export const SidebarCard = (props: CardProps) => {
  const { title, children } = props
  return (
    <div className="flex h-full w-full flex-col items-center rounded-sm border border-slate-800 bg-slate-700 text-slate-200">
      <div className="w-full border-b border-slate-800 bg-slate-600 p-2 text-center">{title}</div>
      {children}
    </div>
  )
}
