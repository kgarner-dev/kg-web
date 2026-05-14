<script lang="ts">
  import "../app.css";
  import type { LayoutData } from "./$types";
  import type { Snippet } from "svelte";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { fade } from "svelte/transition";
  import { profile } from "$lib/stores/profile";
  import Header from "$lib/components/layout/Header.svelte";
  import Sidebar from "$lib/components/layout/Sidebar.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import { dev } from "$app/environment";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

  injectSpeedInsights();
  injectAnalytics({ mode: dev ? "development" : "production" });
  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  $effect(() => {
    if (browser) {
      document.documentElement.setAttribute("data-theme", $profile.theme);
      document.documentElement.style.setProperty(
        "--color-accent",
        $profile.accentColor,
      );
    }
  });
</script>

<svelte:head>
  <title>Kaleb Garner</title>
  <meta
    name="description"
    content="Software engineer and technical builder based in Dallas, TX."
  />
  <meta property="og:title" content="Kaleb Garner" />
  <meta
    property="og:description"
    content="Software engineer and technical builder based in Dallas, TX."
  />
</svelte:head>

<div class="site-root">
  <Header tags={data.tags} />

  <main class="main-section">
    <div class="page-grid">
      <div class="content-col">
        {#key $page.url.pathname}
          <div class="page-fade" in:fade={{ duration: 200 }}>
            {@render children()}
          </div>
        {/key}
      </div>

      <Sidebar tags={data.tags} />
    </div>
  </main>

  <Footer />
</div>

<style>
  .site-root {
    position: relative;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  main.main-section {
    flex: 1;
  }

  .page-grid {
    display: grid;
    grid-template-columns: 1fr var(--sidebar-w, 260px);
    gap: 1rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    align-items: start;
  }

  .content-col {
    min-width: 0;
  }

  .page-fade {
    min-height: 1px;
  }

  @media (max-width: 768px) {
    .page-grid {
      grid-template-columns: 1fr;
      padding: 0 1rem;
    }
  }
</style>
