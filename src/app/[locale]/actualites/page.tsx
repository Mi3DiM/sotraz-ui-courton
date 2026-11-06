import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/dictionaries";
import { Badge } from "@/components/ui/badge";

const NEWS = [
  { tag: "Entreprise", date: "12 juin 2026", title: "Modernisation de la flotte : une nouvelle étape opérationnelle", img: "/images/sotraz-fleet-overview-v2.webp" },
  { tag: "Sécurité", date: "28 mai 2026", title: "Une semaine dédiée aux pratiques de prévention", img: "/images/sotraz-maintenance-inspection-v2.webp" },
  { tag: "Réseau", date: "03 avril 2026", title: "Renforcement temporaire d’un dispositif inter-sites", img: "/images/industrial-site.webp" },
];

export default async function ActualitesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
      <Badge className="bg-[#eef2ff] text-[#1a4dff] hover:bg-[#eef2ff]">{dict.nav.actualites}</Badge>
      <h1 className="mt-3 text-4xl font-black sm:text-5xl">Les nouvelles du terrain.</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Link href={`/${locale}/actualites`} className="group relative block min-h-[320px] overflow-hidden rounded-[28px]">
          <Image src={NEWS[0].img} alt={NEWS[0].title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="60vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="text-xs text-white/80">{NEWS[0].tag} · {NEWS[0].date}</p>
            <h2 className="mt-1 max-w-md text-2xl font-black">{NEWS[0].title}</h2>
            <p className="text-xs text-white/75">Contenu éditorial temporaire à remplacer par une actualité officielle.</p>
          </div>
        </Link>
        <div className="space-y-4">
          {NEWS.slice(1).map((n) => (
            <Link key={n.title} href={`/${locale}/actualites`} className="group flex gap-4 rounded-[28px] bg-white p-4 shadow-sm">
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl">
                <Image src={n.img} alt={n.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="200px" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#1a4dff]">{n.tag} · {n.date}</p>
                <h3 className="mt-1 text-sm font-black leading-snug">{n.title}</h3>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-slate-500">Lire <ArrowRight className="size-3 rtl:rotate-180" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
