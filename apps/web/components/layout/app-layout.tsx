import { ReactNode } from "react";

import { Sidebar } from "./sidebar";

type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
