# SOTRAZ UI Courton — AGENTS.md

> هذا الملف هو المرجع الإلزامي لأي وكيل ذكاء اصطناعي يعمل على هذا المشروع.
> التزم به حرفياً قبل كتابة أي كود.

## 0. التوثيق الرسمي (إلزامي)

قبل كتابة أي كود، اقرأ:
- `node_modules/next/dist/docs/` — مرجع Next.js 16 الرسمي (الأوامر، conventions، deprecations). **إصدار Next هنا: 16.4.5 + React 19.3**
- `llms.txt` الرسمي: Next `https://nextjs.org/llms.txt` ، shadcn `https://ui.shadcn.com/llms.txt` ، Base UI `https://base-ui.com/llms.txt`
- لا تثق بما تدربت عليه — تحقق دائماً من الوثائق والإصدارات الحالية (`npm view <pkg> version`).

## 1. البنية

```
src/
  app/
    layout.tsx                # RootLayout minimal (html/body)
    globals.css               # Tailwind v4 + shadcn tokens (royal blue #1a4dff)
    [locale]/                 # مجلد اللغة: fr | ar | en
      layout.tsx              # dir=rtl/ltr + Header + Footer
      page.tsx                # الرئيسية
      services/ demandes/ reseau/ histoire/ organigramme/
      certifications/ flotte/ entreprise/ secteurs/
      contact/ actualites/ politique-qualite/
      not-found.tsx
  components/
    ui/                       # shadcn (base) — لا تعديل يدوي إلا عبر CLI
    layout/                   # Header (scroll hide/show) + HeroCarousel (منفصل) + Footer
    pages/                    # مكونات تفاعلية: AlgeriaMap, DnaTimeline, Organigramme, FleetTabs, Demandes
  i18n/                       # dictionaries.ts + fr.json / ar.json / en.json
  lib/                        # utils.ts (cn) + data.ts (services, branches, history, sectors)
```

- المسارات: `/fr`, `/ar`, `/en` + إعادة توجيه `/` → `/fr` عبر `src/proxy.ts` (Next 16، ليس middleware).
- اللغة الافتراضية: `fr`. الاتجاه: `ar` = `rtl`، الباقي `ltr`. لا تعكس خريطة الجزائر في RTL.

## 2. التصميم (Design System)

- **مرجع بصري:** تصميم SwiftMove في الصورة المرفقة — hero أزرق بعنوان عملاق `SOTRAZ`، شريط إحصائيات مفتوح، كروت بيضاء `rounded-[28px]`، أزرق ملكي `#1a4dff` وغامق `#0a1437` وخلفية `#f6f8ff`.
- **Header منفصل عن Carousel:** الهيدر أبيض فوق المحتوى؛ عند التمرير للأسفل يختفي، وعند الصعود يظهر ثابتاً في الأعلى بخلفية بيضاء وظل وأنيميشن (`src/components/layout/Header.tsx`).
- **الكاروسيل منفصل:** `HeroCarousel` حاوية زرقاء مستقلة أسفل الهيدر — لا يجوز دمجهما.
- **ممنوع التصميم الرخيص المكرر:** كل صفحة تصميم فريد (bento، split warehouse، marquee، dramatic image، DNA helix، خريطة SVG، شجرة تنظيمية). ممنوع sections مرقمة متكررة.

## 3. i18n

- القاموس في `src/i18n/dictionaries.ts` + ملفات JSON. المحتوى الطويل المترجم في `src/lib/data.ts` بصيغة `Localized { fr, ar, en }`.
- أضف أي نص جديد إلى اللغات الثلاث معاً — لا تترك `fr` فقط.
- اختبر RTL حقيقياً (`/ar/...`) — أسهم ترتد (`rtl:rotate-180`)، وتذييل/قوائم تنعكس، والخريطة لا تنعكس.

## 4. الصور والمحتوى

- الصور في `public/images/` — من النموذج المرجعي `https://sotraz-v1.vercel.app` (14 صورة WebP).
- محتوى وصور النموذج هي المرجع — لا تخترع أسعاراً/تواريخ، وعناصر «à confirmer» تُترك كما هي.

## 5. الجودة (Gates — لا تُغلق مرحلة بدونها)

```bash
npm run lint -- --max-warnings=0
npm run build
```

- ممنوع warnings. Lighthouse ≥90 قبل PR. اختبار يدوي للغات الثلاث والاتجاهات.

## 6. Git & GitHub (إدارة ذاتية — بدون الرجوع للمستخدم)

- الفروع: `main` (إنتاج)، `dev` (تجميع)، `feat/*`.
- Commit messages واضحة. PRs بخطوات `research → plan → implement → test → review → fix`.
- CI في `.github/workflows/ci.yml`. وثّق كل قرار في `docs/decisions.md`.

## 7. مكتبات مسموحة ومثبتة

`next@16.4.5`، `@base-ui/react@1.9.0`، `framer-motion@14.10.1`، `lucide-react@1.70.0`، `class-variance-authority`، `clsx`، `tailwind-merge`، `tw-animate-css`، `@formatjs/intl-localematcher`، `negotiator` + `@types/negotiator`.

لإضافة مكون shadcn: `npx shadcn@latest add <name> --yes`.
