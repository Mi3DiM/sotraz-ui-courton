import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/dictionaries";
import { FleetTabs } from "@/components/pages/FleetTabs";
import { Badge } from "@/components/ui/badge";

export default async function FlottePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
      <Badge className="bg-[#eef2ff] text-[#1a4dff] hover:bg-[#eef2ff]">{dict.nav.flotte}</Badge>
      <h1 className="mt-3 text-4xl font-black sm:text-5xl">{dict.flotte.title}</h1>
      <p className="mt-3 max-w-xl text-sm text-slate-600">{dict.flotte.lead}</p>
      <div className="mt-8"><FleetTabs /></div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { img: "/images/solutions-transport-personnel-v1.webp", t: "Transport de personnel", d: "Le transport quotidien de vos collaborateurs." },
          { img: "/images/solutions-location-vehicules-v1.webp", t: "Location de véhicules", d: "Une flotte mobilisable, avec ou sans chauffeur." },
          { img: "/images/solutions-services-associes-v1.webp", t: "Maintenance automobile", d: "L'atelier qui maintient les moyens disponibles." },
        ].map((c) => (
          <Link key={c.t} href={`/${locale}/services`} className="group relative block h-44 overflow-hidden rounded-3xl">
            <Image src={c.img} alt={c.t} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="40vw" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 text-white">
              <span className="block text-sm font-bold">{c.t}</span>
              <span className="block text-xs text-white/80">{c.d}</span>
            </span>
          </Link>
        ))}
      </div>

      <section className="mt-6 rounded-[28px] bg-[#eef2ff] p-6 text-center sm:p-10">
        <h2 className="text-2xl font-black">Un besoin spécifique en moyens de transport ?</h2>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Link href={`/${locale}/demandes`} className="inline-flex items-center gap-1.5 rounded-lg bg-[#1a4dff] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#0e3bd8]">Demander un devis <ArrowRight className="size-3.5 rtl:rotate-180" /></Link>
          <Link href={`/${locale}/contact`} className="inline-flex items-center gap-1.5 rounded-lg bg-white px-5 py-2.5 text-xs font-bold text-[#0a1437]">Nous contacter</Link>
        </div>
      </section>
    </div>
  );
}
