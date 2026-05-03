<script lang="ts">
  import FullPageScroll from "$lib/components/layout/FullPageScroll.svelte";
  import Section from "$lib/components/layout/Section.svelte";
  import Bento from "$lib/components/ui/Bento.svelte";
</script>

<svelte:head>
  <title>Kaleb Garner | Product Architect & Technical Lead</title>
</svelte:head>

<FullPageScroll sectionCount={4}>
  <!-- 0 · Hero ─────────────────────────────────────── -->
  <Section index={0}>
    <div class="page-wrap">
      <Bento as="article">
        <svelte:fragment slot="top">
          <div class="avatar" aria-label="Profile photo">
            <div class="avatar-placeholder"></div>
          </div>
        </svelte:fragment>

        <svelte:fragment slot="bottom">
          <h1 class="name">Kaleb Garner</h1>
          <p class="description">
            Product architect, technical lead and content creator whose passion
            for turning real-world problems into platform-level solutions has
            shaped how engineering teams think, build, and operate. Convinced
            that the best engineering advice rarely starts with code.
          </p>
          <div class="meta">
            <span class="location">Dallas, TX</span>
            <span class="dot" aria-hidden="true">·</span>
            <span class="status">Open to conversations</span>
          </div>
        </svelte:fragment>
      </Bento>
    </div>
  </Section>

  <!-- 1 · Work ──────────────────────────────────────── -->
  <Section index={1}>
    <div class="page-wrap">
      <Bento as="article">
        <svelte:fragment slot="top">
          <h2 class="section-heading">Featured Content</h2>
        </svelte:fragment>

        <svelte:fragment slot="bottom">
          <p>Example</p>
        </svelte:fragment>
      </Bento>
    </div>
  </Section>

  <!-- 2 · Content ───────────────────────────────────── -->
  <Section index={2}>
    <div class="page-wrap">
      <Bento as="article">
        <svelte:fragment slot="top">
          <h2 class="section-heading">Featured Work</h2>
        </svelte:fragment>

        <svelte:fragment slot="bottom">
          <p>Example</p>
        </svelte:fragment>
      </Bento>
    </div>
  </Section>

  <!-- 3 · Contact ───────────────────────────────────── -->
  <Section index={3}>
    <div class="page-wrap">
      <Bento as="article">
        <svelte:fragment slot="top">
          <h2 class="section-heading">Let's Connect</h2>
        </svelte:fragment>

        <svelte:fragment slot="bottom">
          <p>Example</p>
        </svelte:fragment>
      </Bento>
    </div>
  </Section>
</FullPageScroll>

<style>
  /* ─── Hero ─────────────────────────────────── */
  .page-wrap {
    width: 100%;
    max-width: 1000px;
  }

  .avatar {
    width: 150px;
    height: 150px;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--color-border);
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--color-accent) 55%, white) 0%,
      color-mix(in srgb, var(--color-accent) 20%, white) 100%
    );
  }

  .name {
    font-family: "Manrope", sans-serif;
    font-size: clamp(2.75rem, 7vw, 4.5rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.025em;
    color: var(--color-text-primary);
    margin: 0 0 0.875rem;
  }

  .description {
    font-size: 0.9375rem;
    line-height: 1.65;
    color: var(--color-text-secondary);
    margin: 0 0 1rem;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8125rem;
  }

  .dot {
    opacity: 0.3;
    color: var(--color-text-secondary);
  }

  .location {
    font-weight: 500;
    color: var(--color-text-primary);
  }

  .status {
    font-weight: 500;
    color: var(--color-accent);
  }

  .section-heading {
    font-family: "Manrope", sans-serif;
    font-size: clamp(2.75rem, 7vw, 4.5rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--color-text-primary);
    margin: 0;
  }
</style>
