<script lang="ts">
  import FullPageScroll from "$lib/components/layout/FullPageScroll.svelte";
  import Section from "$lib/components/layout/Section.svelte";
  import Bento from "$lib/components/ui/Bento.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
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

  <!-- 1 · Featured Writing ───────────────────────────── -->
  <Section index={1}>
    <div class="page-wrap">
      <Bento as="article">
        <svelte:fragment slot="top">
          <div class="section-header">
            <h2 class="section-heading">Featured Writing</h2>
            <a href="/content" class="see-all">See all →</a>
          </div>
        </svelte:fragment>

        <svelte:fragment slot="bottom">
          <div class="featured-grid">
            {#each data.featured as post (post.slug)}
              <a href="/content/{post.slug}" class="featured-card">
                <div class="featured-card-top">
                  <div class="featured-tags">
                    {#each post.tags as tag}
                      <span class="feat-tag">{tag}</span>
                    {/each}
                  </div>
                  <span class="feat-time">{post.readingTime} min</span>
                </div>
                <h3 class="featured-title">{post.title}</h3>
                <p class="featured-summary">{post.summary}</p>
              </a>
            {/each}
          </div>
        </svelte:fragment>
      </Bento>
    </div>
  </Section>

  <!-- 2 · Featured Work ──────────────────────────────── -->
  <Section index={2}>
    <div class="page-wrap">
      <Bento as="article">
        <svelte:fragment slot="top">
          <div class="section-header">
            <h2 class="section-heading">Featured Work</h2>
            <a href="/work" class="see-all">See all →</a>
          </div>
        </svelte:fragment>

        <svelte:fragment slot="bottom">
          <div class="featured-grid">
            {#each data.projects as project (project.slug)}
              <a href="/work/{project.slug}" class="featured-card">
                <div class="featured-card-top">
                  <div class="featured-tags">
                    {#each project.tech.slice(0, 2) as t}
                      <span class="feat-tag">{t}</span>
                    {/each}
                  </div>
                  <span class="feat-status" class:active={project.status === 'active'}>{project.status}</span>
                </div>
                <h3 class="featured-title">{project.title}</h3>
                <p class="featured-summary">{project.summary}</p>
              </a>
            {/each}
          </div>
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

  .section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
  }

  .section-heading {
    font-family: "Manrope", sans-serif;
    font-size: clamp(2.75rem, 7vw, 4.5rem);
    font-weight: 800;
    line-height: 1.3;
    letter-spacing: -0.03em;
    color: var(--color-text-primary);
    margin: 0;
  }

  .see-all {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-accent);
    text-decoration: none;
    white-space: nowrap;
    transition: opacity 0.15s ease;
  }

  .see-all:hover {
    opacity: 0.75;
  }

  /* Featured grid */
  .featured-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    width: 100%;
  }

  .featured-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.25rem;
    border-radius: 12px;
    border: 1px solid var(--color-border);
    background: color-mix(in srgb, var(--color-bg) 50%, transparent);
    text-decoration: none;
    color: inherit;
    transition: border-color 0.15s ease;
  }

  .featured-card:hover {
    border-color: var(--color-accent);
  }

  .featured-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .featured-tags {
    display: flex;
    gap: 0.375rem;
    flex-wrap: wrap;
  }

  .feat-tag {
    font-size: 0.6875rem;
    font-weight: 600;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-accent) 12%, transparent);
    color: var(--color-accent);
  }

  .feat-time {
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    white-space: nowrap;
  }

  .featured-title {
    font-family: "Manrope", sans-serif;
    font-size: 0.9375rem;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: var(--color-text-primary);
    margin: 0;
  }

  .featured-summary {
    font-size: 0.8125rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .feat-status {
    font-size: 0.6875rem;
    font-weight: 600;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-text-secondary) 12%, transparent);
    color: var(--color-text-secondary);
    white-space: nowrap;
    text-transform: capitalize;
  }

  .feat-status.active {
    background: color-mix(in srgb, #22c55e 15%, transparent);
    color: #16a34a;
  }
</style>
