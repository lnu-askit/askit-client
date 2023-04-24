/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import Head from 'next/head'
import { useRef, useState } from 'react'
import { ChatMessage } from '~/components/ChatMessage'
import { MessageInput } from '~/components/MessageInput'
import { PageLayout } from '~/components/layout'
import { dummyInstructions, dummySystem } from 'utils/dummyContent'
import { InstructionsCard } from '~/components/InstructionsCard'

export type ChatMessageProps = {
  id: string
  role: string
  content: string
  model?: string
}

export default function Home() {
  const context = useRef('')
  const [messages, setMessages] = useState<ChatMessageProps[]>([])

  async function handleNewContext(content: string) {
    const response = await fetch('/api/retrieval', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: content,
      }),
    })

    const json = await response.json()
    context.current = json
  }

  async function handleNewMessage(content: string) {
    const role = 'user'
    const sendMessages = [
      ...messages,
      { id: Math.random().toString(36).substring(2, 15), role, content },
    ]
    setMessages(sendMessages)

    if (context.current === '') {
      await handleNewContext(content)
    }

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system: dummySystem,
        context: context.current,
        chatMessages: sendMessages,
      }),
    })

    if (response.body) {
      const reader = response.body.getReader()
      const decoder = new TextDecoder('utf-8')

      const newBotMessage: ChatMessageProps = {
        id: Math.random().toString(36).substring(2, 15),
        role: 'assistant',
        content: '',
      }

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        const messageText = decoder.decode(value)
        newBotMessage.content += messageText

        // there may be a JSON object at the beginning of the message, which contains the model name (streaming workaround)
        if (!newBotMessage.model && newBotMessage.content.startsWith('{')) {
          const endOfJson = newBotMessage.content.indexOf('}')
          if (endOfJson > 0) {
            const json = newBotMessage.content.substring(0, endOfJson + 1)
            try {
              const parsed = JSON.parse(json)
              newBotMessage.model = parsed.model
              newBotMessage.content = newBotMessage.content.substring(endOfJson + 1)
            } catch (e) {
              // error parsing JSON, ignore
              console.log(e)
            }
          }
        }

        setMessages((list) => {
          // find the message to update with new text tokens.
          const message = list.find((message) => message.id === newBotMessage.id)

          // update the message with the new text content, re-render the message-list anyway if the message couldn't be found.
          return !message ? [...list, newBotMessage] : [...list]
        })
      }
    }
  }

  return (
    <>
      <Head>
        <title>AskIT</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        <div className="relative h-full bg-slate-700">
          {context.current === '' && <InstructionsCard message={dummyInstructions()} />}

          <div className="flex h-full flex-col overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-500 scrollbar-thumb-rounded-lg">
            <div className="w-full flex-nowrap border-b border-slate-800 bg-slate-600 p-2 text-center text-slate-200">
              AskIT
            </div>
            {messages.map(({ id, role, content }) => (
              <ChatMessage key={id} id={id} role={role} content={content} />
            ))}
            <div className="m-20"></div>
          </div>

          <div className="from-10% via-50% to-90% absolute bottom-0 w-full bg-gradient-to-t from-slate-700 via-slate-700 py-10 px-20">
            <MessageInput onSend={handleNewMessage} />
          </div>
        </div>
      </PageLayout>
    </>
  )
}
