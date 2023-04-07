import type { PropsWithChildren } from 'react';

export const AdminPageLayout = (props: PropsWithChildren) => {
  return (
    <main className="overflow-none flex h-screen justify-center bg-gradient-to-b from-[#63f3f4] to-[#eab308]">
      <div className="flex h-full w-full flex-row border-x border-slate-800">{props.children}</div>
    </main>
  );
};
