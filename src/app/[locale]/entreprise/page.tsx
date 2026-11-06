import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/dictionaries";
import { Badge } from "@/components/ui/badge";

export default async function EntreprisePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
      <Badge className="bg-[#eef2ff] text-[#1a4dff] hover:bg-[#eef2ff]">{dict.nav.entreprise}</Badge>
      <h1 className="mt-3 max-w-2xl text-4xl font-black sm:text-5xl">Une culture du terrain.</h1>
      <p className="mt-3 max-w-xl text-sm text-slate-600">Une entreprise algérienne organisée autour de la continuité, de la sécurité et de la qualité de service.</p>

      <div className="mt-8 grid overflow-hidden rounded-[28px] bg-white shadow-sm lg:grid-cols-2">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-black">Faire circuler ce qui compte.</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            SOTRAZ accompagne les entreprises dans l&apos;organisation de leurs transports terrestres et la mobilisation de moyens adaptés.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#e3e9ff] p-4">
              <p className="text-xs font-bold text-[#1a4dff]">MISSION</p>
              <p className="mt-1 text-sm font-black">Assurer la continuité des opérations.</p>
              <p className="text-xs text-slate-500">01</p>
            </div>
            <div className="rounded-2xl border border-[#e3e9ff] p-4">
              <p className="text-xs font-bold text-[#1a4dff]">VISION</p>
              <p className="mt-1 text-sm font-black">Faire du transport un levier fiable.</p>
              <p className="text-xs text-slate-500">02</p>
            </div>
          </div>
          <Link href={`/${locale}/histoire`} className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#1a4dff] px-4 py-2 text-xs font-bold text-white hover:bg-[#0e3bd8]">Découvrir SOTRAZ <ArrowRight className="size-3.5 rtl:rotate-180" /></Link>
        </div>
        <div className="relative min-h-[280px]">
          <Image src="/images/sotraz-maintenance-inspection-v2.webp" alt="SOTRAZ en opération" fill className="object-cover" sizes="50vw" />
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-2xl font-black">Des principes qui se voient dans l&apos;exploitation.</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            ["01", "Fiabilité", "Des moyens, des horaires et des interlocuteurs identifiés."],
            ["02", "Sécurité", "La prévention intégrée dans chaque étape de la mission."],
            ["03", "Proximité", "Des réponses construites depuis le besoin opérationnel."],
          ].map(([n, t, d]) => (
            <article key={n} className="rounded-[28px] bg-white p-6 shadow-sm">
              <p className="text-xs font-black text-[#1a4dff]">{n}</p>
              <h3 className="mt-2 text-lg font-black">{t}</h3>
              <p className="mt-1 text-sm text-slate-600">{d}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
