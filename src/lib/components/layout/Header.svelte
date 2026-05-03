<script lang="ts">
  import { page } from '$app/stores'
  import { profile } from '$lib/stores/profile'
  import { ACCENT_COLORS } from '$lib/constants/theme'
  import type { AccentColor } from '$lib/types'

  const accentOptions = Object.entries(ACCENT_COLORS) as [
    AccentColor,
    (typeof ACCENT_COLORS)[AccentColor]
  ][]

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/writing', label: 'Writing' },
    { href: '/contact', label: 'Contact' }
  ]
</script>

<header class="header">
  <div class="header-inner">
    <a href="/" class="wordmark">KG</a>

    <nav class="nav-pill" aria-label="Main navigation">
      {#each navLinks as link}
        <a
          href={link.href}
          class="nav-link"
          class:active={$page.url.pathname === link.href}
          aria-current={$page.url.pathname === link.href ? 'page' : undefined}
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <div class="controls">
      <button
        class="icon-btn"
        on:click={() => profile.setTheme($profile.theme === 'light' ? 'dark' : 'light')}
        aria-label="Toggle {$profile.theme === 'light' ? 'dark' : 'light'} mode"
        title="Toggle theme"
      >
        {$profile.theme === 'light' ? '◑' : '◐'}
      </button>

      <div class="color-picker" role="group" aria-label="Accent color">
        {#each accentOptions as [key, config]}
          <button
            class="color-swatch"
            class:active={$profile.accentColor === key}
            style="background: {config.hex}"
            on:click={() => profile.setAccentColor(key)}
            aria-label="Set accent color to {config.label}"
            title={config.label}
          ></button>
        {/each}
      </div>
    </div>
  </div>
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    padding: 1.25rem 1.5rem;
  }

  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
  }

  .wordmark {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 1.25rem;
    font-weight: 400;
    color: var(--color-text-primary);
    text-decoration: none;
    letter-spacing: -0.02em;
  }

  .nav-pill {
    display: flex;
    align-items: center;
    gap: 0.125rem;
    background: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: 100px;
    padding: 0.3rem 0.4rem;
    box-shadow: var(--shadow-card);
  }

  .nav-link {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    text-decoration: none;
    padding: 0.35rem 0.875rem;
    border-radius: 100px;
    transition:
      color 0.15s ease,
      background 0.15s ease;
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--color-text-primary);
    background: var(--color-border);
  }

  .nav-link.active {
    background: var(--color-accent);
    color: #fff;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  .icon-btn {
    width: 2rem;
    height: 2rem;
    border: 1px solid var(--color-border);
    background: var(--color-card);
    border-radius: 50%;
    cursor: pointer;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-secondary);
    box-shadow: var(--shadow-card);
    transition: transform 0.15s ease;
  }

  .icon-btn:hover {
    transform: scale(1.08);
  }

  .color-picker {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    background: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: 100px;
    padding: 0.375rem 0.625rem;
    box-shadow: var(--shadow-card);
  }

  .color-swatch {
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
    transition:
      transform 0.15s ease,
      border-color 0.15s ease;
  }

  .color-swatch:hover {
    transform: scale(1.25);
  }

  .color-swatch.active {
    border-color: var(--color-text-primary);
    transform: scale(1.2);
  }
</style>
