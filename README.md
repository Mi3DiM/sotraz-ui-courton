# SOTRAZ — Le mouvement, maîtrisé.

موقع شركة SOTRAZ (نقل بري ولوجستيات، الجزائر) — Next.js 16 متعدد اللغات (fr / ar / en) بواجهة عصرية دقيقة مستوحاة من التصميم المرجعي، مع شريط علوي منفصل تماماً عن الكاروسيل.

للتطوير على الموقع راجع `AGENTS.md` — مرجع إجباري للوكلاء.

## تشغيل محلي

```bash
npm install
npm run dev
```

ثم افتح http://localhost:3000/fr (يُعيد التوجيه `/` → `/fr`).

## مسارات

```
/{fr,ar,en}                       الرئيسية (كاروسيل + إحصائيات + حلول + قطاعات + شهادات + CTA)
/{locale}/services                الخدمات الخمس + FAQ
/{locale}/demandes                نموذج طلب 4 خطوات (بدل services-en-ligne)
/{locale}/reseau                  خريطة تفاعلية للجزائر (8 فروع)
/{locale}/histoire                ADN Timeline (1991–2024)
/{locale}/organigramme            شجرة تنظيمية تفاعلية
/{locale}/certifications          شهادات ورخص (ISO، RC)
/{locale}/flotte                  تبويبات الأسطول
/{locale}/entreprise              ثقافة ميدانية + قيم
/{locale}/secteurs                القطاعات
/{locale}/contact                 اتصل بنا
/{locale}/actualites              أخبار الميدان
/{locale}/politique-qualite       الجودة والخصوصية
```

## تقنيات

Next.js 16.4.5 · React 19.3 · Tailwind v4 · shadcn/ui (base-nova + Base UI) · Framer Motion · Lucide · قواميس i18n مخصصة (fr/ar/en + RTL).

راجع `docs/` للتوثيق الكامل.
