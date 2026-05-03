<svelte:head>
  <title>Writing — Kaleb Garner</title>
</svelte:head>

<section class="page">
  <span class="eyebrow">Writing</span>
  <h1 class="heading">Ideas in progress.</h1>
  <p class="sub">Essays on systems, product, and building in public.</p>
</section>

<style>
  .page {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 6rem 2rem 4rem;
    max-width: 640px;
    margin: 0 auto;
  }

  .eyebrow {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-accent);
    margin-bottom: 1rem;
  }

  .heading {
    font-family: 'Fraunces', Georgia, serif;
    font-size: clamp(2.75rem, 7vw, 4.5rem);
    font-weight: 300;
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--color-text-primary);
    margin: 0 0 1rem;
  }

  .sub {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin: 0;
    max-width: 40ch;
  }
</style>
