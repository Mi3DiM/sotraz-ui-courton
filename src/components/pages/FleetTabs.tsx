"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock3, Fuel, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const FLEET = [
  { id: "bus", label: "Bus", img: "/images/fleet-bus.webp", title: "Bus de transport de personnel", desc: "Moyens destinés au transport collectif, adaptés aux contraintes des sites desservis.", cap: "50+ places", equip: "Climatisation", dispo: "Disponible" },
  { id: "camions", label: "Camions", img: "/images/fleet-truck.webp", title: "Camions de transport de marchandises", desc: "Véhicules pour les besoins de transport et opérations logistiques.", cap: "Haute capacité", equip: "Ba caute", dispo: "Sur demande" },
  { id: "utilitaires", label: "Utilitaires", img: "/images/fleet-light.webp", title: "Véhicules utilitaires", desc: "Polyvalents, flexibles — équipes, liaisons inter-sites, besoins ponctuels.", cap: "4–17 places", equip: "Selon configuration", dispo: "Disponible" },
];

export function FleetTabs() {
  const [active, setActive] = useState("bus");
  const current = FLEET.find((f) => f.id === active) ?? FLEET[0];

  return (
    <div>
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Fleet categories">
        {FLEET.map((f) => (
          <button
            key={f.id}
            role="tab"
            type="button"
            onClick={() => setActive(f.id)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-bold transition",
              active === f.id ? "bg-[#1a4dff] text-white" : "bg-white text-slate-600 hover:bg-[#eef2ff]"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid overflow-hidden rounded-[28px] bg-white shadow-sm lg:grid-cols-2">
        <div className="relative min-h-[260px]">
          <Image key={current.id} src={current.img} alt={current.title} fill className="object-cover" sizes="50vw" />
          <span className="absolute start-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold">{current.title}</span>
        </div>
        <div className="p-6 sm:p-8" role="tabpanel">
          <h2 className="text-2xl font-black">{current.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{current.desc}</p>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl bg-[#f6f8ff] p-3">
              <Users className="mx-auto size-5 text-[#1a4dff]" />
              <p className="mt-1 text-xs font-bold">{current.cap}</p>
              <p className="text-[10px] text-slate-400">Capacité</p>
            </div>
            <div className="rounded-2xl bg-[#f6f8ff] p-3">
              <Fuel className="mx-auto size-5 text-[#1a4dff]" />
              <p className="mt-1 text-xs font-bold">{current.equip}</p>
              <p className="text-[10px] text-slate-400">Équipement</p>
            </div>
            <div className="rounded-2xl bg-[#f6f8ff] p-3">
              <Clock3 className="mx-auto size-5 text-[#1a4dff]" />
              <p className="mt-1 text-xs font-bold">{current.dispo}</p>
              <p className="text-[10px] text-slate-400">Disponibilité</p>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-slate-400">Photographies temporaires — les vues officielles remplaceront ces visuels.</p>
        </div>
      </div>
    </div>
  );
}
