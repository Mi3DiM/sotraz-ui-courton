"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type Slide = {
  image: string;
  kicker: string;
  title: string;
};

export function HeroCarousel({
  slides,
  dict,
  locale,
}: {
  slides: Slide[];
  dict: {
    hero: {
      giant: string;
      title: string;
      subtitle: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
  };
  locale: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 5500);
    return () => clearInterval(t);
  }, [go, paused]);

  const active = slides[index];

  return (
    <section
      className="mx-auto max-w-[1280px] px-4 pt-3 sm:px-6 lg:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero carousel"
    >
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-[#5b9bd5] via-[#3f7fc2] to-[#1a4dff] shadow-[0_24px_60px_rgba(10,20,55,0.18)]">
        {/* Background image */}
        <div className="absolute inset-0">
          {slides.map((s, i) => (
            <div
              key={s.image}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                i === index ? "opacity-100" : "opacity-0"
              )}
            >
              <Image
                src={s.image}
                alt=""
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a4dff]/35 via-[#2b6ac9]/45 to-[#0a1437]/60" />
            </div>
          ))}
        </div>

        <div className="relative px-5 pb-6 pt-12 text-center text-white sm:px-10 sm:pt-16 lg:pt-20">
          <p className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wide backdrop-blur">
            <MapPin className="size-3" />
            {active.kicker}
          </p>

          <h1 className="mx-auto mt-5 max-w-2xl text-[26px] font-bold leading-[1.15] sm:text-[36px] lg:text-[42px]">
            {dict.hero.title}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-white/90 sm:text-sm">
            {dict.hero.subtitle}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#1a4dff] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-black/20 transition hover:bg-[#0e3bd8]"
            >
              {dict.hero.ctaPrimary} <ArrowRight className="size-3.5 rtl:rotate-180" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-4 py-2.5 text-xs font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              {dict.hero.ctaSecondary} <ArrowRight className="size-3.5 rtl:rotate-180" />
            </Link>
          </div>

          {/* Giant word behind truck image like reference */}
          <div className="pointer-events-none mt-2 select-none overflow-hidden" aria-hidden>
            <div
              className={cn(
                "display-giant whitespace-nowrap text-white/95 transition-transform duration-700",
                "text-[28vw] leading-none sm:text-[180px] lg:text-[240px]"
              )}
            >
              {dict.hero.giant}
            </div>
          </div>
        </div>

        {/* Bottom bar: dots + ads pill */}
        <div className="relative flex items-center justify-between gap-3 border-t border-white/15 bg-[#0a1437]/35 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="grid size-8 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white/15"
            >
              <ChevronLeft className="size-4 rtl:rotate-180" />
            </button>
            <div className="flex items-center gap-1.5">
              {slides.map((s, i) => (
                <button
                  key={s.image}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70"
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="grid size-8 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white/15"
            >
              <ChevronRight className="size-4 rtl:rotate-180" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-lg bg-white/5 px-3 py-1.5 text-[11px] text-white/85 sm:inline">
              {active.kicker}
            </span>
            <span className="hidden rounded-lg bg-white/5 px-3 py-1.5 text-[11px] text-white/70 md:inline">
              Tracking · Control · Fresh goods
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
