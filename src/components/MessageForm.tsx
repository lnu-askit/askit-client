import { type FormEvent } from "react";

export default function MessageForm() {
  const handleSubmit = (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    (event.target as HTMLInputElement).value = "";

    console.log("banana");
  };

  return (
    <form action="/api/recieve" onSubmit={handleSubmit}>
      <div className="no-wrap flex p-2">
        <textarea
          tabIndex={0}
          className="normal-whitespace h-20 w-full max-w-full grow resize-none break-words rounded-md bg-slate-100 p-2"
          id="message"
          name="message"
          required
        />

        <button
          className="ml-2 h-10 shrink-0 grow-0 rounded-md bg-gray-500 pl-3 pr-3"
          type="submit"
        >
          Send
        </button>
      </div>
    </form>
  );
}
