# kg-web

Personal portfolio site for [kalebgarner.dev](https://kalebgarner.dev). Built as a product, not a portfolio — the experience adapts to who's visiting.

## Stack

| Layer | Choice |
|---|---|
| Framework | SvelteKit 2 + Svelte 5 |
| Styling | Tailwind CSS 3 + CSS custom properties |
| Background | [`shaders`](https://shaders.com) — `Smoke` component |
| Type checking | TypeScript 5 + `svelte-check` |
| Icons | Phosphor Icons (CDN) |
| Fonts | Manrope (body), Fraunces (display) |

## Getting started

```bash
npm install
npm run dev        # localhost:5173
npm run check      # type check
npm run build      # production build
npm run preview    # preview production build
```

## Project structure

```
src/
├── app.html                        # HTML shell — inline script prevents theme flash on load
├── app.css                         # Design tokens, card primitive, global base styles
│
├── lib/
│   ├── components/
│   │   ├── background/
│   │   │   └── SmokeBackground.svelte   # Full-page shader canvas (fixed, z-0)
│   │   ├── layout/
│   │   │   ├── Header.svelte            # Fixed pill nav + ProfilePanel trigger
│   │   │   ├── Footer.svelte            # Minimal footer with social links
│   │   │   ├── FullPageScroll.svelte    # Full-page scroll engine (wheel/touch/keyboard)
│   │   │   └── Section.svelte           # Individual scroll section (reads scroll context)
│   │   └── ui/
│   │       ├── Bento.svelte             # Card primitive — top/bottom slots
│   │       └── ProfilePanel.svelte      # Theme + accent color settings panel
│   │
│   ├── constants/
│   │   └── theme.ts                     # Accent color map (hex + smoke secondary)
│   ├── stores/
│   │   └── profile.ts                   # User profile store (theme, accent) → localStorage
│   └── types/
│       └── index.ts                     # Shared TypeScript types
│
└── routes/
    ├── +layout.svelte      # Persistent shell: smoke, header, footer
    ├── +layout.ts          # SSR config
    ├── +page.svelte        # Homepage — full-page scroll with Bento sections
    ├── about/
    ├── work/
    ├── content/
    └── contact/
```

## Key architecture decisions

### Single-page scroll (homepage only)
The homepage uses `FullPageScroll` + `Section` components. Scroll sections are absolutely stacked; wheel/touch/keyboard events advance the active index. The `Section` component reads current index via Svelte context and transitions with `opacity` + `translateY` + `scale`. Navigation between sections uses a lock (`LOCK_MS = 750ms`) to prevent runaway fast-scrolling.

### Layout persistence
`+layout.svelte` is the persistent shell across all routes. `SmokeBackground` lives here and survives client-side navigation without re-mounting. This requires all linked routes to have a `+page.svelte` — missing routes cause full browser navigations (hard reloads), which destroy the layout.

### Theme system
CSS custom properties defined on `:root` in `app.css`. Dark mode overrides live on `[data-theme='dark']`. `document.documentElement` is the single source of truth — the profile store keeps it in sync reactively. An inline blocking script in `app.html` reads `localStorage` before first paint to prevent the light→dark flash on load.

### Bento primitive
`Bento.svelte` is a layout primitive, not a content component. It owns the card shell (background, radius, shadow, border) and exposes `slot="top"` and `slot="bottom"` with automatic divider rendering. Content belongs in the page or in feature-specific components that consume `Bento`.

### Profile store
`profile.ts` exports a custom writable store that persists to `localStorage` under `kg_profile`. It is initialized from storage on the client; falls back to defaults on the server. The store drives two things: the active theme and the active accent color. Both are mirrored to CSS custom properties on `document.documentElement`.
