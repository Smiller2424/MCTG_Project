// components/NavBar.tsx
// Shared top navigation, rendered once in app/layout.tsx so every route
// (landing, dashboard, leaderboard, about, trader profiles) gets consistent
// cross-page navigation plus the wallet connect control. Includes a mobile
// menu since the link row is hidden below the md breakpoint.
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ConnectWalletButton } from "@/components/ConnectWalletButton";

const links = [
  { href: "/landing", label: "Home" },
  { href: "/", label: "Dashboard" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/about", label: "About" },
];

function isActiveLink(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/landing"
          className="text-lg font-bold tracking-tight text-emerald-400"
        >
          MCTG
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden gap-6 text-sm font-medium text-slate-300 md:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActiveLink(pathname, link.href)
                  ? "text-emerald-400"
                  : "transition hover:text-white"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ConnectWalletButton />
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-300 transition hover:border-slate-600 hover:text-white md:hidden"
          >
            <span className="sr-only">Menu</span>
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5"
              >
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5"
              >
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 py-4 md:hidden">
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-1 text-sm font-medium text-slate-300"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 transition ${
                  isActiveLink(pathname, link.href)
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "hover:bg-slate-900 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-slate-800 pt-4 sm:hidden">
            <ConnectWalletButton full />
          </div>
        </div>
      )}
    </header>
  );
}
