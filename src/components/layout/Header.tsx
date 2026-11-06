"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X, ArrowRight, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/dictionaries";

const LOCALE_LABELS: Record<Locale, string> = {
  fr: "FR",
  ar: "AR",
  en: "EN",
};

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: {
    nav: Record<string, string>;
    header: { tagline: string };
  };
}) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 140 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y < 140) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/reseau`, label: dict.nav.reseau },
    { href: `/${locale}/flotte`, label: dict.nav.flotte },
    { href: `/${locale}/entreprise`, label: dict.nav.entreprise },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const switchLocale = (next: Locale) => {
    const rest = pathname.replace(/^\/(fr|ar|en)/, "") || "/";
    return `/${next}${rest === "/" ? "" : rest}`;
  };

  return (
    <>
      <header
        className={cn(
          "header-transition z-[60] w-full",
          scrolled
            ? "fixed inset-x-0 top-0 border-b border-[#e3e9ff] bg-white/95 shadow-[0_8px_30px_rgba(10,20,55,0.08)] backdrop-blur"
            : "relative bg-white"
        )}
        style={{ transform: hidden && scrolled ? "translateY(-100%)" : "translateY(0)" }}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#1a4dff] text-white font-black">S</span>
            <span className="leading-none">
              <span className="block text-[19px] font-black tracking-tight text-[#0a1437]">
                SOTRAZ
              </span>
              <span className="block text-[10px] leading-tight text-slate-500">
                {dict.header.tagline}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition hover:bg-[#eef2ff] hover:text-[#1a4dff]",
                  pathname === l.href
                    ? "bg-[#eef2ff] text-[#1a4dff]"
                    : "text-slate-700"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setLocaleOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-full border border-[#e3e9ff] px-3 py-1.5 text-xs font-bold text-[#0a1437] hover:bg-[#eef2ff]"
              >
                <Globe className="size-3.5" />
                {LOCALE_LABELS[locale]}
              </button>
              {localeOpen && (
                <div className="absolute end-0 top-10 z-10 min-w-28 rounded-2xl border border-[#e3e9ff] bg-white p-1.5 shadow-xl">
                  {(
                    [
                      ["fr", "Français"],
                      ["ar", "العربية"],
                      ["en", "English"],
                    ] as [Locale, string][]
                  ).map(([code, label]) => (
                    <Link
                      key={code}
                      href={switchLocale(code)}
                      className={cn(
                        "block rounded-xl px-3 py-1.5 text-sm hover:bg-[#eef2ff]",
                        code === locale && "bg-[#eef2ff] font-bold text-[#1a4dff]"
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={`/${locale}/demandes`}
              className="hidden items-center gap-1.5 rounded-full bg-[#0a1437] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1a4dff] md:inline-flex"
            >
              <Navigation className="size-3.5" />
              {dict.nav.track}
            </Link>
            <Link
              href={`/${locale}/demandes`}
              className="hidden rounded-full bg-[#1a4dff] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#0e3bd8] sm:inline-flex"
            >
              {dict.nav.quote}
            </Link>

            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-full border border-[#e3e9ff] lg:hidden"
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-[#e3e9ff] bg-white px-4 py-4 lg:hidden">
            <nav className="grid gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-[#eef2ff]"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/demandes`}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#1a4dff] px-4 py-3 text-sm font-bold text-white"
              >
                {dict.nav.demandes} <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
              <div className="mt-3 flex gap-2">
                {(["fr", "ar", "en"] as Locale[]).map((code) => (
                  <Link
                    key={code}
                    href={switchLocale(code)}
                    className={cn(
                      "flex-1 rounded-full border py-2 text-center text-xs font-bold",
                      code === locale
                        ? "border-[#1a4dff] bg-[#eef2ff] text-[#1a4dff]"
                        : "border-[#e3e9ff] text-slate-600"
                    )}
                  >
                    {LOCALE_LABELS[code]}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer when fixed so content never jumps under header */}
      {scrolled && <div className="h-[64px]" aria-hidden />}
    </>
  );
}
