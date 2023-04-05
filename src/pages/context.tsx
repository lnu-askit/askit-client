/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import { MessageInput } from '~/components/MessageInput';

export default function Context() {
  const [context, setContext] = useState('banana');

  const handleNewContext = async (content: string) => {
    const response = await fetch('/api/retrieval', {
      method: 'POST',
      body: content,
    });

    setContext((await response.json()) as string);
  };
  return (
    <>
      <main className="overflow-none flex h-screen justify-center bg-zinc-700">
        <div className="flex h-full w-full flex-col items-center gap-5 border-x border-zinc-400 p-3 md:max-w-2xl">
          <div className="h-[200px] w-full overflow-y-auto rounded-md bg-zinc-100 p-2 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-thumb-rounded-lg">
            {context}
          </div>
          <MessageInput onSend={handleNewContext} />
        </div>
      </main>
    </>
  );
}
