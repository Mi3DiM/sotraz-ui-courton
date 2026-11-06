"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dna, ChevronRight } from "lucide-react";
import { history, type Localized } from "@/lib/data";
import type { Locale } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

function loc(v: Localized, locale: Locale) { return v[locale]; }

export function DnaTimeline({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
      {/* DNA helix */}
      <div className="relative mx-auto w-40 sm:w-52" aria-hidden>
        <motion.div
          className="absolute inset-0"
          animate={{ rotateY: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <svg viewBox="0 0 100 600" className="h-[620px] w-full">
            <path d="M25,10 C90,80 10,150 25,220 C90,290 10,360 25,430 C90,500 10,570 25,590" fill="none" stroke="#1a4dff" strokeWidth="3" opacity="0.35" />
            <path d="M75,10 C10,80 90,150 75,220 C10,290 90,360 75,430 C10,500 90,570 75,590" fill="none" stroke="#0a1437" strokeWidth="3" opacity="0.25" />
            {history.map((h, i) => {
              const y = 30 + i * 115;
              const left = i % 2 === 0;
              return (
                <g key={h.year}>
                  <line x1={left ? 25 : 75} y1={y} x2={left ? 65 : 35} y2={y} stroke="#1a4dff" strokeWidth="2" opacity="0.5" />
                  <circle cx={left ? 25 : 75} cy={y} r={active === i ? 9 : 5} fill={active === i ? "#1a4dff" : "#c9d8ff"} />
                </g>
              );
            })}
          </svg>
        </motion.div>
        <div className="absolute -top-3 start-1/2 grid size-10 -translate-x-1/2 place-items-center rounded-full bg-[#1a4dff] text-white shadow-lg rtl:translate-x-1/2">
          <Dna className="size-5" />
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {history.map((h, i) => (
          <button
            key={h.year}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "w-full rounded-[28px] border bg-white p-5 text-start shadow-sm transition sm:p-6",
              active === i ? "border-[#1a4dff] shadow-lg" : "border-[#e3e9ff] hover:bg-[#f6f8ff]"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="display-giant text-3xl text-[#1a4dff] sm:text-4xl">{h.year}</span>
              <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-[11px] font-bold text-[#1a4dff]">ADN · Étape {i + 1}</span>
            </div>
            <h2 className="mt-2 text-lg font-black">{loc(h.title, locale)}</h2>
            <p className="mt-1 text-sm text-slate-600">{loc(h.desc, locale)}</p>
            <AnimatePresence initial={false}>
              {active === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#1a4dff]">
                    Séquence génétique {h.year} <ChevronRight className="size-3.5 rtl:rotate-180" />
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </div>
  );
}
