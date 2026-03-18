# AKZA Client アクザ

Публичная витрина бренда AKZA — галерея коллекций, drop-механика, страницы изделий и форма заявок.

## Стек
- React 18 + TypeScript (strict)
- Feature-Sliced Design (FSD)
- MobX 6 — client state (nav, order form)
- TanStack Query v5 — server state
- GSAP + ScrollTrigger — анимации (curtain reveal, parallax, stagger, digit countdown)
- Sonner — toast уведомления
- Storybook 8 — документация компонентов
- Tailwind CSS v3 + clsx + tailwind-merge
- React Hook Form + Zod
- Vite 5

## Дизайн
- Шрифты: **Cormorant Garamond** (display) · **Jost** (body) · **Noto Serif JP** (японские символы)
- Палитра: ink `#0A0A0A` · ash · coal · smoke · fog · mist `#FAFAFA` · red `#C0392B`
- Зерно плёнки: CSS grain overlay (fixed, pointer-events: none)
- Курсор: crosshair на всём сайте
- Анимации: curtain reveal на hero-image, parallax scroll, heroReveal с skewY, stagger fadeIn для карточек

## Запуск

```bash
npm install
cp .env.example .env.local   # VITE_API_URL
npm run dev                   # http://localhost:5173
```

## Storybook

```bash
npm run storybook             # http://localhost:6006
```

## Маршруты

| Маршрут | Страница |
|---------|----------|
| `/` | Главная — список коллекций + hero |
| `/collections/:slug` | Коллекция + продукты + countdown |
| `/collections/:slug/:productSlug` | Изделие + варианты |
| `/collections/:slug/:productSlug/:variantSlug` | Вариант + галерея + форма заявки |

## Структура (FSD)

```
src/
├── app/          # stores (MobX), providers, router, styles
├── pages/        # home, collection, product, variant, not-found
├── widgets/      # site-header, site-footer, collection-hero,
│                 # collection-grid, variant-gallery, order-form
├── features/     # submit-order, countdown-timer, share-link
├── entities/     # collection, product, variant (types, api, model, ui)
└── shared/       # ui, lib, api, config, hooks, styles
```
