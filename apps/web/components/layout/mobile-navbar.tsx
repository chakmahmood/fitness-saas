"use client";

import { Menu } from "lucide-react";

type Props = {
  onOpen: () => void;
};

export function MobileNavbar({ onOpen }: Props) {
  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950 sticky top-0 z-40">
      <div>
        <h1 className="text-lg font-bold text-white">Fitness SaaS</h1>
      </div>

      <button onClick={onOpen} className="text-white">
        <Menu size={28} />
      </button>
    </div>
  );
}
