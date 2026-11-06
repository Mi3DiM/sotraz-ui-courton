import Image from "next/image";
import Link from "next/link";
import { Award, BadgeCheck, FileCheck2, ShieldCheck, Download } from "lucide-react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/dictionaries";
import { Badge } from "@/components/ui/badge";

const CERTS = [
  { code: "ISO 9001", title: "Qualité", desc: "Management de la qualité — suivi, audit et amélioration continue des opérations.", icon: BadgeCheck },
  { code: "ISO 39001", title: "Sécurité routière", desc: "Exigences de sécurité pour les opérations de transport terrestre.", icon: ShieldCheck },
  { code: "RC", title: "Registre de commerce", desc: "SOTRAZ SPA — immatriculation et conformité réglementaire algérienne.", icon: FileCheck2 },
  { code: "TRANSPORT", title: "Autorisations transport", desc: "Autorisations d'exercice pour le transport de personnel et de marchandises.", icon: Award },
];

export default async function CertificationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
      <Badge className="bg-[#eef2ff] text-[#1a4dff] hover:bg-[#eef2ff]">{dict.nav.certifications}</Badge>
      <h1 className="mt-3 text-4xl font-black sm:text-5xl">{dict.certifications.title}</h1>
      <p className="mt-3 max-w-xl text-sm text-slate-600">{dict.certifications.lead}</p>

      {/* Certificate wall */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="relative overflow-hidden rounded-[28px]">
          <Image src="/images/sotraz-maintenance-inspection-v2.webp" alt="Certification" fill className="object-cover" sizes="40vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1437]/80 to-transparent" />
          <div className="relative flex h-full min-h-[320px] flex-col justify-end p-6 text-white">
            <p className="text-sm font-bold">La ponctualité commence bien avant le départ.</p>
            <p className="text-xs text-white/80">Contrôles, consignes et remontées terrain intégrés aux opérations.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {CERTS.map((c) => (
            <article key={c.code} className="rounded-[28px] border border-[#e3e9ff] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-2xl bg-[#eef2ff] text-[#1a4dff]"><c.icon className="size-5" /></span>
                <span className="rounded-full bg-[#0a1437] px-2.5 py-1 text-[10px] font-black tracking-wider text-white">{c.code}</span>
              </div>
              <h2 className="mt-3 text-base font-black">{c.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{c.desc}</p>
              <a href="#" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#1a4dff]">
                <Download className="size-3.5" /> Télécharger (PDF)
              </a>
            </article>
          ))}
        </div>
      </div>

      {/* Seal strip */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[28px] bg-white px-6 py-5 shadow-sm sm:px-8">
        <p className="flex items-center gap-2 text-sm font-black"><BadgeCheck className="size-5 text-[#1a4dff]" /> Engagements vérifiables</p>
        <div className="flex flex-wrap gap-2">
          {["Qualité", "Sécurité", "Conformité", "Traçabilité"].map((s) => (
            <span key={s} className="rounded-full border border-[#e3e9ff] px-3 py-1 text-xs font-semibold text-slate-600">{s}</span>
          ))}
        </div>
        <Link href={`/${locale}/politique-qualite`} className="text-xs font-bold text-[#1a4dff] underline underline-offset-4">Voir notre politique qualité</Link>
      </div>
    </div>
  );
}
