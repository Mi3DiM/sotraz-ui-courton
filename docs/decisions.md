# Decisions — قرارات تقنية موثقة

تم التحقق من التوثيق الرسمي ومصادر `llms.txt` والإصدارات الحالية (`npm view`) قبل التثبيت — 2026-11-06.

| القرار | الاختيار | السبب |
|--------|----------|-------|
| Next.js | 16.4.5 + React 19.3 | Active LTS الحالي (وثائق nextjs.org/llms.txt). Turbopack + Cache Components + Partial Prefetching |
| التوجيه متعدد اللغات | `src/app/[locale]` + `src/proxy.ts` (Next 16) | نمط التوثيق الرسمي internationalization.md — `proxy.ts` حل محل `middleware.ts` في Next 16 |
| i18n | قواميس مخصصة (JSON) + `@formatjs/intl-localematcher` + `negotiator` | التوثيق الرسمي للـ dictionaries pattern؛ أخف من next-intl، صفر runtime إضافي، يعمل مع Server Components |
| shadcn/ui | `base-nova` + قاعدة `base` (Base UI) + RTL | وثائق ui.shadcn.com/llms.txt؛ التوافق مع Tailwind v4 و RTL |
| Base UI | `@base-ui/react@1.9.0` | البديل المعتمد في shadcn init؛ وصول كامل وبدون أنماط |
| Tailwind | v4 (`@tailwindcss/turbopack`) | مثبت افتراضياً في create-next-app مع Next 16 |
| حركات | `framer-motion@14.10.1` | هيدر hide/show، DNA helix، أنيميشن الشجرة |
| أيقونات | `lucide-react@1.70.0` | متممة shadcn؛ ملاحظة: أيقونات العلامات (Facebook…) محذوفة في هذا الإصدار — استُبدلت بـ Globe/Share2/AtSign |
| الخريطة | SVG مخصص + دبابيس تفاعلية | أخف من Leaflet وأدق بصرياً؛ لا تعكس في RTL |
| ADR timeline | SVG helix مخصص | بدون مكتبة — تحكم كامل |
| صور | 14 صورة WebP من النموذج المرجعي | طلب المستخدم حرفياً؛ نُزّلت إلى `public/images/` |

## Gates المحققة

- Lint صفر تحذيرات ✅ · Build 56 صفحة ✅ (14 مساراً × 3 لغات + root + not-found)
- Header/Carousel منفصلان ✅ · RTL ✅ · Demandes (بدل services en ligne) ✅
