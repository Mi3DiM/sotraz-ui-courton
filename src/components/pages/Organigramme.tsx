"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, User, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

type Member = { id: string; name: string; role: string; desc: string; children?: Member[] };

const ORG: Member = {
  id: "pdg",
  name: "Président Directeur Général",
  role: "Direction générale",
  desc: "Vision, stratégie et gouvernance.",
  children: [
    {
      id: "ops",
      name: "Direction des opérations",
      role: "Exploitation terrain",
      desc: "Planification, supervision, rotations.",
      children: [
        { id: "transp", name: "Chef transport personnel", role: "Flux humains", desc: "Navettes, lignes régulières, ponctuel." },
        { id: "log", name: "Chef logistique", role: "Moyens & flux", desc: "Marchandises, mise à disposition." },
      ],
    },
    {
      id: "tech",
      name: "Direction technique",
      role: "Maintenance & flotte",
      desc: "Disponibilité, entretien, atelier.",
      children: [
        { id: "atelier", name: "Chef d'atelier", role: "Maintenance", desc: "Préventif, correctif, diagnostic." },
        { id: "flotte", name: "Gestion de flotte", role: "Parc", desc: "Suivi, affectation, qualité." },
      ],
    },
    {
      id: "sup",
      name: "Directions support",
      role: "RH · Finance · Qualité",
      desc: "Recrutement, finances, HSE.",
      children: [
        { id: "rh", name: "Ressources humaines", role: "Équipes", desc: "Formation, sensibilisation." },
        { id: "qual", name: "Qualité & sécurité", role: "HSE", desc: "Prévention, amélioration continue." },
      ],
    },
  ],
};

function Node({ node, depth, active, onSelect }: { node: Member; depth: number; active: string | null; onSelect: (n: Member) => void }) {
  const [open, setOpen] = useState(depth < 2);
  const isActive = active === node.id;
  return (
    <div className="relative">
      <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: depth * 0.05 }}
        className={cn(
          "mx-auto w-full max-w-xl rounded-[24px] border bg-white p-4 shadow-sm sm:p-5",
          isActive ? "border-[#1a4dff] ring-4 ring-[#1a4dff]/10" : "border-[#e3e9ff]"
        )}
      >
        <button type="button" onClick={() => onSelect(node)} className="flex w-full items-center gap-3 text-start">
          <span className={cn("grid size-11 shrink-0 place-items-center rounded-2xl font-black", isActive ? "bg-[#1a4dff] text-white" : "bg-[#eef2ff] text-[#1a4dff]")}>
            <User className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-black sm:text-base">{node.name}</span>
            <span className="block truncate text-xs text-slate-500">{node.role}</span>
          </span>
          {node.children && (
            <span onClick={(e) => { e.stopPropagation(); setOpen(!open); }} className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full border border-[#e3e9ff]">
              <ChevronDown className={cn("size-4 transition", open && "rotate-180")} />
            </span>
          )}
        </button>
      </motion.div>

      <AnimatePresence initial={false}>
        {node.children && open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mx-auto mt-2 h-6 w-px bg-[#c9d8ff]" />
            <div className={cn("grid gap-3", node.children.length > 1 ? "sm:grid-cols-3" : "mx-auto max-w-xl")}>
              {node.children.map((c) => (
                <Node key={c.id} node={c} depth={depth + 1} active={active} onSelect={onSelect} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function OrganigrammeTree() {
  const [selected, setSelected] = useState<Member>(ORG);
  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div className="rounded-[28px] bg-white p-4 shadow-sm sm:p-6">
        <Node node={ORG} depth={0} active={selected.id} onSelect={setSelected} />
      </div>
      <aside className="h-fit rounded-[28px] bg-[#0a1437] p-6 text-white lg:sticky lg:top-24">
        <p className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-white/60">
          <Briefcase className="size-4" /> FICHE
        </p>
        <h2 className="mt-2 text-xl font-black">{selected.name}</h2>
        <p className="text-sm text-white/70">{selected.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/85">{selected.desc}</p>
        {selected.children && (
          <p className="mt-4 rounded-xl bg-white/10 px-3 py-2 text-xs">Supervise {selected.children.length} direction(s).</p>
        )}
      </aside>
    </div>
  );
}
