import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

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
          onSend(input.trim());
          setInput('');
        }}
      >
        <div className="relative flex max-h-[120px] w-full flex-grow grow flex-col rounded-md bg-slate-100 py-0.5">
          <TextareaAutosize
            tabIndex={0}
            minRows={1}
            maxRows={4}
            className="normal-whitespace h-auto w-full resize-none break-words bg-transparent p-2 pr-8 outline-none scrollbar-thin scrollbar-thumb-slate-600 scrollbar-thumb-rounded-lg"
            name="message"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            required
          />
          <button className="absolute bottom-2 right-2.5 rounded-md p-1 text-slate-500 hover:bg-slate-700">
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              className="mr-1 h-4 w-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
