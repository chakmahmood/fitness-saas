"use client";

import { ReactNode, useState } from "react";

import { Sidebar } from "./sidebar";

import { MobileNavbar } from "./mobile-navbar";

import { MobileSidebar } from "./mobile-sidebar";

type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black flex">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Drawer */}
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex-1 flex flex-col">
        {/* Mobile Topbar */}
        <MobileNavbar onOpen={() => setMobileOpen(true)} />

        {/* Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
