import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/dictionaries";
import { AlgeriaMap } from "@/components/pages/AlgeriaMap";
import { Badge } from "@/components/ui/badge";

export default async function ReseauPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  return (
    <div className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
      <Badge className="bg-[#eef2ff] text-[#1a4dff] hover:bg-[#eef2ff]">{dict.nav.reseau}</Badge>
      <h1 className="mt-3 text-4xl font-black sm:text-5xl">{dict.reseau.title}</h1>
      <p className="mt-3 max-w-xl text-sm text-slate-600">{dict.reseau.lead}</p>
      <div className="mt-8"><AlgeriaMap locale={locale} /></div>
    </div>
  );
}
