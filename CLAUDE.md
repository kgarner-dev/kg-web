# Claude context — kg-web

Personal portfolio site. SvelteKit 2 + Svelte 5, Tailwind 3, TypeScript.

## Commands

```bash
npm run dev          # dev server (localhost:5173)
npm run check        # svelte-check type check — run before every commit
npm run build        # production build
```

## Architecture

### File conventions

- **Routes** live in `src/routes/`. Every linked route needs a `+page.svelte` or navigation falls back to a full browser reload, which breaks layout persistence and resets the smoke background.
- **Shared components** live in `src/lib/components/`, organized by role:
  - `background/` — canvas/shader components
  - `layout/` — structural components (header, footer, scroll engine, sections)
  - `ui/` — reusable primitives and interactive components
- **Types** in `src/lib/types/index.ts`. All shared types live here — don't scatter them.
- **Constants** in `src/lib/constants/theme.ts`. Accent color definitions live here. If you add a new accent color, update both `theme.ts` and the inline script in `src/app.html` (the `COLORS` map).
- **Stores** in `src/lib/stores/`. Currently only `profile.ts`.

### CSS / theming

Design tokens are CSS custom properties on `:root` in `src/app.css`. Dark mode overrides on `[data-theme='dark']`. Never hardcode colors in components — always use the token variables:

```css
var(--color-accent)          /* primary accent, user-selectable */
var(--color-bg)              /* page background */
var(--color-card)            /* card surface */
var(--color-text-primary)
var(--color-text-secondary)
var(--color-border)
var(--shadow-card)
var(--shadow-card-inset)
var(--radius-card)           /* 20px */
```

`document.documentElement` is the single source of truth. The profile store sets `data-theme` and `--color-accent` on it reactively. The inline script in `app.html` sets them synchronously before first paint.

**Do not** set `data-theme` or `--color-accent` on child elements — the cascade only flows down.

### Bento primitive

`Bento.svelte` is a layout primitive. Use it for every card on the site:

```svelte
<Bento as="article">
  <svelte:fragment slot="top">
    <!-- image, icon, header content -->
  </svelte:fragment>
  <svelte:fragment slot="bottom">
    <!-- body content, descriptions, meta -->
  </svelte:fragment>
</Bento>
```

- `slot="top"` and `slot="bottom"` get a border between them automatically.
- Use `as="article"` or `as="section"` for semantic elements; defaults to `div`.
- For a simple one-section card, use the default slot — no named slots needed.
- `Bento` owns all card structure. Do not add `card` class or card-related styles outside of it.

### Full-page scroll (homepage)

`FullPageScroll` + `Section` are used only on `+page.svelte`. They form a pair:

```svelte
<FullPageScroll sectionCount={4}>
  <Section index={0}>...</Section>
  <Section index={1}>...</Section>
</FullPageScroll>
```

`FullPageScroll` sets scroll context (`current` store + `goTo` fn). `Section` reads it to determine its state (`active` / `above` / `below`) and applies CSS transitions. Lock duration is 750ms — don't lower it, it prevents scroll-through on trackpads.

### Profile store

```typescript
import { profile } from '$lib/stores/profile'

// Read
$profile.theme          // 'light' | 'dark'
$profile.accentColor    // 'amber' | 'clay' | 'blue' | 'sage'

// Write
profile.setTheme('dark')
profile.setAccentColor('clay')
profile.reset()
```

Persists to `localStorage` under key `kg_profile`. Safe to call anywhere — SSR falls back to defaults, client reads from storage.

### Smoke background

`SmokeBackground` is in the root layout and persists across all routes. It takes `colorA` (fresh smoke) and `colorB` (aged smoke) as hex strings — both driven by the accent config in `theme.ts`. Opacity is set to `0.25` in the component. The shader is SSR-safe (renders nothing server-side).

### Adding a new accent color

1. Add the entry to `ACCENT_COLORS` in `src/lib/constants/theme.ts`
2. Add the same key + hex to the `COLORS` map in the inline script in `src/app.html`
3. Update `AccentColor` type in `src/lib/types/index.ts`

### Adding a new route

1. Create `src/routes/<name>/+page.svelte`
2. Add the link to `navLinks` in `src/lib/components/layout/Header.svelte`

Both steps required. A nav link without a `+page.svelte` causes hard reloads.
