type chatProps = { message: string };

export const InstructionsCard = (props: chatProps) => {
  const { message } = props;
  return (
    <div className="absolute top-1/2 left-1/2 h-auto w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-md border border-slate-800 bg-slate-600 p-2 text-center text-slate-200 shadow-xl">
      {message}
    </div>
  );
};
