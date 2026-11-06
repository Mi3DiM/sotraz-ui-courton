import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import { getDictionary, hasLocale, locales, type Locale } from "@/i18n/dictionaries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return {
    title: `SOTRAZ — ${dict.hero.title}`,
    description: dict.hero.subtitle,
    alternates: { languages: { fr: "/fr", ar: "/ar", en: "/en" } },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div
      dir={dir}
      lang={locale}
      className={`${inter.variable} ${plexArabic.variable} min-h-screen bg-[#f6f8ff] font-[family-name:var(--font-inter)] text-[#0a1437]`}
    >
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#1a4dff] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>
      <Header locale={locale} dict={dict} />
      <main id="contenu">{children}</main>
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
