import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/dictionaries";
import { services, type Localized } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

function loc(v: Localized, locale: Locale) { return v[locale]; }

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
      <Badge className="bg-[#eef2ff] text-[#1a4dff] hover:bg-[#eef2ff]">{dict.nav.services}</Badge>
      <h1 className="mt-3 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">{dict.services.title}</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">{dict.services.lead}</p>

      <div className="mt-10 space-y-6">
        {services.map((s, i) => (
          <article
            key={s.id}
            id={s.id}
            className={
              "grid overflow-hidden rounded-[28px] bg-white shadow-sm md:grid-cols-2 " +
              (i % 2 === 1 ? "md:direction-rtl" : "")
            }
          >
            <div className="relative min-h-[240px]">
              <Image src={s.image} alt={loc(s.title, locale)} fill className="object-cover" sizes="50vw" />
              <span className="absolute start-4 top-4 rounded-full bg-[#0a1437] px-3 py-1 text-[11px] font-bold text-white">{s.num} · {loc(s.category, locale)}</span>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8" dir={i % 2 === 1 ? "ltr" : undefined}>
              <h2 className="text-2xl font-black">{loc(s.title, locale)}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {locale === "fr"
                  ? "Des solutions adaptées aux contraintes de chaque client — moyens, équipes et organisation."
                  : locale === "ar"
                    ? "حلول مكيّفة مع قيود كل عميل — وسائل وفرق وتنظيم."
                    : "Solutions tailored to each client's constraints — means, crews and organization."}
              </p>
              <div className="mt-4 flex gap-2">
                <Link href={`/${locale}/demandes`} className="inline-flex items-center gap-1.5 rounded-lg bg-[#1a4dff] px-4 py-2 text-xs font-bold text-white hover:bg-[#0e3bd8]">
                  {dict.common.request} <ArrowRight className="size-3.5 rtl:rotate-180" />
                </Link>
                <Link href={`/${locale}/contact`} className="inline-flex items-center gap-1.5 rounded-lg border border-[#e3e9ff] px-4 py-2 text-xs font-bold hover:bg-[#f6f8ff]">
                  {dict.nav.contact}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-10 rounded-[28px] bg-[#0a1437] p-6 text-white sm:p-10">
        <h2 className="text-2xl font-black">Avant de démarrer.</h2>
        <div className="mt-5 space-y-3">
          {[
            ["Comment demander une prestation ?", "Décrivez les sites, les horaires, les volumes et la date souhaitée via le formulaire."],
            ["Intervenez-vous partout en Algérie ?", "Notre couverture territoriale officielle est confirmée wilaya par wilaya sur la page Réseau."],
            ["Quels véhicules sont disponibles ?", "Consultez la page Flotte pour les catégories et capacités."],
          ].map(([q, a]) => (
            <details key={q} className="group rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold">
                {q} <span className="text-white/60 group-open:rotate-45 transition">+</span>
              </summary>
              <p className="mt-2 text-sm text-white/75">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
