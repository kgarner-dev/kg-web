<script lang="ts">
  import Bento from './Bento.svelte'

  export let imageSrc: string = ''
  export let imageAlt: string = 'Kaleb Garner'
</script>

<Bento as="article">
  <svelte:fragment slot="top">
    <div class="avatar" aria-label="Profile photo">
      {#if imageSrc}
        <img src={imageSrc} alt={imageAlt} />
      {:else}
        <div class="avatar-placeholder"></div>
      {/if}
    </div>
  </svelte:fragment>

  <svelte:fragment slot="bottom">
    <h1 class="name">Kaleb Garner</h1>
    <p class="description">
      Product architect, technical lead and content creator whose passion for turning real-world
      problems into platform-level solutions has shaped how engineering teams think, build, and
      operate. Convinced that the best engineering advice rarely starts with code.
    </p>
    <div class="meta">
      <span class="location">Dallas, TX</span>
      <span class="dot" aria-hidden="true">·</span>
      <span class="status">Open to conversations</span>
    </div>
  </svelte:fragment>
</Bento>

<style>
  /* ─── Avatar ───────────────────────────── */
  .avatar {
    width: 96px;
    height: 96px;
    border-radius: 16px;
    overflow: hidden;
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
      color-mix(in srgb, var(--color-accent) 55%, white) 0%,
      color-mix(in srgb, var(--color-accent) 20%, white) 100%
    );
  }

  /* ─── Name ─────────────────��───────────── */
  .name {
    font-family: 'Fraunces', Georgia, serif;
    font-size: clamp(2.25rem, 5vw, 3.25rem);
    font-weight: 300;
    line-height: 1;
    letter-spacing: -0.025em;
    color: var(--color-text-primary);
    margin: 0 0 0.875rem;
  }

  /* ─── Description ──────────────────────── */
  .description {
    font-size: 0.9375rem;
    line-height: 1.65;
    color: var(--color-text-secondary);
    margin: 0 0 1rem;
    max-width: 52ch;
  }

  /* ─── Meta ────────────────────��────────── */
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
</style>
