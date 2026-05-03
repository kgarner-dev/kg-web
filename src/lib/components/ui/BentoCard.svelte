<script lang="ts">
  export let imageSrc: string = ''
  export let imageAlt: string = 'Kaleb Garner'
</script>

<article class="hero-card card">
  <div class="top-row">
    <div class="avatar" aria-label="Profile photo">
      {#if imageSrc}
        <img src={imageSrc} alt={imageAlt} />
      {:else}
        <div class="avatar-placeholder"></div>
      {/if}
    </div>

    <div class="name-block">
      <h1 class="name">Kaleb<br />Garner</h1>
    </div>
  </div>

  <div class="bottom-row">
    <p class="description">
      Software engineer and technical builder based in Dallas, TX. I design systems, ship products,
      and co-host Coffee Shop Coders — a podcast about developer craft and career. Currently building
      Korekit.
    </p>
    <div class="meta">
      <span class="location">Dallas, TX</span>
      <span class="dot" aria-hidden="true">·</span>
      <span class="status">Open to conversations</span>
    </div>
  </div>
</article>

<style>
  .hero-card {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  /* ─── Top row ──────────────────────── */
  .top-row {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .avatar {
    width: 96px;
    height: 96px;
    border-radius: 16px;
    overflow: hidden;
    flex-shrink: 0;
    border: 1px solid var(--color-border);
    background: var(--color-border);
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      var(--color-accent) 0%,
      color-mix(in srgb, var(--color-accent) 30%, transparent) 100%
    );
    opacity: 0.35;
  }

  .name-block {
    flex: 1;
    display: flex;
    align-items: flex-start;
  }

  .name {
    font-family: 'Fraunces', Georgia, serif;
    font-size: clamp(2.75rem, 6vw, 4rem);
    font-weight: 300;
    line-height: 0.95;
    letter-spacing: -0.025em;
    color: var(--color-text-primary);
    margin: 0;
  }

  /* ─── Bottom row ───────────────────── */
  .bottom-row {
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }

  .description {
    font-size: 0.9375rem;
    line-height: 1.65;
    color: var(--color-text-secondary);
    max-width: 52ch;
    margin: 0;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8125rem;
    color: var(--color-text-secondary);
  }

  .dot {
    opacity: 0.35;
  }

  .location {
    font-weight: 500;
    color: var(--color-text-primary);
  }

  .status {
    font-weight: 500;
    color: var(--color-accent);
  }
</style>
