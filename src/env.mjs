import { z } from 'zod'

/**
 * Specify your server-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars.
 */
const server = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  OPENAI_API_KEY: z.string().nonempty(),
  BEARER_TOKEN: z.string().nonempty(),
  PINECONE_INDEX: z.string().nonempty(),
  PINECONE_ENVIRONMENT: z.string().nonempty(),
  PINECONE_API_KEY: z.string().nonempty(),
  PINECONE_PROJECT_ID: z.string().nonempty(),
  SCRAPER_KEY: z.string().nonempty(),
})

/**
 * Specify your client-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars. To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
const client = z.object({
  NEXT_PUBLIC_GPT_MODEL: z.enum(['gpt-3.5-turbo', 'gpt-3.5-turbo-0301', 'gpt-4', 'gpt-4-32k']),
  // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
})

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  NEXT_PUBLIC_GPT_MODEL: process.env.NEXT_PUBLIC_GPT_MODEL,
  BEARER_TOKEN: process.env.BEARER_TOKEN,
  PINECONE_INDEX: process.env.PINECONE_INDEX,
  PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
  PINECONE_API_KEY: process.env.PINECONE_API_KEY,
  PINECONE_PROJECT_ID: process.env.PINECONE_PROJECT_ID,
  SCRAPER_KEY: process.env.SCRAPER_KEY
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
}

// Don't touch the part below
// --------------------------

const merged = server.merge(client)

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env)

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === 'undefined'

  const parsed = /** @type {MergedSafeParseReturn} */ (
    isServer
      ? merged.safeParse(processEnv) // on server we can validate all env vars
      : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
  )

  if (parsed.success === false) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
    throw new Error('Invalid environment variables')
  }

  env = new Proxy(parsed.data, {
    get (target, prop) {
      if (typeof prop !== 'string') return undefined
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith('NEXT_PUBLIC_'))
        throw new Error(
          process.env.NODE_ENV === 'production'
            ? '❌ Attempted to access a server-side environment variable on the client'
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`
        )
      return target[/** @type {keyof typeof target} */ (prop)]
    },
  })
}

export { env }

