export type RetrievalQueryResponse = {
  results: OuterResult[]
}

type OuterResult = {
  query: string
  results: InnerResult[]
}

type InnerResult = {
  id: string
  text: string
  metadata: Metadata
  embedding: number[]
  score: number
}

type Metadata = {
  source: string
  source_id: string
  url: string
  created_at: string
  author: string
  document_id: string
}
