import { useState } from 'react';
import { MessageInput } from '~/components/MessageInput';

export default function Context() {
  const [context, setContext] = useState('banana');

  const handleNewContext = (content: string) => {
    setContext(content);
  };
  return (
    <>
      <main className="overflow-none flex h-screen justify-center bg-slate-700">
        <div className="flex h-full w-full flex-col items-center gap-5 border-x border-slate-400 p-3 md:max-w-2xl">
          <p>{context}</p>
          <MessageInput onSend={handleNewContext} />
        </div>
      </main>
    </>
  );
}
