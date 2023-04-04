import { useState } from 'react';

type MessageInputProps = {
  onSend: (content: string) => void;
};

export const MessageInput = ({ onSend }: MessageInputProps) => {
  const [input, setInput] = useState('');

  return (
    <div className="h-max w-full rounded-md bg-slate-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend(input);
          setInput('');
        }}
      >
        <div className="flex-no-wrap flex w-full gap-2 p-2">
          <textarea
            tabIndex={0}
            className="normal-whitespace h-16 grow resize-none break-words bg-slate-100 outline-none"
            name="message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button className="h-10 shrink-0 self-center rounded-md bg-slate-600 p-1 text-slate-200">
            send
          </button>
        </div>
      </form>
    </div>
  );
};
