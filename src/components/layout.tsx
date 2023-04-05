import type { PropsWithChildren } from 'react';

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="overflow-none flex h-screen justify-center bg-gradient-to-b from-[#71717a] to-[#3f3f46]">
      <div className="flex h-full w-full flex-col border-x border-zinc-800 md:max-w-4xl">
        {props.children}
      </div>
    </main>
  );
};
