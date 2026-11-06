import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/dictionaries";
import { Badge } from "@/components/ui/badge";

export default async function QualitePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  const ITEMS = [
    ["Prévention et sécurité", "Contrôles, consignes et remontées terrain intégrés aux opérations."],
    ["Maintenance planifiée", "Une disponibilité construite par l’entretien et l’anticipation."],
    ["Qualité de service", "Des points de contrôle clairs tout au long de la prestation."],
    ["Formation des équipes", "Des pratiques actualisées au contact des réalités du terrain."],
  ] as const;

  return (
    <div className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
      <Badge className="bg-[#eef2ff] text-[#1a4dff] hover:bg-[#eef2ff]">{dict.nav.qualite}</Badge>
      <h1 className="mt-3 max-w-2xl text-4xl font-black sm:text-5xl">La ponctualité commence bien avant le départ.</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {ITEMS.map(([t, d], i) => (
          <article key={t} className="rounded-[28px] bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-black text-[#1a4dff]">ENGAGEMENT {String(i + 1).padStart(2, "0")}</p>
            <h2 className="mt-2 text-xl font-black">{t}</h2>
            <p className="mt-1 text-sm text-slate-600">{d}</p>
          </article>
        ))}
      </div>
      <section className="mt-6 rounded-[28px] bg-[#0a1437] p-6 text-white sm:p-8">
        <h2 className="text-xl font-black">Confidentialité & conditions</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/80">
          Les informations transmises via les formulaires sont utilisées uniquement pour traiter votre demande.
          Aucune cession à des tiers sans consentement. Vos droits (accès, rectification) s&apos;exercent via contact@sotraz.dz.
        </p>
      </section>
    </div>
  );
}
