"use client";

import { useMemo, useState } from "react";
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { branches, type Localized } from "@/lib/data";
import type { Locale } from "@/i18n/dictionaries";

function loc(v: Localized, locale: Locale) { return v[locale]; }

const SERVICES = ["Tous", "Transport de personnel", "Maintenance", "Location", "Marchandises", "Mise à disposition"];

export function AlgeriaMap({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(branches[0].id);
  const [filter, setFilter] = useState("Tous");

  const filtered = useMemo(
    () => branches.filter((b) => filter === "Tous" || b.services.some((s) => s.toLowerCase().includes(filter.toLowerCase().split(" ")[0])) || b.services.includes(filter)),
    [filter]
  );
  const current = branches.find((b) => b.id === active) ?? branches[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="rounded-[28px] bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap gap-1.5">
          {SERVICES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={cn(
                "rounded-full border px-3 py-1 text-[11px] font-bold",
                filter === s ? "border-[#1a4dff] bg-[#1a4dff] text-white" : "border-[#e3e9ff] text-slate-600 hover:bg-[#f6f8ff]"
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative mt-4 aspect-[4/4.2] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#eaf0ff] to-[#dfe8ff]">
          {/* Stylized Algeria silhouette */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
            <path
              d="M12,8 L88,4 L96,30 L90,58 L78,92 L52,96 L30,90 L14,70 L8,40 Z"
              fill="#c9d8ff"
              stroke="#1a4dff"
              strokeWidth="0.6"
              opacity="0.9"
            />
            <path d="M12,8 L30,90" stroke="#fff" strokeWidth="0.3" strokeDasharray="1 1" />
          </svg>
          <p className="absolute start-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold text-[#1a4dff] backdrop-blur">ALGÉRIE</p>

          {filtered.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setActive(b.id)}
              aria-label={loc(b.city, locale)}
              className="group absolute -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2"
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
            >
              <span className={cn(
                "relative grid size-9 place-items-center rounded-full text-white shadow-lg transition",
                active === b.id ? "scale-110 bg-[#1a4dff]" : "bg-[#0a1437] group-hover:bg-[#1a4dff]"
              )}>
                <MapPin className="size-4" />
                <span className="absolute -bottom-5 start-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[#0a1437] shadow">
                  {loc(b.city, locale)}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-[28px] bg-[#0a1437] p-6 text-white">
          <p className="text-xs font-bold tracking-widest text-white/60">{loc(current.wilaya, locale).toUpperCase()} · {current.region}</p>
          <h2 className="mt-2 text-2xl font-black">{loc(current.city, locale)}</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {current.services.map((s) => (
              <span key={s} className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold">{s}</span>
            ))}
          </div>
          <div className="mt-5 space-y-2 text-sm">
            <p className="flex items-center gap-2"><Phone className="size-4 text-white/60" /> (041) 68 02 73</p>
            <p className="flex items-center gap-2"><Mail className="size-4 text-white/60" /> {current.id}@sotraz.dz</p>
          </div>
          <a href={`/${locale}/contact`} className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#1a4dff] px-4 py-2 text-xs font-bold hover:bg-[#0e3bd8]">
            Contacter l&apos;agence <ChevronRight className="size-3.5 rtl:rotate-180" />
          </a>
        </div>

        <div className="overflow-hidden rounded-[28px] bg-white shadow-sm">
          <div className="border-b border-[#e3e9ff] px-5 py-3 text-sm font-black">Toutes les implantations</div>
          <ul className="max-h-64 divide-y divide-[#eef2ff] overflow-auto">
            {branches.map((b) => (
              <li key={b.id}>
                <button type="button" onClick={() => setActive(b.id)} className={cn("flex w-full items-center justify-between px-5 py-3 text-start hover:bg-[#f6f8ff]", active === b.id && "bg-[#eef2ff]")}>
                  <span>
                    <span className="block text-sm font-bold">{loc(b.city, locale)}</span>
                    <span className="block text-xs text-slate-500">{loc(b.wilaya, locale)} · {b.services.join(", ")}</span>
                  </span>
                  <ChevronRight className="size-4 text-slate-400 rtl:rotate-180" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
