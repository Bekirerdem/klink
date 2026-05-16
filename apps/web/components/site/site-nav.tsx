"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "pay", label: "Pay", href: "/pay/demo" },
  { id: "merchant", label: "Mekan", href: "/m/kafe-bogaz" },
  { id: "tips", label: "Bahşiş", href: "/staff" },
  { id: "onboard", label: "Onboard", href: "/onboard" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink text-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-display text-[15px] font-bold tracking-[-0.01em]"
        >
          <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-monad-purple text-white shadow-[0_4px_12px_rgba(110,84,255,0.4)]">
            <span className="font-mono text-[12px] font-bold">K</span>
          </span>
          <span className="uppercase tracking-[0.08em]">KLINK</span>
          <ChevronDown className="h-3.5 w-3.5 text-white/60" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-[13px] font-medium text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/onboard"
          className="inline-flex h-9 items-center rounded-pill bg-monad-purple px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-monad-button transition-transform hover:scale-[1.04]"
        >
          GET STARTED
        </Link>
      </nav>
    </header>
  );
}
