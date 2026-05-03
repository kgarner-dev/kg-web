<script lang="ts">
  import FullPageScroll from "$lib/components/layout/FullPageScroll.svelte";
  import Section from "$lib/components/layout/Section.svelte";
  import Bento from "$lib/components/ui/Bento.svelte";
</script>

<svelte:head>
  <title>Kaleb Garner — Software Engineer & Builder</title>
</svelte:head>

<FullPageScroll sectionCount={4}>
  <!-- 0 · Hero ─────────────────────────────────────── -->
  <Section index={0}>
    <div class="hero-wrap">
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
    <div class="placeholder-section">
      <span class="eyebrow">Selected work</span>
      <h2 class="section-heading">Things I've built.</h2>
      <p class="section-sub">Projects, systems, and shipped products.</p>
    </div>
  </Section>

  <!-- 2 · Writing ───────────────────────────────────── -->
  <Section index={2}>
    <div class="placeholder-section">
      <span class="eyebrow">Writing</span>
      <h2 class="section-heading">Ideas in progress.</h2>
      <p class="section-sub">
        Essays on systems, product, and building in public.
      </p>
    </div>
  </Section>

  <!-- 3 · Contact ───────────────────────────────────── -->
  <Section index={3}>
    <div class="placeholder-section">
      <span class="eyebrow">Let's talk</span>
      <h2 class="section-heading">Say something.</h2>
      <p class="section-sub">
        Whether you're a developer, founder, or just curious.
      </p>
    </div>
  </Section>
</FullPageScroll>

<style>
  /* ─── Hero ─────────────────────────────────── */
  .hero-wrap {
    width: 100%;
    max-width: 700px;
  }

  .avatar {
    width: 96px;
    height: 96px;
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
    font-size: clamp(2.25rem, 5vw, 3.25rem);
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
    max-width: 52ch;
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

  /* ─── Placeholder sections ──────────────────── */
  .placeholder-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    max-width: 560px;
  }

  .eyebrow {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
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

  .section-sub {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin: 0;
    max-width: 40ch;
  }
</style>
