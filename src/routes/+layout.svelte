<script lang="ts">
  import "../app.css";
  import type { LayoutData } from "./$types";
  import type { Snippet } from "svelte";
  import { page } from "$app/stores";
  import { fade } from "svelte/transition";
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import Prism from "$lib/components/background/Prism.svelte";
  import { dev } from "$app/environment";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

  injectSpeedInsights();
  injectAnalytics({ mode: dev ? "development" : "production" });
  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
  <title>Kaleb Garner</title>
  <meta
    name="description"
    content="Engineering Lead and Systems Architect based in Dallas, TX. Focused on platform thinking, technical leadership, and building teams that ship."
  />
  <meta property="og:title" content="Kaleb Garner" />
  <meta
    property="og:description"
    content="Engineering Lead and Systems Architect based in Dallas, TX."
  />
</svelte:head>

<Prism
  animationType="3drotate"
  timeScale={0.1}
  height={4}
  baseWidth={6}
  scale={3}
  hueShift={-3.1416}
  colorFrequency={1.2}
  noise={0.05}
  glow={1.2}
/>
<Header />

<div class="body-container">
  {#key $page.url.pathname}
    <div in:fade={{ duration: 200 }}>
      {@render children()}
    </div>
  {/key}
</div>

<Footer />

<style>
  .body-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 0 1rem;
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    margin-top: 5.5rem;
  }
</style>
