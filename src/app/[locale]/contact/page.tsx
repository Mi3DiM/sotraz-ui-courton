import Image from "next/image";
import { Phone, Mail, MapPin, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/dictionaries";
import { Badge } from "@/components/ui/badge";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
      <Badge className="bg-[#eef2ff] text-[#1a4dff] hover:bg-[#eef2ff]">{dict.nav.contact}</Badge>
      <h1 className="mt-3 text-4xl font-black sm:text-5xl">{dict.contact.title}</h1>
      <p className="mt-3 max-w-xl text-sm text-slate-600">{dict.contact.lead}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        <aside className="overflow-hidden rounded-[28px] bg-white shadow-sm">
          <div className="relative h-44">
            <Image src="/images/industrial-site.webp" alt="SOTRAZ" fill className="object-cover" sizes="40vw" />
          </div>
          <div className="space-y-4 p-6">
            <h2 className="text-lg font-black">SOTRAZ SPA</h2>
            <p className="flex items-center gap-2 text-sm"><Phone className="size-4 text-[#1a4dff]" /> (041) 68 02 73</p>
            <p className="flex items-center gap-2 text-sm"><Mail className="size-4 text-[#1a4dff]" /> contact@sotraz.dz</p>
            <p className="flex items-center gap-2 text-sm"><MapPin className="size-4 text-[#1a4dff]" /> Arzew · Skikda · Sud</p>
            <p className="flex items-center gap-2 text-sm"><Clock3 className="size-4 text-[#1a4dff]" /> Dim. — Jeu. · horaires à confirmer</p>
            <div className="border-t border-[#e3e9ff] pt-4">
              <h3 className="text-sm font-black">Le bon point d&apos;entrée.</h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                <li><strong className="text-[#0a1437]">Service</strong> — Demandes opérationnelles</li>
                <li><strong className="text-[#0a1437]">Presse</strong> — Communication institutionnelle</li>
                <li><strong className="text-[#0a1437]">RH</strong> — Candidatures</li>
              </ul>
            </div>
          </div>
        </aside>

        <form className="rounded-[28px] bg-white p-6 shadow-sm sm:p-8" action="#" method="post">
          <h2 className="text-xl font-black">Les informations utiles.</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input required placeholder="Nom *" className="rounded-xl border border-[#e3e9ff] px-3 py-2.5 text-sm outline-none focus:border-[#1a4dff]" />
            <input placeholder="Entreprise" className="rounded-xl border border-[#e3e9ff] px-3 py-2.5 text-sm outline-none focus:border-[#1a4dff]" />
            <input required placeholder="Téléphone *" className="rounded-xl border border-[#e3e9ff] px-3 py-2.5 text-sm outline-none focus:border-[#1a4dff]" />
            <input required type="email" placeholder="E-mail *" className="rounded-xl border border-[#e3e9ff] px-3 py-2.5 text-sm outline-none focus:border-[#1a4dff]" />
            <select className="rounded-xl border border-[#e3e9ff] px-3 py-2.5 text-sm outline-none focus:border-[#1a4dff]">
              <option>Type de demande *</option><option>Demande de prestation</option><option>Information</option><option>Candidature</option><option>Autre</option>
            </select>
            <select className="rounded-xl border border-[#e3e9ff] px-3 py-2.5 text-sm outline-none focus:border-[#1a4dff]">
              <option>Service concerné</option><option>Transport de personnel</option><option>Marchandises</option><option>Location</option><option>Autre</option>
            </select>
            <textarea required placeholder="Message *" rows={4} className="rounded-xl border border-[#e3e9ff] px-3 py-2.5 text-sm outline-none focus:border-[#1a4dff] sm:col-span-2" />
          </div>
          <label className="mt-3 flex items-start gap-2 text-xs text-slate-600">
            <input required type="checkbox" className="mt-0.5 accent-[#1a4dff]" />
            J&apos;accepte que mes informations soient utilisées pour répondre à cette demande. *
          </label>
          <button type="submit" className="mt-4 rounded-lg bg-[#1a4dff] px-6 py-3 text-xs font-bold text-white hover:bg-[#0e3bd8]">Envoyer la demande →</button>
          <p className="mt-2 text-[11px] text-slate-400">Demande simulée : aucun message n&apos;a été envoyé.</p>
        </form>
      </div>
    </div>
  );
}
