<script lang="ts">
  import { profile } from "$lib/stores/profile";

  // ── Dialog ───────────────────────────────────────────────
  let dialog: HTMLDialogElement | null = $state(null);

  function openPanel() {
    dialog?.showModal();
  }
  function closePanel() {
    dialog?.close();
  }

  function onDialogClick(e: MouseEvent) {
    // Close when clicking the ::backdrop area
    if (e.target === dialog) closePanel();
  }

  // ── Color math ───────────────────────────────────────────

  function hexToHsl(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min) return [0, 0, l];
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h =
      max === r
        ? (g - b) / d + (g < b ? 6 : 0)
        : max === g
          ? (b - r) / d + 2
          : (r - g) / d + 4;
    return [h * 60, s, l];
  }

  function hslToHex(h: number, s: number, l: number): string {
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * c)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  // ── Color state ──────────────────────────────────────────

  const SAT = 0.82;

  const [ih, , il] = hexToHsl($profile.accentColor ?? "#228B22");
  let hue = $state(ih);
  let lit = $state(Math.max(0.2, Math.min(0.8, il)));

  let colorHex = $derived(hslToHex(hue, SAT, lit));

  // Sync from store when profile resets externally
  $effect(() => {
    const storeHex = $profile.accentColor;
    if (storeHex !== colorHex) {
      const [h, , l] = hexToHsl(storeHex);
      hue = h;
      lit = Math.max(0.2, Math.min(0.8, l));
    }
  });

  function commit() {
    profile.setAccentColor(colorHex);
  }

  // ── Hue ring ─────────────────────────────────────────────

  const W = 160;
  const INNER = 106; // inner hole diameter
  const MID = (W / 2 + INNER / 2) / 2; // mid-ring radius ≈ 66.5

  let ringEl = $state<HTMLDivElement | null>(null);
  let dragging = $state(false);

  function angleOf(e: PointerEvent): number {
    const rect = ringEl!.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    return ((Math.atan2(dy, dx) * 180) / Math.PI + 450) % 360;
  }

  function inRing(e: PointerEvent): boolean {
    const rect = ringEl!.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    const d = Math.sqrt(dx * dx + dy * dy);
    return d >= INNER / 2 - 4 && d <= W / 2 + 4;
  }

  function ringDown(e: PointerEvent) {
    if (!ringEl || !inRing(e)) return;
    e.preventDefault();
    dragging = true;
    ringEl.setPointerCapture(e.pointerId);
    hue = angleOf(e);
    commit();
  }

  function ringMove(e: PointerEvent) {
    if (!dragging || !ringEl) return;
    hue = angleOf(e);
    commit();
  }

  function ringUp() {
    dragging = false;
  }

  let dotX = $derived(W / 2 + Math.cos(((hue - 90) * Math.PI) / 180) * MID);
  let dotY = $derived(W / 2 + Math.sin(((hue - 90) * Math.PI) / 180) * MID);
</script>

<!-- Profile button — lives in the header -->
<button
  class="profile-btn"
  onclick={openPanel}
  aria-haspopup="dialog"
  aria-label="Profile settings"
  style="background: {$profile.accentColor}"
>
  <i class="ph-bold ph-user" style="color: #fff;"></i>
</button>

<!-- Panel renders in the top layer via showModal() — escapes all stacking contexts -->
<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={dialog}
  class="panel"
  onclick={onDialogClick}
  aria-label="Profile settings"
>
  <div class="panel-inner card">
    <div class="panel-header">
      <span class="panel-title">Appearance</span>
      <button class="close-btn" onclick={closePanel} aria-label="Close">
        <i class="ph-bold ph-x"></i>
      </button>
    </div>

    <!-- Theme toggle -->
    <div class="panel-section">
      <p class="panel-label">Mode</p>
      <div class="theme-track" role="radiogroup" aria-label="Color theme">
        <div class="thumb" class:right={$profile.theme === "dark"}></div>
        <button
          class="theme-opt"
          role="radio"
          aria-checked={$profile.theme === "light"}
          onclick={() => profile.setTheme("light")}>Light</button
        >
        <button
          class="theme-opt"
          role="radio"
          aria-checked={$profile.theme === "dark"}
          onclick={() => profile.setTheme("dark")}>Dark</button
        >
      </div>
    </div>

    <!-- Color picker -->
    <div class="panel-section">
      <p class="panel-label">Accent color</p>

      <!-- Hue ring -->
      <div
        class="ring"
        bind:this={ringEl}
        onpointerdown={ringDown}
        onpointermove={ringMove}
        onpointerup={ringUp}
        onpointercancel={ringUp}
        role="presentation"
        style="width:{W}px;height:{W}px;"
      >
        <!-- Indicator dot -->
        <svg
          width={W}
          height={W}
          style="position:absolute;inset:0;pointer-events:none;"
          aria-hidden="true"
        >
          <circle
            cx={dotX}
            cy={dotY}
            r="9"
            fill={colorHex}
            stroke="white"
            stroke-width="2.5"
          />
        </svg>

        <!-- Center swatch -->
        <div class="ring-center" style="background:{colorHex}"></div>
      </div>

      <!-- Lightness slider -->
      <div class="slider-wrap">
        <input
          type="range"
          class="lit-slider"
          min="0.15"
          max="0.85"
          step="0.005"
          value={lit}
          oninput={(e) => {
            lit = parseFloat((e.currentTarget as HTMLInputElement).value);
            commit();
          }}
          aria-label="Brightness"
          style="--h:{Math.round(hue)}"
        />
      </div>

      <div class="color-meta">
        <div class="color-swatch" style="background:{colorHex}"></div>
        <span class="color-hex">{colorHex}</span>
      </div>
    </div>

    <button
      class="reset-btn"
      onclick={() => {
        profile.reset();
        dialog?.close();
      }}
    >
      Reset defaults
    </button>
  </div>
</dialog>

<style>
  /* ── Profile button ───────────────────────────────────── */
  .profile-btn {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      transform 0.15s ease,
      opacity 0.15s ease;
    flex-shrink: 0;
  }

  .profile-btn:hover {
    opacity: 0.85;
  }

  /* ── Dialog / top-layer panel ─────────────────────────── */
  dialog.panel {
    /* Override UA dialog styles */
    border: none;
    padding: 0;
    background: transparent;
    outline: none;
    /* Position below the header, right-aligned */
    position: fixed;
    top: calc(var(--header-h, 64px) + 0.75rem);
    right: 1.5rem;
    left: auto;
    margin: 0;
    max-width: calc(100vw - 3rem);
    width: 280px;
  }

  dialog.panel::backdrop {
    background: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }

  .panel-inner {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.125rem;
  }

  /* ── Header row ───────────────────────────────────────── */
  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .panel-title {
    font-family: "Manrope", sans-serif;
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }

  .close-btn {
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 6px;
    border: 1px solid var(--color-border);
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    transition:
      background 0.15s ease,
      color 0.15s ease;
  }

  .close-btn:hover {
    background: var(--color-border);
    color: var(--color-text-primary);
  }

  /* ── Section ──────────────────────────────────────────── */
  .panel-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .panel-label {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: var(--color-text-secondary);
    margin: 0;
    align-self: flex-start;
  }

  /* ── Theme track ──────────────────────────────────────── */
  .theme-track {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 100px;
    padding: 3px;
    width: 100%;
  }

  .thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: calc(50% - 3px);
    height: calc(100% - 6px);
    background: var(--color-card);
    border-radius: 100px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12);
    transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
  }

  .thumb.right {
    transform: translateX(100%);
  }

  .theme-opt {
    position: relative;
    z-index: 1;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    padding: 0.4rem 0;
    border-radius: 100px;
    transition: color 0.2s ease;
    text-align: center;
  }

  .theme-opt[aria-checked="true"] {
    color: var(--color-text-primary);
  }

  /* ── Hue ring ─────────────────────────────────────────── */
  .ring {
    position: relative;
    border-radius: 50%;
    background: conic-gradient(
      hsl(0, 82%, 55%),
      hsl(30, 82%, 55%),
      hsl(60, 82%, 55%),
      hsl(90, 82%, 55%),
      hsl(120, 82%, 55%),
      hsl(150, 82%, 55%),
      hsl(180, 82%, 55%),
      hsl(210, 82%, 55%),
      hsl(240, 82%, 55%),
      hsl(270, 82%, 55%),
      hsl(300, 82%, 55%),
      hsl(330, 82%, 55%),
      hsl(360, 82%, 55%)
    );
    cursor: crosshair;
    user-select: none;
    touch-action: none;
    flex-shrink: 0;
  }

  .ring-center {
    position: absolute;
    /* inset = (W - INNER) / 2 = (160 - 106) / 2 = 27px */
    inset: 27px;
    border-radius: 50%;
    border: 3px solid var(--color-card);
    transition: background 0.08s ease;
  }

  /* ── Lightness slider ─────────────────────────────────── */
  .slider-wrap {
    width: 100%;
  }

  .lit-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 999px;
    outline: none;
    cursor: pointer;
    border: none;
    background: linear-gradient(
      to right,
      hsl(var(--h), 82%, 15%),
      hsl(var(--h), 82%, 55%),
      hsl(var(--h), 82%, 85%)
    );
  }

  .lit-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: white;
    border: 2px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }

  .lit-slider::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: white;
    border: 2px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }

  /* ── Color meta row ───────────────────────────────────── */
  .color-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    align-self: flex-start;
  }

  .color-swatch {
    width: 1.125rem;
    height: 1.125rem;
    border-radius: 50%;
    border: 1px solid var(--color-border);
    flex-shrink: 0;
  }

  .color-hex {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.75rem;
    color: var(--color-text-secondary);
  }

  /* ── Reset ────────────────────────────────────────────── */
  .reset-btn {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    background: transparent;
    border: 1px solid var(--color-border);
    border-radius: 999px;
    cursor: pointer;
    padding: 0.4375rem 1rem;
    width: 100%;
    text-align: center;
    transition:
      background 0.15s ease,
      color 0.15s ease;
  }

  .reset-btn:hover {
    background: var(--color-border);
    color: var(--color-text-primary);
  }
</style>
