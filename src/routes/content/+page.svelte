<script lang="ts">
  import Bento from "$lib/components/ui/Bento.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let activeTag = $state<string | null>(null);
  let filterOpen = $state(false);

  const filtered = $derived(
    activeTag
      ? data.posts.filter((p) => p.tags.includes(activeTag!))
      : data.posts,
  );

  function selectTag(tag: string | null) {
    activeTag = tag;
    filterOpen = false;
  }
</script>

<svelte:head>
  <title>Writing — Kaleb Garner</title>
</svelte:head>

<svelte:window
  onclick={(e) => {
    if (!(e.target as Element).closest(".filter-wrap")) filterOpen = false;
  }}
/>

<div class="page">
  <Bento as="header">
    <svelte:fragment slot="top">
      <span class="eyebrow">Writing</span>
    </svelte:fragment>
    <svelte:fragment slot="bottom">
      <div class="hero-body">
        <div class="hero-text">
          <h1 class="heading">Ideas in progress.</h1>
          <p class="sub">Essays on systems, product, and building in public.</p>
        </div>
        <div class="filter-wrap">
          <button
            class="filter-btn"
            class:active={activeTag !== null}
            onclick={() => (filterOpen = !filterOpen)}
            aria-expanded={filterOpen}
          >
            {activeTag ?? "Filter"}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 4l4 4 4-4"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          {#if filterOpen}
            <div class="filter-dropdown">
              <button
                class="filter-option"
                class:selected={activeTag === null}
                onclick={() => selectTag(null)}
              >
                All
              </button>
              {#each data.tags as tag}
                <button
                  class="filter-option"
                  class:selected={activeTag === tag}
                  onclick={() => selectTag(tag)}
                >
                  {tag}
                </button>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </svelte:fragment>
  </Bento>

  <ul class="grid">
    {#each filtered as post (post.slug)}
      <li>
        <a href="/content/{post.slug}" class="card-link">
          <Bento as="article">
            <svelte:fragment slot="top">
              <div class="card-meta">
                <time class="date"
                  >{new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}</time
                >
                <span class="reading-time">{post.readingTime} min read</span>
              </div>
            </svelte:fragment>
            <svelte:fragment slot="bottom">
              <h2 class="card-title">{post.title}</h2>
              <p class="card-summary">{post.summary}</p>
              <div class="card-tags">
                {#each post.tags as tag}
                  <span class="tag">{tag}</span>
                {/each}
              </div>
            </svelte:fragment>
          </Bento>
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .page {
    min-height: 100dvh;
    padding: 6rem 2rem 4rem;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .eyebrow {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-accent);
  }

  .hero-body {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .hero-text {
    flex: 1;
    min-width: 0;
  }

  .heading {
    font-family: "Manrope", sans-serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.025em;
    color: var(--color-text-primary);
    margin: 0 0 0.625rem;
  }

  .sub {
    font-size: 0.9375rem;
    line-height: 1.65;
    color: var(--color-text-secondary);
    margin: 0;
    max-width: 40ch;
  }

  /* Filter */
  .filter-wrap {
    position: relative;
    flex-shrink: 0;
  }

  .filter-btn {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-family: "Manrope", sans-serif;
    font-size: 0.8125rem;
    font-weight: 600;
    padding: 0.5rem 0.875rem;
    border-radius: 999px;
    border: 1px solid var(--color-border);
    background: transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all 0.15s ease;
    white-space: nowrap;
  }

  .filter-btn:hover,
  .filter-btn.active {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  .filter-dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    min-width: 140px;
    background: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    box-shadow: var(--shadow-card);
    padding: 0.375rem;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .filter-option {
    font-family: "Manrope", sans-serif;
    font-size: 0.8125rem;
    font-weight: 500;
    text-align: left;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all 0.1s ease;
  }

  .filter-option:hover {
    background: color-mix(in srgb, var(--color-accent) 10%, transparent);
    color: var(--color-accent);
  }

  .filter-option.selected {
    background: color-mix(in srgb, var(--color-accent) 15%, transparent);
    color: var(--color-accent);
    font-weight: 600;
  }

  /* Grid */
  .grid {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.25rem;
  }

  .card-link {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .date {
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    font-weight: 500;
  }

  .reading-time {
    font-size: 0.75rem;
    color: var(--color-accent);
    font-weight: 600;
  }

  .card-title {
    font-family: "Manrope", sans-serif;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.015em;
    color: var(--color-text-primary);
    margin: 0 0 0.5rem;
  }

  .card-summary {
    font-size: 0.875rem;
    line-height: 1.65;
    color: var(--color-text-secondary);
    margin: 0 0 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  .tag {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-accent) 10%, transparent);
    color: var(--color-accent);
  }
</style>
