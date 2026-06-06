import Link from "next/link";
import { siteConfig } from "@/lib/site-data";

type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

const extraNavItems: NavItem[] = [
  { href: "/hot", label: "热门项目" },
  {
    href: "https://github.com/ismoshushi/learn-codex",
    label: "GitHub 开源",
    external: true,
  },
];

export function SiteHeader() {
  const navItems: NavItem[] = [
    ...siteConfig.nav.slice(0, 2),
    ...extraNavItems,
    ...siteConfig.nav.slice(2),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(8,15,28,0.82)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_top,#f8b55f,#ff6b2c_65%,#7c2d12)] text-sm font-semibold text-white shadow-[0_12px_30px_rgba(255,107,44,0.35)]">
            LC
          </span>
          <span className="text-base font-semibold tracking-[0.18em] text-white uppercase">
            Learn Codex
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-3 text-sm text-slate-300">
          {navItems.map((item) => {
            const isPrimary = item.href === "#";
            const label = item.href === "#" ? "体验 Codex" : item.label;

            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className={
                  isPrimary
                    ? "inline-flex items-center rounded-full bg-orange-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-orange-300"
                    : "px-2 py-1 transition hover:text-white"
                }
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
