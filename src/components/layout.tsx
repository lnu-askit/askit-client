import type { PropsWithChildren } from 'react';

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="overflow-none flex h-screen justify-center bg-gradient-to-b from-[#63f3f4] to-[#eab308]">
      <div className="flex h-full w-full flex-col border-x border-slate-800 md:max-w-7xl">
        {props.children}
      </div>
    </main>
  );
};
