"use client";

import { X } from "lucide-react";

import { Sidebar } from "./sidebar";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileSidebar({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="absolute left-0 top-0 h-full w-72 bg-zinc-950 border-r border-zinc-800">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-white">
            <X size={28} />
          </button>
        </div>

        <Sidebar mobile />
      </div>
    </div>
  );
}
