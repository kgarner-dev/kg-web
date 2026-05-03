<script lang="ts">
  import '../app.css'
  import { browser } from '$app/environment'
  import { profile } from '$lib/stores/profile'
  import { ACCENT_COLORS } from '$lib/constants/theme'
  import SmokeBackground from '$lib/components/background/SmokeBackground.svelte'
  import Header from '$lib/components/layout/Header.svelte'
  import Footer from '$lib/components/layout/Footer.svelte'

  $: accent = ACCENT_COLORS[$profile.accentColor]

  // Mirror theme onto <html> so CSS variables cascade correctly to <body>
  $: if (browser) document.documentElement.setAttribute('data-theme', $profile.theme)
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

<div
  class="site-root"
  data-theme={$profile.theme}
  style="--color-accent: {accent.hex}"
>
  <SmokeBackground colorA={accent.hex} colorB={accent.smokeSecondary} />

  <Header />

  <main class="main-content">
    <slot />
  </main>

  <Footer />
</div>

<style>
  .site-root {
    position: relative;
    height: 100dvh;
    overflow: hidden;
  }

  .main-content {
    position: relative;
    z-index: 10;
    height: 100%;
  }
</style>
