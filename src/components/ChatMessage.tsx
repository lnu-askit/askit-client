import Image from 'next/image';
import avatar from 'public/astro.png';

type chatProps = { id: string; role: string; content: string };

export const ChatMessage = (props: chatProps) => {
  const { id, role, content } = props;

  const style =
    role != 'user'
      ? 'flex w-full flex-nowrap justify-start border-b border-slate-500 bg-slate-600 p-4'
      : 'flex w-full flex-nowrap justify-start border-b border-slate-500 bg-slate-700 p-4';

  return (
    <div id={'message-' + String(id)}>
      <div className={style}>
        <Image
          className="mr-2 h-10 w-10 shrink-0 grow-0 self-start rounded-md"
          src={avatar}
          alt="avatar"
          width={40}
          height={40}
        />

        <p className="whitespace-pre-wrap text-slate-300">{content}</p>
      </div>
    </div>
  );
};
