import Link from "next/link";

function GithubGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17.91-.25 1.89-.38 2.86-.39.97.01 1.95.13 2.86.39 2.18-1.48 3.14-1.17 3.14-1.17.63 1.58.23 2.75.12 3.04.73.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.37-5.26 5.65.41.36.78 1.05.78 2.12v3.14c0 .31.21.68.8.56 4.57-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function XGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.659l-5.214-6.817-5.965 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
    </svg>
  );
}

const groups = [
  {
    title: "ÜRÜN",
    links: [
      { label: "Özellikler", href: "#cozum" },
      { label: "Nasıl çalışır", href: "#nasil" },
      { label: "Canlı akış", href: "#canli" },
    ],
  },
  {
    title: "MEKAN",
    links: [
      { label: "Onboarding", href: "/onboard" },
      { label: "Bahşiş havuzu", href: "#cozum" },
      { label: "QR sticker", href: "/onboard" },
    ],
  },
  {
    title: "ÇALIŞAN",
    links: [
      { label: "Bahşişim", href: "/staff" },
      { label: "Off-ramp", href: "/staff" },
    ],
  },
  {
    title: "GELİŞTİRİCİ",
    links: [
      { label: "GitHub", href: "https://github.com/Bekirerdem/klink" },
      { label: "Monad", href: "https://www.monad.xyz" },
      { label: "MONSKILLS", href: "https://skills.devnads.com" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-black/[0.06] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-display text-xl font-bold tracking-tight text-ink"
            >
              <span className="grid h-7 w-7 place-items-center rounded-[10px] bg-monad-purple text-white shadow-monad-button">
                <span className="font-mono text-[13px] font-bold">K</span>
              </span>
              Klink<span className="text-monad-purple">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ink-soft/80">
              Türk F&B'sinin Web3 POS'u. Komisyonsuz. Anlık. Adil.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://github.com/Bekirerdem/klink"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full bg-bg-mute text-ink-soft transition-colors hover:bg-monad-purple-light hover:text-monad-purple"
                aria-label="GitHub"
              >
                <GithubGlyph className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/bekirerdem"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full bg-bg-mute text-ink-soft transition-colors hover:bg-monad-purple-light hover:text-monad-purple"
                aria-label="X (Twitter)"
              >
                <XGlyph className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-4">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-monad-purple">
                  {g.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[14px] text-ink-soft/85 transition-colors hover:text-monad-purple"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-black/[0.05] pt-8 text-[12px] text-ink-link md:flex-row md:items-center">
          <span>© 2026 Klink · Monad Blitz Çanakkale submission</span>
          <span className="font-mono">
            Built on <span className="text-monad-purple">Monad</span> · MIT License
          </span>
        </div>
      </div>
    </footer>
  );
}
