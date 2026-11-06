# Testing — استراتيجية الاختبار

## الحالي

```bash
npm run lint -- --max-warnings=0
npm run build
```

- Lint: صفر تحذيرات (ممنوع merging بـ warnings).
- Build: توليد 56/56 صفحة ثابتة + TypeScript صارم.

## يدوي (كل PR)

- [ ] `/fr`, `/ar`, `/en` — كلها تُعرض بشكل سليم
- [ ] RTL في `/ar`: القوائم/الأزرار تتبع الاتجاه أو ترتد، الخريطة لا تنعكس
- [ ] Header: يختفي عند النزول، يظهر عند الصعود بخلفية بيضاء وأنيميشن
- [ ] Carousel: يبدل كل 5.5s، يتوقف عند hover، أزرار prev/next تعمل
- [ ] Demandes: 4 خطوات + حالة نجاح
- [ ] Réseau / Histoire / Organigramme / Fleet: تفاعلية

## لاحق (مقترح)

- Playwright e2e للمسارات الحرجة
- Lighthouse ≥90 (أداء/SEO/إمكانية الوصول)
- axe-core للوصولية
