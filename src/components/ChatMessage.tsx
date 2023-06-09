import Image from 'next/image';
import user from 'public/user.png';
import assistant from 'public/lnuwhite.png';

type chatProps = { id: string; role: string; content: string };

export const ChatMessage = (props: chatProps) => {
  const { id, role, content } = props;
  const bg = role != 'user' ? 'bg-slate-600' : 'bg-slate-700';
  const style = `flex w-full flex-nowrap justify-start border-b border-slate-800 ${bg} p-4 px-20`;
  const avatar = role === 'user' ? user : assistant;

  return (
    <div id={'message-' + String(id)} className={style}>
      <Image
        className="mr-6 h-9 w-9 shrink-0 grow-0 self-start rounded-md"
        src={avatar}
        alt="avatar"
        width={36}
        height={36}
      />

      <p className="whitespace-pre-wrap text-slate-200">{content}</p>
    </div>
  );
};
