/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { useState } from 'react'
import type { PineconeProps } from '~/pages/data'

type PineconeComponentProps = PineconeProps & {
  onUpload: () => void
}

export const Pinecone = (props: PineconeComponentProps) => {
  const { name, region, dimensions, vectors, onUpload } = props
  const [active, setActive] = useState(false)

  return (
    <>
      <form
        className="flex h-full w-full flex-col"
        onSubmit={async (e) => {
          e.preventDefault()
          onUpload()
          setActive(true)
        }}
      >
        <div className="flex h-full w-full flex-col gap-2 border-b border-slate-800 bg-gray-100 p-2 text-slate-800">
          <div className="flex flex-col">
            <span className="font-extrabold">Index Name</span>
            <span className="font-semibold">{name}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold">Region</span>
            <span className="font-semibold">{region}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold">Dimensions</span>
            <span className="font-semibold">{dimensions}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold">Current Total Vectors (Articles)</span>
            <span className="font-semibold">{vectors}</span>
          </div>
        </div>

        <button
          disabled={active}
          className="m-1 w-fit shrink grow place-self-center rounded-lg border border-slate-800 bg-slate-600 py-1 px-2 disabled:border-spacing-1 disabled:bg-slate-800"
        >
          Sync Local Content to Pinecone
        </button>
      </form>
    </>
  )
}
