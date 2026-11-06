import Link from "next/link";
import { Globe, Share2, AtSign, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/dictionaries";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: {
    nav: Record<string, string>;
    footer: { desc: string; services: string; company: string; resources: string; rights: string; privacy: string; terms: string };
  };
}) {
  return (
    <footer className="mx-auto mt-6 max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[28px] bg-[#0a1437] text-white">
        <div className="grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-[#1a4dff] font-black">S</span>
              <span className="text-xl font-black tracking-tight">SOTRAZ</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{dict.footer.desc}</p>
            <div className="mt-5 space-y-2 text-sm text-white/80">
              <p className="flex items-center gap-2">
                <Phone className="size-4 text-white/50" /> (041) 68 02 73
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-4 text-white/50" /> contact@sotraz.dz
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-4 text-white/50" /> Arzew · Skikda · Sud algérien
              </p>
            </div>
            <div className="mt-5 flex gap-2">
              {[Globe, Share2, AtSign].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid size-9 place-items-center rounded-full bg-white/10 transition hover:bg-[#1a4dff]"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label={dict.footer.services}>
            <h3 className="text-xs font-bold tracking-[0.18em] text-white/60">{dict.footer.services}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link className="hover:text-white text-white/80" href={`/${locale}/services`}>{dict.nav.services}</Link></li>
              <li><Link className="hover:text-white text-white/80" href={`/${locale}/flotte`}>{dict.nav.flotte}</Link></li>
              <li><Link className="hover:text-white text-white/80" href={`/${locale}/demandes`}>{dict.nav.demandes}</Link></li>
              <li><Link className="hover:text-white text-white/80" href={`/${locale}/services#maintenance`}>{dict.nav.qualite}</Link></li>
              <li><Link className="hover:text-white text-white/80" href={`/${locale}/reseau`}>{dict.nav.reseau}</Link></li>
            </ul>
          </nav>

          <nav aria-label={dict.footer.company}>
            <h3 className="text-xs font-bold tracking-[0.18em] text-white/60">{dict.footer.company}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link className="hover:text-white text-white/80" href={`/${locale}/entreprise`}>{dict.nav.entreprise}</Link></li>
              <li><Link className="hover:text-white text-white/80" href={`/${locale}/histoire`}>{dict.nav.histoire}</Link></li>
              <li><Link className="hover:text-white text-white/80" href={`/${locale}/organigramme`}>{dict.nav.organigramme}</Link></li>
              <li><Link className="hover:text-white text-white/80" href={`/${locale}/certifications`}>{dict.nav.certifications}</Link></li>
              <li><Link className="hover:text-white text-white/80" href={`/${locale}/contact`}>{dict.nav.contact}</Link></li>
            </ul>
          </nav>

          <nav aria-label={dict.footer.resources}>
            <h3 className="text-xs font-bold tracking-[0.18em] text-white/60">{dict.footer.resources}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link className="hover:text-white text-white/80" href={`/${locale}/actualites`}>{dict.nav.actualites}</Link></li>
              <li><Link className="hover:text-white text-white/80" href={`/${locale}/secteurs`}>{dict.nav.secteurs}</Link></li>
              <li><Link className="hover:text-white text-white/80" href={`/${locale}/politique-qualite`}>{dict.nav.qualite}</Link></li>
              <li><Link className="hover:text-white text-white/80" href={`/${locale}/contact`}>{dict.nav.track}</Link></li>
            </ul>
            <Link
              href={`/${locale}/demandes`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-white underline underline-offset-4"
            >
              Demander une prestation <ArrowUpRight className="size-4" />
            </Link>
          </nav>
        </div>

        <div className="select-none overflow-hidden px-2 pb-2">
          <div
            className="display-giant whitespace-nowrap text-center text-[19vw] leading-[0.8] text-white/[0.07] sm:text-[150px] lg:text-[200px]"
            aria-hidden
          >
            SOTRAZ
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4 text-xs text-white/60 sm:px-10">
          <p>{dict.footer.rights}</p>
          <div className="flex gap-4">
            <Link href={`/${locale}/politique-qualite`} className="hover:text-white">{dict.footer.privacy}</Link>
            <Link href={`/${locale}/politique-qualite`} className="hover:text-white">{dict.footer.terms}</Link>
          </div>
        </div>
      </div>
      <div className="h-6" />
    </footer>
  );
}
