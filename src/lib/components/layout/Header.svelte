<script lang="ts">
  import { page } from "$app/stores";

  const navLinks = [
    { label: "About", href: "/now" },
    { label: "Work", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "Speaking", href: "/speaking" },
  ];
</script>

<header class="header">
  <div class="header-inner">
    <a href="/" class="logo">Kaleb Garner</a>

    <nav class="nav" aria-label="Main navigation">
      {#each navLinks as link}
        <a
          href={link.href}
          class="nav-link"
          class:active={$page.url.pathname === link.href}
        >
          {link.label}
        </a>
      {/each}
    </nav>
  </div>
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 40;
    background: #000000;
  }

  .header-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    color: var(--color-font);
    text-decoration: none;
    font-family: "Cabinet", sans-serif;
    font-size: var(--text-medium);
    font-weight: 500;
    letter-spacing: 0.05rem;
    line-height: 1;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-accent);
    }
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-link {
    font-size: var(--text-body);
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    letter-spacing: 0.04em;
    transition: color 0.15s ease;

    &:hover {
      color: rgba(255, 255, 255, 0.9);
    }

    &.active {
      color: var(--color-font);
    }
  }
</style>
