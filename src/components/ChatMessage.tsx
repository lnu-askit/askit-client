import Image from "next/image";
import avatar from "public/astro.png";

export default function ChatMessage({
  type,
  content,
}: {
  type: string;
  content: string;
}) {
  const userType = type === "user" ? 1 : 0;

  if (userType === 0) {
    return (
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

        <div className="max-w-lg rounded-tl-lg rounded-tr-lg rounded-br-lg bg-slate-100 p-2">
          {content}
        </div>
      </div>
    );
  } else {
    return (
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

        <div className="max-w-lg rounded-tl-lg rounded-tr-lg rounded-bl-lg bg-slate-100 p-2">
          {content}
        </div>
      </div>
    );
  }
}
