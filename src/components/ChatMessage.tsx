import Image from "next/image";
import avatar from "public/astro.png";

type chatProps = { id: string; role: string; content: string };

export const ChatMessage = (props: chatProps) => {
  const { id, role, content } = props;

  if (role != "user") {
    return (
      <div id={"message-" + String(id)}>
        <div className="flex w-full flex-nowrap justify-start">
          <div className="order-0 mr-2 h-10 w-10 shrink-0 grow-0 self-end rounded-md">
            <Image
              className="rounded-md"
              src={avatar}
              alt="avatar"
              width={40}
              height={40}
            />
          </div>

          <p className="max-w-lg whitespace-pre-wrap rounded-tl-lg rounded-tr-lg rounded-br-lg bg-sky-200 p-2">
            {content}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div id={"message-" + String(id)}>
        <div className="flex w-full flex-nowrap justify-end">
          <div className="order-1 ml-2 h-10 w-10 shrink-0 grow-0 self-end rounded-md">
            <Image
              className="rounded-md"
              src={avatar}
              alt="avatar"
              width={40}
              height={40}
            />
          </div>

          <p className="max-w-lg whitespace-pre-wrap rounded-tl-lg rounded-tr-lg rounded-bl-lg bg-slate-100 p-2">
            {content}
          </p>
        </div>
      </div>
    );
  }
};
