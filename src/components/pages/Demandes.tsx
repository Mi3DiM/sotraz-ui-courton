"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Users, CalendarDays, Wrench, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Besoin", "Lieux & dates", "Volumes", "Contact"] as const;

export function DemandesForm() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("Transport de personnel");
  const [wilaya, setWilaya] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("20–50");
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  if (done) {
    return (
      <div className="rounded-[28px] bg-white p-8 text-center shadow-sm sm:p-12">
        <CheckCircle2 className="mx-auto size-12 text-emerald-500" />
        <h2 className="mt-4 text-2xl font-black">Demande reçue.</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
          {service} · {wilaya || "—"} · {date || "—"} — nos équipes vous répondent du dimanche au jeudi.
        </p>
        <p className="mt-2 text-xs text-slate-400">Demande simulée : aucun message n&apos;a été envoyé.</p>
        <button onClick={() => { setDone(false); setStep(0); }} className="mt-6 rounded-lg bg-[#1a4dff] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#0e3bd8]">
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-sm">
      {/* Progress */}
      <div className="border-b border-[#e3e9ff] px-6 py-4 sm:px-8">
        <ol className="flex items-center gap-2">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-2 last:flex-none">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full text-xs font-black",
                  i < step && "bg-emerald-500 text-white",
                  i === step && "bg-[#1a4dff] text-white",
                  i > step && "bg-slate-100 text-slate-400"
                )}
              >
                {i + 1}
              </button>
              <span className={cn("hidden text-xs font-bold sm:inline", i === step ? "text-[#0a1437]" : "text-slate-400")}>{label}</span>
              {i < STEPS.length - 1 && <span className="h-px flex-1 bg-[#e3e9ff]" />}
            </li>
          ))}
        </ol>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); if (step < 3) setStep(step + 1); else setDone(true); }}
        className="px-6 py-6 sm:px-8"
      >
        {step === 0 && (
          <div>
            <h2 className="text-xl font-black">Quel mouvement devons-nous organiser ?</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {["Transport de personnel", "Marchandises", "Location", "Maintenance", "Mise à disposition", "Autre"].map((s) => (
                <label key={s} className={cn(
                  "flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold",
                  service === s ? "border-[#1a4dff] bg-[#eef2ff] text-[#1a4dff]" : "border-[#e3e9ff] hover:bg-[#f6f8ff]"
                )}>
                  <span className="flex items-center gap-2">
                    {s === "Transport de personnel" ? <Users className="size-4" /> : s === "Maintenance" || s === "Location" ? <Wrench className="size-4" /> : <MapPin className="size-4" />}
                    {s}
                  </span>
                  <input type="radio" name="service" checked={service === s} onChange={() => setService(s)} className="accent-[#1a4dff]" />
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-xl font-black">Lieux & dates</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="block text-xs font-bold text-slate-600">
                Wilaya / Zone
                <span className="relative mt-1.5 block">
                  <input value={wilaya} onChange={(e) => setWilaya(e.target.value)} placeholder="Ex. Arzew, Skikda, Ouargla…" className="w-full rounded-xl border border-[#e3e9ff] px-3 py-2.5 text-sm outline-none focus:border-[#1a4dff]" />
                  <MapPin className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                </span>
              </label>
              <label className="block text-xs font-bold text-slate-600">
                Date souhaitée
                <span className="relative mt-1.5 block">
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl border border-[#e3e9ff] px-3 py-2.5 text-sm outline-none focus:border-[#1a4dff]" />
                  <CalendarDays className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                </span>
              </label>
              <label className="block text-xs font-bold text-slate-600 sm:col-span-2">
                Sites / points de prise en charge
                <textarea rows={3} placeholder="Décrivez les sites, horaires, volumes…" className="mt-1.5 w-full rounded-xl border border-[#e3e9ff] px-3 py-2.5 text-sm outline-none focus:border-[#1a4dff]" />
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-black">Volumes & contraintes</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {["1–20 personnes", "20–50", "50–200", "200+", "Marchandises (tonnes)", "À préciser"].map((v) => (
                <button key={v} type="button" onClick={() => setPeople(v)} className={cn(
                  "rounded-2xl border px-4 py-3 text-start text-sm font-semibold",
                  people === v ? "border-[#1a4dff] bg-[#eef2ff] text-[#1a4dff]" : "border-[#e3e9ff] hover:bg-[#f6f8ff]"
                )}>{v}</button>
              ))}
            </div>
            <label className="mt-3 block text-xs font-bold text-slate-600">
              Contraintes (horaires, sécurité, environnement…)
              <textarea rows={2} className="mt-1.5 w-full rounded-xl border border-[#e3e9ff] px-3 py-2.5 text-sm outline-none focus:border-[#1a4dff]" />
            </label>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-black">Vos coordonnées</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input required placeholder="Nom *" value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl border border-[#e3e9ff] px-3 py-2.5 text-sm outline-none focus:border-[#1a4dff]" />
              <input placeholder="Entreprise" value={company} onChange={(e) => setCompany(e.target.value)} className="rounded-xl border border-[#e3e9ff] px-3 py-2.5 text-sm outline-none focus:border-[#1a4dff]" />
              <input required placeholder="Téléphone *" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl border border-[#e3e9ff] px-3 py-2.5 text-sm outline-none focus:border-[#1a4dff]" />
              <input required type="email" placeholder="E-mail *" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl border border-[#e3e9ff] px-3 py-2.5 text-sm outline-none focus:border-[#1a4dff]" />
              <textarea rows={3} placeholder="Message *" required value={message} onChange={(e) => setMessage(e.target.value)} className="rounded-xl border border-[#e3e9ff] px-3 py-2.5 text-sm outline-none focus:border-[#1a4dff] sm:col-span-2" />
            </div>
            <label className="mt-3 flex items-start gap-2 text-xs text-slate-600">
              <input required type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[#1a4dff]" />
              J&apos;accepte que mes informations soient utilisées pour répondre à cette demande. *
            </label>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)} className="inline-flex items-center gap-1.5 rounded-lg border border-[#e3e9ff] px-4 py-2.5 text-xs font-bold disabled:opacity-40">
            <ArrowLeft className="size-3.5 rtl:rotate-180" /> Retour
          </button>
          <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-[#1a4dff] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#0e3bd8]">
            {step === 3 ? "Envoyer la demande" : "Continuer"} <ArrowRight className="size-3.5 rtl:rotate-180" />
          </button>
        </div>
      </form>
    </div>
  );
}

export function DemandesPageClient() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <DemandesForm />
        <aside className="space-y-4">
          <div className="rounded-[28px] bg-[#0a1437] p-6 text-white">
            <h3 className="text-base font-black">Les plus demandées</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              <li className="flex items-center justify-between rounded-xl bg-white/10 px-3 py-2">Navettes sites industriels <ChevronDown className="size-4 -rotate-90 rtl:rotate-90" /></li>
              <li className="flex items-center justify-between rounded-xl bg-white/10 px-3 py-2">Rotations personnel <ChevronDown className="size-4 -rotate-90 rtl:rotate-90" /></li>
              <li className="flex items-center justify-between rounded-xl bg-white/10 px-3 py-2">Location avec chauffeur <ChevronDown className="size-4 -rotate-90 rtl:rotate-90" /></li>
            </ul>
            <Link href="/fr/contact" className="mt-4 inline-block text-xs font-bold underline underline-offset-4">Contacter nos équipes</Link>
          </div>
          <div className="rounded-[28px] bg-white p-6 shadow-sm">
            <h3 className="text-sm font-black">Horaires</h3>
            <p className="mt-1 text-sm text-slate-600">Dimanche — Jeudi · nos équipes vous répondent pendant les horaires de travail.</p>
            <p className="mt-3 text-sm font-bold text-[#1a4dff]">(041) 68 02 73</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
