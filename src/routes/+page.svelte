<script lang="ts">
  import FullPageScroll from '$lib/components/layout/FullPageScroll.svelte'
  import Section from '$lib/components/layout/Section.svelte'
  import BentoCard from '$lib/components/ui/BentoCard.svelte'
</script>

<svelte:head>
  <title>Kaleb Garner — Software Engineer & Builder</title>
</svelte:head>

<FullPageScroll sectionCount={4}>
  <!-- 0 · Hero -->
  <Section index={0}>
    <div class="hero-wrap">
      <BentoCard />
    </div>
  </Section>

  <!-- 1 · Work -->
  <Section index={1}>
    <div class="placeholder-section">
      <span class="eyebrow">Selected work</span>
      <h2 class="section-heading">Things I've built.</h2>
      <p class="section-sub">Projects, systems, and shipped products.</p>
    </div>
  </Section>

  <!-- 2 · Writing -->
  <Section index={2}>
    <div class="placeholder-section">
      <span class="eyebrow">Writing</span>
      <h2 class="section-heading">Ideas in progress.</h2>
      <p class="section-sub">Essays on systems, product, and building in public.</p>
    </div>
  </Section>

  <!-- 3 · Contact -->
  <Section index={3}>
    <div class="placeholder-section">
      <span class="eyebrow">Let's talk</span>
      <h2 class="section-heading">Say something.</h2>
      <p class="section-sub">Whether you're a developer, founder, or just curious.</p>
    </div>
  </Section>
</FullPageScroll>

<style>
  .hero-wrap {
    width: 100%;
    max-width: 700px;
  }

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
    font-family: 'Fraunces', Georgia, serif;
    font-size: clamp(2.75rem, 7vw, 4.5rem);
    font-weight: 300;
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
