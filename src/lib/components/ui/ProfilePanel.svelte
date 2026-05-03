<script lang="ts">
  import { profile } from "$lib/stores/profile";
  import { ACCENT_COLORS } from "$lib/constants/theme";
  import type { AccentColor } from "$lib/types";

  let open = false;

  const accentOptions = Object.entries(ACCENT_COLORS) as [
    AccentColor,
    (typeof ACCENT_COLORS)[AccentColor],
  ][];
</script>

<div class="profile-root">
  <button
    class="profile-btn"
    on:click={() => (open = !open)}
    aria-expanded={open}
    aria-haspopup="dialog"
    aria-label="Profile settings"
  >
    <i class="ph-bold ph-user" style="color: #fff;"></i>
  </button>

  {#if open}
    <button
      class="backdrop"
      on:click={() => (open = false)}
      aria-label="Close settings"
      tabindex="-1"
    ></button>

    <div
      class="panel card"
      role="dialog"
      aria-label="Profile settings"
      aria-modal="true"
    >
      <!-- ─── Appearance ─── -->
      <div class="panel-section">
        <p class="panel-label">Appearance</p>

        <!-- Sliding radio toggle -->
        <div class="theme-track" role="radiogroup" aria-label="Color theme">
          <div class="thumb" class:right={$profile.theme === "dark"}></div>
          <button
            class="theme-opt"
            role="radio"
            aria-checked={$profile.theme === "light"}
            on:click={() => profile.setTheme("light")}
          >
            Light
          </button>
          <button
            class="theme-opt"
            role="radio"
            aria-checked={$profile.theme === "dark"}
            on:click={() => profile.setTheme("dark")}
          >
            Dark
          </button>
        </div>
      </div>

      <!-- ─── Accent color ─── -->
      <div class="panel-section">
        <p class="panel-label">Accent color</p>
        <div class="color-grid">
          {#each accentOptions as [key, config]}
            <button
              class="color-btn"
              class:active={$profile.accentColor === key}
              on:click={() => profile.setAccentColor(key)}
              title={config.label}
            >
              <span class="swatch" style="background: {config.hex}"></span>
              <span class="color-name">{config.label}</span>
              {#if $profile.accentColor === key}
                <span class="check" aria-hidden="true">✓</span>
              {/if}
            </button>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .profile-root {
    position: relative;
  }

  /* ─── Trigger ──────────────────────────────── */
  .profile-btn {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    background: var(--color-accent);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 2px 8px color-mix(in srgb, var(--color-accent) 35%, transparent),
      0 0 0 2px color-mix(in srgb, var(--color-accent) 15%, transparent);
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;
  }

  .profile-btn:hover {
    transform: scale(1.07);
    box-shadow:
      0 4px 12px color-mix(in srgb, var(--color-accent) 45%, transparent),
      0 0 0 3px color-mix(in srgb, var(--color-accent) 20%, transparent);
  }


  /* ─── Backdrop ─────────────────────────────── */
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 40;
    background: transparent;
    border: none;
    cursor: default;
    padding: 0;
  }

  /* ─── Panel ────────────────────────────────── */
  .panel {
    position: absolute;
    top: calc(100% + 0.75rem);
    right: 0;
    z-index: 50;
    width: 232px;
    padding: 1.125rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    /* Rich depth */
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.04),
      0 12px 24px rgba(0, 0, 0, 0.08),
      0 32px 48px rgba(0, 0, 0, 0.06);
  }

  .panel-section {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .panel-label {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: var(--color-text-secondary);
    margin: 0;
  }

  /* ─── Theme slider ─────────────────────────── */
  .theme-track {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 100px;
    padding: 3px;
  }

  .thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    /* half-width minus padding */
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

  /* ─── Color grid ───────────────────────────── */
  .color-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.375rem;
  }

  .color-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.625rem;
    border-radius: 10px;
    border: 1px solid transparent;
    background: transparent;
    cursor: pointer;
    transition:
      background 0.15s ease,
      border-color 0.15s ease;
    position: relative;
  }

  .color-btn:hover {
    background: var(--color-border);
  }

  .color-btn.active {
    background: color-mix(in srgb, var(--color-accent) 8%, transparent);
    border-color: color-mix(in srgb, var(--color-accent) 35%, transparent);
  }

  .swatch {
    width: 0.875rem;
    height: 0.875rem;
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }

  .color-name {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--color-text-primary);
    flex: 1;
    text-align: left;
  }

  .check {
    font-size: 0.7rem;
    color: var(--color-accent);
    font-weight: 700;
  }
</style>
