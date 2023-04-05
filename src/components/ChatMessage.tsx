import Image from 'next/image';
import user from 'public/user.png';
import assistant from 'public/lnuwhite.png';

type chatProps = { id: string; role: string; content: string };

export const ChatMessage = (props: chatProps) => {
  const { id, role, content } = props;
  const bg = role != 'user' ? 'bg-zinc-600' : 'bg-zinc-700';
  const style = `flex w-full flex-nowrap justify-start border-b border-zinc-800 ${bg} p-4`;
  const avatar = role === 'user' ? user : assistant;

  return (
    <div id={'message-' + String(id)}>
      <div className={style}>
        <Image
          className="mr-6 h-10 w-10 shrink-0 grow-0 self-start rounded-md"
          src={avatar}
          alt="avatar"
          width={40}
          height={40}
        />

        <p className="whitespace-pre-wrap text-zinc-300">{content}</p>
      </div>
    </div>
  );
};
