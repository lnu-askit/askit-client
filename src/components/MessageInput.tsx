import { useState } from 'react';

type MessageInputProps = {
  onSend: (content: string) => void;
};

export const MessageInput = ({ onSend }: MessageInputProps) => {
  const [input, setInput] = useState('');

  return (
    <div className="h-auto w-full place-self-end bg-slate-700">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend(input);
          setInput('');
        }}
      >
        <div className="no-wrap flex p-2">
          <textarea
            tabIndex={0}
            className="normal-whitespace h-20 w-full max-w-full grow resize-none break-words rounded-md bg-slate-100 p-2 outline-none"
            name="message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button className="ml-2 h-10 shrink-0 grow-0 rounded-md bg-gray-500 pl-3 pr-3">
            SEND
          </button>
        </div>
      </form>
    </div>
  );
};
