"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const sections = [
  { id: "hikaye", label: "Hikaye" },
  { id: "cozum", label: "Çözüm" },
  { id: "nasil", label: "Nasıl Çalışır" },
  { id: "canli", label: "Canlı Akış" },
  { id: "mekanlar", label: "Mekanlar" },
] as const;

export function SiteNav() {
  const [active, setActive] = useState<string>("hikaye");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0% -55% 0%", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-monad",
        scrolled
          ? "border-b border-black/[0.06] bg-white/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-display text-[19px] font-bold tracking-tight text-ink"
        >
          <span className="grid h-7 w-7 place-items-center rounded-[10px] bg-monad-purple text-white shadow-monad-button transition-transform group-hover:rotate-[8deg]">
            <span className="font-mono text-[13px] font-bold">K</span>
          </span>
          Klink<span className="text-monad-purple">.</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <Link
              key={s.id}
              href={`#${s.id}`}
              className="relative inline-flex h-9 items-center px-3 text-[13px] font-medium text-ink-soft/85 transition-colors hover:text-ink"
            >
              {s.label}
              {active === s.id && (
                <motion.span
                  layoutId="klink-nav-underline"
                  className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-monad-purple"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </Link>
          ))}
        </div>

        <Link
          href="/pay/demo"
          className={cn(
            "inline-flex h-9 items-center gap-1.5 rounded-pill bg-ink px-4 text-[13px] font-semibold text-white",
            "transition-transform duration-150 ease-monad hover:scale-[1.04]",
          )}
        >
          Demo Aç
          <span aria-hidden>→</span>
        </Link>
      </nav>
    </header>
  );
}
