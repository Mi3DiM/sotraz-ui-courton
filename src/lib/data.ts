export type Localized = { fr: string; ar: string; en: string };

export const services = [
  {
    id: "transport-personnel",
    num: "01",
    category: { fr: "Flux humains", ar: "تدفقات بشرية", en: "Human flows" },
    title: { fr: "Transport de personnel", ar: "نقل الموظفين", en: "Staff transport" },
    image: "/images/solutions-transport-personnel-v1.webp",
    href: "/services/transport-personnel",
  },
  {
    id: "maintenance",
    num: "02",
    category: { fr: "Moyens techniques", ar: "وسائل تقنية", en: "Technical means" },
    title: { fr: "Maintenance automobile", ar: "صيانة السيارات", en: "Vehicle maintenance" },
    image: "/images/sotraz-maintenance-inspection-v2.webp",
    href: "/services/maintenance",
  },
  {
    id: "location",
    num: "03",
    category: { fr: "Moyens", ar: "وسائل", en: "Fleet assets" },
    title: { fr: "Location de véhicules", ar: "كراء المركبات", en: "Vehicle rental" },
    image: "/images/solutions-location-vehicules-v1.webp",
    href: "/services/location",
  },
  {
    id: "mise-a-disposition",
    num: "04",
    category: { fr: "Disponibilité", ar: "توفر", en: "Availability" },
    title: { fr: "Mise à disposition", ar: "توفير الوسائل", en: "Provisioning" },
    image: "/images/hero-fleet.webp",
    href: "/services",
  },
  {
    id: "services-associes",
    num: "05",
    category: { fr: "Appui", ar: "دعم", en: "Support" },
    title: { fr: "Services associés", ar: "خدمات مرافقة", en: "Related services" },
    image: "/images/solutions-services-associes-v1.webp",
    href: "/services",
  },
];

export const stats = [
  { icon: "truck", value: "+1000", label: { fr: "véhicules", ar: "مركبة", en: "vehicles" }, sub: "Across our fleet" },
  { icon: "award", value: "+35 ans", label: { fr: "d’expertise", ar: "خبرة", en: "years of expertise" }, sub: "Depuis 1991" },
  { icon: "users", value: "+20000", label: { fr: "personnes transportées / jour", ar: "شخص يومياً", en: "people transported / day" }, sub: "Shipments a year" },
  { icon: "route", value: "106232", label: { fr: "km parcourus / jour", ar: "كم يومياً", en: "km covered / day" }, sub: "Route quotidienne" },
];

export type Branch = {
  id: string;
  wilaya: Localized;
  city: Localized;
  region: "Nord" | "Est" | "Sud" | "Ouest";
  services: string[];
  x: number;
  y: number;
};

export const branches: Branch[] = [
  { id: "arzew", wilaya: { fr: "Oran", ar: "وهران", en: "Oran" }, city: { fr: "Arzew", ar: "أرزيو", en: "Arzew" }, region: "Ouest", services: ["Transport de personnel", "Maintenance"], x: 18, y: 32 },
  { id: "alger", wilaya: { fr: "Alger", ar: "الجزائر", en: "Algiers" }, city: { fr: "Alger", ar: "الجزائر", en: "Algiers" }, region: "Nord", services: ["Location", "Mise à disposition"], x: 34, y: 26 },
  { id: "skikda", wilaya: { fr: "Skikda", ar: "سكيكدة", en: "Skikda" }, city: { fr: "Skikda", ar: "سكيكدة", en: "Skikda" }, region: "Est", services: ["Transport de personnel", "Marchandises"], x: 52, y: 22 },
  { id: "bejaia", wilaya: { fr: "Béjaïa", ar: "بجاية", en: "Béjaïa" }, city: { fr: "Béjaïa", ar: "بجاية", en: "Béjaïa" }, region: "Est", services: ["Location"], x: 45, y: 28 },
  { id: "ouargla", wilaya: { fr: "Ouargla", ar: "ورقلة", en: "Ouargla" }, city: { fr: "Ouargla", ar: "ورقلة", en: "Ouargla" }, region: "Sud", services: ["Transport de personnel", "Marchandises"], x: 48, y: 58 },
  { id: "ghardaia", wilaya: { fr: "Ghardaïa", ar: "غرداية", en: "Ghardaïa" }, city: { fr: "Ghardaïa", ar: "غرداية", en: "Ghardaïa" }, region: "Sud", services: ["Maintenance", "Location"], x: 38, y: 52 },
  { id: "hassi", wilaya: { fr: "Hassi Messaoud", ar: "حاسي مسعود", en: "Hassi Messaoud" }, city: { fr: "Hassi Messaoud", ar: "حاسي مسعود", en: "Hassi Messaoud" }, region: "Sud", services: ["Transport de personnel"], x: 62, y: 62 },
  { id: "tlemcen", wilaya: { fr: "Tlemcen", ar: "تلمسان", en: "Tlemcen" }, city: { fr: "Tlemcen", ar: "تلمسان", en: "Tlemcen" }, region: "Ouest", services: ["Location"], x: 12, y: 36 },
];

export const history = [
  { year: "1991", title: { fr: "Création de SOTRAZ SPA", ar: "تأسيس سوتراز", en: "SOTRAZ SPA founded" }, desc: { fr: "Créée le 04 décembre 1991 — le début d'une aventure dans le transport terrestre.", ar: "4 ديسمبر 1991 — بداية المغامرة في النقل البري.", en: "Founded on 4 December 1991 — the start of the road-transport journey." } },
  { year: "1992", title: { fr: "Première implantation majeure", ar: "أول تواجد كبير", en: "First major footprint" }, desc: { fr: "Première société de transport du personnel de la zone industrielle d'Arzew (hydrocarbures).", ar: "أول شركة لنقل الموظفين في المنطقة الصناعية بأرزيو (المحروقات).", en: "First staff-transport company in the Arzew industrial zone (hydrocarbons)." } },
  { year: "2006", title: { fr: "Développement à Skikda", ar: "التوسع إلى سكيكدة", en: "Expansion to Skikda" }, desc: { fr: "Lancement de l'activité au niveau de Skikda.", ar: "إطلاق النشاط على مستوى سكيكدة.", en: "Operations launched in Skikda." } },
  { year: "2016", title: { fr: "Déploiement dans le Sud", ar: "الانتشار في الجنوب", en: "Deployment in the South" }, desc: { fr: "Extension des activités au Sud algérien à partir du 16 décembre 2016.", ar: "توسيع النشاط إلى الجنوب الجزائري ابتداءً من 16 ديسمبر 2016.", en: "Activities extended to the Algerian South from 16 December 2016." } },
  { year: "2024", title: { fr: "Lancement du transport de marchandises", ar: "إطلاق نقل البضائع", en: "Launch of goods transport" }, desc: { fr: "SOTRAZ élargit son offre de services au transport de marchandises.", ar: "توسع سوتراز في عرضها لتشمل نقل البضائع.", en: "SOTRAZ expands its offer with goods transport." } },
];

export const sectors = [
  { name: { fr: "Hydrocarbures", ar: "المحروقات", en: "Hydrocarbons" }, note: { fr: "Zones industrielles & rotations", ar: "مناطق صناعية ومناوبات", en: "Industrial sites & rotations" } },
  { name: { fr: "BTP & Construction", ar: "البناء والأشغال العمومية", en: "Construction" }, note: { fr: "Chantiers & navettes", ar: "ورشات ونقل داخلي", en: "Sites & shuttles" } },
  { name: { fr: "SANTÉ & Pharmaceutique", ar: "الصحة والدواء", en: "Healthcare" }, note: { fr: "Exigences strictes", ar: "متطلبات صارمة", en: "Strict requirements" } },
  { name: { fr: "Commerce & Grande distribution", ar: "التجارة والتوزيع", en: "Retail & Distribution" }, note: { fr: "Flux récurrents", ar: "تدفقات متكررة", en: "Recurring flows" } },
  { name: { fr: "Industrie manufacturière", ar: "الصناعة", en: "Manufacturing" }, note: { fr: "Horaires continus", ar: "أوقات متواصلة", en: "Continuous schedules" } },
  { name: { fr: "Logistique & Ports", ar: "اللوجستيات والموانئ", en: "Logistics & Ports" }, note: { fr: "Moyens adaptés", ar: "وسائل مكيّفة", en: "Adapted means" } },
];

export const testimonials = [
  { name: "Marcus Chen", role: { fr: "Directeur des opérations", ar: "مدير العمليات", en: "Head of Operations" }, quote: { fr: "« SOTRAZ a réduit nos coûts de fret de 22% dès le premier trimestre. »", ar: "« خفّضت سوتراز تكاليف الشحن بنسبة 22% منذ الربع الأول. »", en: "\"SOTRAZ cut our freight costs by 22% in the first quarter.\"" } },
  { name: "Sophie Reyes", role: { fr: "Responsable supply chain", ar: "مسؤولة سلسلة التوريد", en: "Supply-chain lead" }, quote: { fr: "« La meilleure décision logistique de 2025. »", ar: "« أفضل قرار لوجستي في 2025. »", en: "\"The best logistics decision of 2025.\"" } },
  { name: "David Walker", role: { fr: "Logistique manufacturière", ar: "لوجستي صناعي", en: "Manufacturing logistics" }, quote: { fr: "« Notre équipe a dédouané 3300 conteneurs sans un seul retard. »", ar: "« خلّص فريقنا 3300 حاوية دون تأخير. »", en: "\"Our team cleared 3,300 containers without a single delay.\"" } },
];
