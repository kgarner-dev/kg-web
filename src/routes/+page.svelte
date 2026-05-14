<script lang="ts">
  import Bento from "$lib/components/ui/Bento.svelte";
  import ContentCard from "$lib/components/ui/ContentCard.svelte";
  import ContactModal from "$lib/components/ui/ContactModal.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let contactOpen = $state(false);
</script>

<svelte:head>
  <title>Kaleb Garner | Product Architect & Technical Lead</title>
</svelte:head>

<div class="page">
  <!-- Hero -->
  <Bento as="section">
    <svelte:fragment slot="top">
      <div class="avatar" aria-label="Profile photo">
        <img src="/images/headshot.webp" alt="Headshot of Kaleb Garner" width="400" height="400" />
      </div>
    </svelte:fragment>
    <svelte:fragment slot="bottom">
      <p class="bio">
        Product architect, technical lead and content creator whose passion for
        turning real-world problems into platform-level solutions has shaped how
        engineering teams think, build, and operate. Convinced that the best
        engineering advice rarely starts with code.
      </p>
    </svelte:fragment>
  </Bento>

  <!-- Recent content -->
  <Bento as="section">
    <svelte:fragment slot="top">
      <div class="section-header">
        <h2 class="section-label">Recent</h2>
        <a href="/content" class="see-all">See all →</a>
      </div>
    </svelte:fragment>
    <svelte:fragment slot="bottom">
      <ul class="card-list">
        {#each data.recent as item (item.slug)}
          <li>
            <ContentCard {item} />
          </li>
        {/each}
      </ul>
    </svelte:fragment>
  </Bento>

  <!-- Connect -->
  <Bento as="section" variant="accent">
    <div class="connect-body">
      <div class="connect-text">
        <h2 class="connect-heading">Let's connect.</h2>
        <p class="connect-sub">
          Coffee chat, speaking opportunity, collaboration. Reach out and let's
          talk.
        </p>
      </div>
      <button class="connect-cta" onclick={() => (contactOpen = true)}
        >Get in touch</button
      >
    </div>
  </Bento>
</div>

<ContactModal bind:open={contactOpen} />

<style>
  .page {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .avatar {
    width: clamp(60px, 20vw, 200px);
    aspect-ratio: 1;
    border-radius: 14px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .bio {
    font-size: 1.125rem;
    line-height: 1.7;
    color: var(--color-text-secondary);
    margin: 0 0 1rem;
  }

  /* Recent */
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
  }

  .section-label {
    font-family: "Manrope", sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-accent);
    margin: 0;
  }

  .see-all {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.15s ease;
  }

  .see-all:hover {
    color: var(--color-accent);
  }

  .card-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  /* Connect */
  .connect-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    flex-wrap: wrap;
    padding: 0.5rem 0;
  }

  .connect-text {
    flex: 1;
    min-width: 0;
  }

  .connect-heading {
    font-family: "Manrope", sans-serif;
    font-size: clamp(1.5rem, 3.5vw, 2rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.025em;
    color: #fff;
    margin: 0 0 0.375rem;
  }

  .connect-sub {
    font-size: 0.9rem;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.75);
    margin: 0;
    max-width: 48ch;
  }

  .connect-cta {
    font-family: "Manrope", sans-serif;
    font-size: 0.875rem;
    font-weight: 700;
    padding: 0.625rem 1.5rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.35);
    white-space: nowrap;
    flex-shrink: 0;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .connect-cta:hover {
    background: rgba(255, 255, 255, 0.3);
  }
</style>
