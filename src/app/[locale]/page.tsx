import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Clock3,
  Globe,
  MapPinned,
  Route,
  ShieldCheck,
  Star,
  Truck,
  Users,
} from "lucide-react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/dictionaries";
import { HeroCarousel } from "@/components/layout/HeroCarousel";
import { services, stats, sectors, testimonials, type Localized } from "@/lib/data";

function loc(v: Localized, locale: Locale) {
  return v[locale];
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  const slides = [
    { image: "/images/hero-fleet.webp", kicker: "Road · Air · Ocean — unified", title: dict.hero.title },
    { image: "/images/sotraz-personnel-hero-v3.webp", kicker: "Transport de personnel", title: dict.hero.title },
    { image: "/images/industrial-site.webp", kicker: "Nos moyens — la bonne capacité", title: dict.hero.title },
  ];

  const iconMap: Record<string, typeof Truck> = {
    truck: Truck,
    award: Award,
    users: Users,
    route: Route,
  };

  return (
    <div className="pb-2">
      <HeroCarousel slides={slides} dict={dict} locale={locale} />

      {/* Stats strip — open, not carded, like reference */}
      <section className="mx-auto mt-8 max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] font-semibold tracking-[0.22em] text-slate-500">
          TAILORED SOLUTIONS FOR YOUR BUSINESS REQUIREMENTS
        </p>
        <div className="mt-5 grid grid-cols-2 gap-0 border-t border-[#e3e9ff] lg:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Truck;
            return (
              <div
                key={i}
                className="border-b border-e border-[#e3e9ff] px-4 py-6 text-center last:border-e-0 sm:px-6"
              >
                <span className="mx-auto grid size-9 place-items-center rounded-full bg-[#1a4dff] text-white shadow-[0_6px_16px_rgba(26,77,255,0.35)]">
                  <Icon className="size-4" />
                </span>
                <p className="mt-3 text-2xl font-black tracking-tight text-[#0a1437] sm:text-3xl">
                  {s.value}
                </p>
                <p className="text-xs font-semibold text-slate-700">{loc(s.label, locale)}</p>
                <p className="text-[11px] text-slate-400">{s.sub}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ALL SET FOR SEAMLESS TRANSPORTATION — featured + strip */}
      <section className="mx-auto mt-10 max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="display-giant max-w-md text-[30px] leading-[1.02] text-[#0a1437] sm:text-[44px]">
              {dict.home.servicesTitle}
            </h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Road", "Sea", "Rail", "Multimodal"].map((p) => (
                <span key={p} className="rounded-full border border-[#dbe4ff] bg-white px-3 py-1 text-[11px] font-semibold text-[#1a4dff]">
                  {p}
                </span>
              ))}
            </div>
          </div>
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#1a4dff] px-4 py-2 text-xs font-bold text-[#1a4dff] transition hover:bg-[#1a4dff] hover:text-white"
          >
            {dict.common.allServices} <ArrowRight className="size-3.5 rtl:rotate-180" />
          </Link>
        </div>

        <div className="mt-6 overflow-hidden rounded-[28px] bg-white shadow-[0_18px_40px_rgba(10,20,55,0.08)]">
          <div className="grid lg:grid-cols-[1.15fr_1fr]">
            <div className="relative min-h-[280px]">
              <Image
                src="/images/sotraz-freight-operation-v2.webp"
                alt={dict.home.featuredTitle}
                fill
                className="object-cover"
                sizes="60vw"
              />
              <span className="absolute start-4 top-4 rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-bold text-[#0a1437]">
                Global Freight Multimodal
              </span>
              <span className="absolute bottom-4 start-4 grid size-9 place-items-center rounded-full bg-[#1a4dff] text-white">
                <ArrowUpRight className="size-4" />
              </span>
            </div>
            <div className="bg-[#eef2ff] p-6 sm:p-8">
              <h3 className="text-[26px] font-black leading-tight">{dict.home.featuredTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{dict.home.featuredDesc}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><ShieldCheck className="size-4 shrink-0 text-[#1a4dff]" /> Dedicated account manager</li>
                <li className="flex gap-2"><Clock3 className="size-4 shrink-0 text-[#1a4dff]" /> Real-time shipment tracking</li>
                <li className="flex gap-2"><Globe className="size-4 shrink-0 text-[#1a4dff]" /> Full customs documentation</li>
                <li className="flex gap-2"><Award className="size-4 shrink-0 text-[#1a4dff]" /> Insurance included</li>
              </ul>
              <Link href={`/${locale}/demandes`} className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#1a4dff] px-4 py-2 text-xs font-bold text-white hover:bg-[#0e3bd8]">
                {dict.common.request} <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {services.slice(0, 3).map((s) => (
            <Link key={s.id} href={`/${locale}${s.href}`} className="group relative block overflow-hidden rounded-3xl shadow-sm">
              <Image src={s.image} alt={loc(s.title, locale)} width={640} height={360} className="h-44 w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 text-sm font-bold text-white">
                {loc(s.title, locale)}
                <span className="ms-2 inline-flex size-6 translate-y-1 items-center justify-center rounded-full bg-[#1a4dff]">
                  <ArrowUpRight className="size-3.5" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* TAILORED SOLUTIONS — split warehouse style (different from above) */}
      <section className="mx-auto mt-8 max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-[28px] bg-white p-6 shadow-[0_18px_40px_rgba(10,20,55,0.06)] sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <h2 className="display-giant text-[28px] leading-[1.02] sm:text-[40px]">{dict.home.solutionsTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              We don&apos;t sell standard packages — every client gets logistics built around their volumes, timelines, and budget.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                { icon: Clock3, t: "Real-Time Tracking", s: "500+ satellites, every step" },
                { icon: ShieldCheck, t: "Insured & Certified", s: "Full coverage, full compliance" },
                { icon: Globe, t: "120+ Countries", s: "Global network, unified control" },
                { icon: Route, t: "98% On-Time Rate", s: "Precision scheduling, every time" },
              ].map((f) => (
                <div key={f.t} className="rounded-2xl border border-[#e3e9ff] bg-[#f6f8ff] p-3.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a4dff]">
                    <f.icon className="size-4" /> {f.t}
                  </span>
                  <p className="mt-1 text-[11px] leading-snug text-slate-500">{f.s}</p>
                </div>
              ))}
            </div>
            <Link href={`/${locale}/services`} className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#1a4dff] px-4 py-2 text-xs font-bold text-white hover:bg-[#0e3bd8]">
              {dict.common.explore} <ArrowRight className="size-4 rtl:rotate-180" />
            </Link>
          </div>
          <div className="grid grid-cols-[1.4fr_1fr] gap-3">
            <div className="relative overflow-hidden rounded-2xl">
              <Image src="/images/sotraz-fleet-overview-v2.webp" alt="Warehouse" width={800} height={600} className="h-full min-h-[260px] w-full object-cover" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative flex-1 overflow-hidden rounded-2xl">
                <Image src="/images/hero-fleet.webp" alt="Truck" width={500} height={320} className="h-full w-full object-cover" />
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-[#1a4dff] to-[#4f7cff] p-4 text-white">
                <p className="text-3xl font-black">97.6%</p>
                <p className="text-xs text-white/80">Effective delivery rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* END-TO-END — 4 cards, badge-style (distinct) */}
      <section className="mx-auto mt-8 max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h2 className="display-giant max-w-md text-[30px] leading-[1.02] sm:text-[44px]">
            END-TO-END<br />LOGISTICS SOLUTIONS
          </h2>
          <Link href={`/${locale}/services`} className="inline-flex items-center gap-1.5 rounded-lg bg-[#1a4dff] px-4 py-2 text-xs font-bold text-white hover:bg-[#0e3bd8]">
            {dict.common.allServices} <ArrowRight className="size-3.5 rtl:rotate-180" />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Truck, tag: "FULL TRANSIT", title: "Road Freight", desc: "Full multimodal and LTL solutions across all major corridors.", img: "/images/solutions-transport-personnel-v1.webp" },
            { icon: Globe, tag: "FCL / LCL", title: "Ocean Freight", desc: "FCL and LCL ocean freight with customs handling.", img: "/images/sotraz-freight-operation-v2.webp" },
            { icon: Clock3, tag: "EXPRESS", title: "Air Freight", desc: "Express and standard air cargo across our global network.", img: "/images/industrial-site.webp" },
            { icon: ShieldCheck, tag: "BONDED", title: "Warehousing & Distribution", desc: "Scalable 3PL fulfillment with visibility.", img: "/images/sotraz-fleet-overview-v2.webp" },
          ].map((c) => (
            <article key={c.title} className="group relative overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-lg">
              <div className="relative h-36 overflow-hidden">
                <Image src={c.img} alt={c.title} width={640} height={320} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute end-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#0a1437]">{c.tag}</span>
              </div>
              <div className="p-5">
                <span className="inline-grid size-9 place-items-center rounded-full bg-[#eef2ff] text-[#1a4dff]"><c.icon className="size-4" /></span>
                <h3 className="mt-3 text-base font-bold">{c.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{c.desc}</p>
                <Link href={`/${locale}/services`} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#1a4dff]">
                  {dict.common.learn} <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTORS — dramatic image + interactive list (distinct) */}
      <section className="mx-auto mt-8 max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px]">
          <Image src="/images/sotraz-fleet-overview-v2.webp" alt="Sectors" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1437]/85 via-[#0a1437]/60 to-[#1a4dff]/40" />
          <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="text-white">
              <h2 className="display-giant text-[28px] leading-[1.02] sm:text-[40px]">{dict.home.sectorsTitle}</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">
                From heavy manufacturing to high-volume e-commerce, our logistics infrastructure adapts to every industry.
              </p>
              <Link href={`/${locale}/secteurs`} className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#1a4dff] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#0e3bd8]">
                All industries <ArrowRight className="size-3.5 rtl:rotate-180" />
              </Link>
            </div>
            <ul className="space-y-2">
              {sectors.map((s) => (
                <li key={s.name.en}>
                  <Link href={`/${locale}/secteurs`} className="group flex items-center justify-between gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                    <span className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-white" />
                      {loc(s.name, locale)}
                    </span>
                    <span className="flex items-center gap-2 text-xs font-normal text-white/70">
                      {loc(s.note, locale)} <ArrowRight className="size-3.5 transition group-hover:translate-x-1 rtl:rotate-180" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TRUSTED — marquee testimonials (distinct) */}
      <section className="mx-auto mt-10 max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 className="display-giant max-w-lg text-[30px] leading-[1.02] sm:text-[44px]">{dict.home.trustedTitle}</h2>
        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] rtl:[mask-image:linear-gradient(to_left,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-marquee flex w-max gap-4 pe-4">
            {[...testimonials, ...testimonials].map((t, i) => (
              <figure key={i} className="w-[320px] shrink-0 rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="size-3.5 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-slate-700">{loc(t.quote, locale)}</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-[#eef2ff] text-xs font-black text-[#1a4dff]">
                    {t.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-[#0a1437]">{t.name}</span>
                    <span className="block text-[11px] text-slate-500">{loc(t.role, locale)}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — cargo image */}
      <section className="mx-auto mt-8 max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px]">
          <Image src="/images/industrial-site.webp" alt={dict.home.ctaTitle} fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1437]/80 to-transparent" />
          <div className="relative max-w-lg p-6 text-white sm:p-10">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold backdrop-blur">
              <MapPinned className="size-3" /> On-time delivery, every time
            </p>
            <h2 className="mt-4 display-giant text-[32px] leading-[1.02] sm:text-[48px]">{dict.home.ctaTitle}</h2>
            <p className="mt-2 text-sm text-white/85">{dict.home.ctaDesc}</p>
            <Link href={`/${locale}/demandes`} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#1a4dff] px-5 py-3 text-xs font-bold text-white hover:bg-[#0e3bd8]">
              {dict.home.ctaBtn} <ArrowRight className="size-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
