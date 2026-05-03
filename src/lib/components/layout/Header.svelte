<script lang="ts">
  import { page } from '$app/stores'
  import ProfilePanel from '$lib/components/ui/ProfilePanel.svelte'

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

    <ProfilePanel />
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

  .nav-link:hover {
    color: var(--color-text-primary);
    background: var(--color-border);
  }

  .nav-link.active {
    background: var(--color-accent);
    color: #fff;
  }
</style>
