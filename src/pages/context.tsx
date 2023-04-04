import { useState } from 'react';
import { MessageInput } from '~/components/MessageInput';

export default function Context() {
  const [context, setContext] = useState('banana');

  const handleNewContext = (content: string) => {
    setContext(content);
  };
  return (
    <>
      <p>{context}</p>
      <MessageInput onSend={handleNewContext} />
    </>
  );
}
