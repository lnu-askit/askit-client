import { useState } from 'react'

export const Pinecone = () => {
  const [indexMetadata, setIndexMetadata] = useState({
    name: null,
    region: null,
    dimensions: 0,
    vectors: 0,
  })

  return (
    <>
      <div className="flex h-full w-full flex-col gap-2 border-b border-slate-800 bg-gray-100 p-2 text-slate-800">
        <div className="flex flex-col">
          <span className="font-extrabold">Index Name</span>
          <span className="font-semibold">{indexMetadata.name}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold">Region</span>
          <span className="font-semibold">{indexMetadata.region}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold">Dimensions</span>
          <span className="font-semibold">{indexMetadata.dimensions}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold">Current Total Vectors (Articles)</span>
          <span className="font-semibold">{indexMetadata.vectors}</span>
        </div>
      </div>
      <button className="m-1 w-fit shrink grow rounded-lg border border-slate-800 bg-slate-600 py-1 px-2">
        Sync Local Content to Pinecone
      </button>
    </>
  )
}
