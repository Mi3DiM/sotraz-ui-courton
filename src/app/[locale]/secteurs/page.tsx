import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/dictionaries";
import { sectors, type Localized } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

function loc(v: Localized, locale: Locale) { return v[locale]; }

export default async function SecteursPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
      <Badge className="bg-[#eef2ff] text-[#1a4dff] hover:bg-[#eef2ff]">{dict.nav.secteurs}</Badge>
      <h1 className="mt-3 text-4xl font-black sm:text-5xl">{dict.nav.secteurs}</h1>
      <p className="mt-3 max-w-xl text-sm text-slate-600">Des dispositifs adaptés aux rythmes industriels et aux réalités du territoire algérien.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sectors.map((s, i) => (
          <Link key={s.name.en} href={`/${locale}/demandes`} className="group relative overflow-hidden rounded-[28px] bg-white shadow-sm">
            <div className="relative h-40">
              <Image src={i % 2 === 0 ? "/images/industrial-site.webp" : "/images/sotraz-fleet-overview-v2.webp"} alt={loc(s.name, locale)} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="40vw" />
              <span className="absolute start-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#0a1437]">SECTEUR {i + 1}</span>
            </div>
            <div className="p-5">
              <h2 className="text-base font-black">{loc(s.name, locale)}</h2>
              <p className="mt-1 text-xs text-slate-500">{loc(s.note, locale)}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#1a4dff]">Parler à nos équipes <ArrowRight className="size-3.5 rtl:rotate-180" /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
