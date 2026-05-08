<script lang="ts">
  import '../app.css'
  import { browser } from '$app/environment'
  import { page } from '$app/stores'
  import { profile } from '$lib/stores/profile'
  import { ACCENT_COLORS } from '$lib/constants/theme'
  import SmokeBackground from '$lib/components/background/SmokeBackground.svelte'
  import Header from '$lib/components/layout/Header.svelte'
  import Footer from '$lib/components/layout/Footer.svelte'

  $: accent = ACCENT_COLORS[$profile.accentColor]
  $: isHome = $page.url.pathname === '/'

  // <html> is the single source of truth for theme + accent.
  // The inline script in app.html handles first paint — this handles live changes.
  $: if (browser) {
    document.documentElement.setAttribute('data-theme', $profile.theme)
    document.documentElement.style.setProperty('--color-accent', accent.hex)
  }
</script>

<svelte:head>
  <title>Kaleb Garner</title>
  <meta name="description" content="Software engineer and technical builder based in Dallas, TX." />
  <meta property="og:title" content="Kaleb Garner" />
  <meta
    property="og:description"
    content="Software engineer and technical builder based in Dallas, TX."
  />
</svelte:head>

<div class="site-root" class:scroll-locked={isHome}>
  <SmokeBackground colorA={accent.hex} colorB={accent.smokeSecondary} />
  <Header />
  <main class="main-content" class:full-height={isHome}>
    <slot />
  </main>
  {#if !isHome}
    <Footer />
  {/if}
</div>

<style>
  .site-root {
    position: relative;
    min-height: 100dvh;
  }

  .site-root.scroll-locked {
    height: 100dvh;
    overflow: hidden;
  }

  .main-content {
    position: relative;
    z-index: 10;
  }

  .main-content.full-height {
    height: 100%;
  }
</style>
