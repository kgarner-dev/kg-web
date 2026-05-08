<script lang="ts">
  import Bento from '$lib/components/ui/Bento.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  const hasToc = $derived(data.project.toc.length > 2)

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
</script>

<svelte:head>
  <title>{data.project.title} — Kaleb Garner</title>
  <meta name="description" content={data.project.summary} />
</svelte:head>

<div class="outer">
  <div class="layout" class:has-toc={hasToc}>
    {#if hasToc}
      <aside class="toc-sidebar">
        <Bento>
          <svelte:fragment slot="top">
            <span class="eyebrow">On this page</span>
          </svelte:fragment>
          <svelte:fragment slot="bottom">
            <ul class="toc-list">
              {#each data.project.toc as item}
                <li class:indent={item.level === 3}>
                  <a href="#{item.id}" class="toc-link">{item.text}</a>
                </li>
              {/each}
            </ul>
          </svelte:fragment>
        </Bento>
      </aside>
    {/if}

    <div class="main">
      <Bento as="header">
        <svelte:fragment slot="top">
          <div class="row">
            <a href="/work" class="back">← Work</a>
            <span class="status" class:active={data.project.status === 'active'} class:shipped={data.project.status === 'shipped'}>
              {data.project.status}
            </span>
          </div>
        </svelte:fragment>
        <svelte:fragment slot="bottom">
          <h1 class="project-title">{data.project.title}</h1>
          <p class="project-summary">{data.project.summary}</p>
          <div class="project-meta">
            <div class="tech-tags">
              {#each data.project.tech as t}
                <span class="tech">{t}</span>
              {/each}
            </div>
            <div class="project-links">
              {#if data.project.live_url}
                <a href={data.project.live_url} target="_blank" rel="noopener noreferrer" class="proj-link">Live site →</a>
              {/if}
              {#if data.project.repo_url}
                <a href={data.project.repo_url} target="_blank" rel="noopener noreferrer" class="proj-link">Repo →</a>
              {/if}
            </div>
          </div>
        </svelte:fragment>
      </Bento>

      <Bento as="section">
        <svelte:fragment slot="top">
          <span class="eyebrow">Overview</span>
        </svelte:fragment>
        <svelte:fragment slot="bottom">
          <div class="prose">{@html data.project.html}</div>
        </svelte:fragment>
      </Bento>

      {#if data.project.posts.length > 0}
        <Bento as="section">
          <svelte:fragment slot="top">
            <div class="writing-header">
              <span class="eyebrow">Writing</span>
              <a href="/content" class="see-all">See all →</a>
            </div>
          </svelte:fragment>
          <svelte:fragment slot="bottom">
            <div class="writing-grid">
              {#each data.project.posts as post}
                <a href="/content/{post.slug}" class="writing-card">
                  <div class="writing-card-top">
                    <div class="writing-tags">
                      {#each post.tags as tag}
                        <span class="writing-tag">{tag}</span>
                      {/each}
                    </div>
                    <span class="writing-time">{post.readingTime} min</span>
                  </div>
                  <h3 class="writing-title">{post.title}</h3>
                  <p class="writing-summary">{post.summary}</p>
                  {#if post.linkedin_url}
                    <span class="writing-li">LinkedIn →</span>
                  {/if}
                </a>
              {/each}
            </div>
          </svelte:fragment>
        </Bento>
      {/if}
    </div>
  </div>
</div>

<style>
  .outer {
    padding: 6rem 2rem 6rem;
    max-width: 1000px;
    margin: 0 auto;
  }

  .layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
    align-items: start;
  }

  .layout.has-toc {
    grid-template-columns: 1fr;
  }

  @media (min-width: 1024px) {
    .layout.has-toc {
      grid-template-columns: 220px 1fr;
    }
  }

  .toc-sidebar {
    position: sticky;
    top: 6rem;
  }

  .main {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    min-width: 0;
  }

  .eyebrow {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-text-secondary);
  }

  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .toc-list li.indent { padding-left: 0.875rem; }

  .toc-link {
    font-size: 0.8rem;
    line-height: 1.4;
    color: var(--color-text-secondary);
    text-decoration: none;
    display: block;
    padding: 0.2rem 0;
    transition: color 0.15s ease;
  }

  .toc-link:hover { color: var(--color-accent); }

  /* Header card */
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .back {
    font-size: 0.8rem;
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .back:hover { color: var(--color-accent); }

  .status {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-text-secondary) 10%, transparent);
    color: var(--color-text-secondary);
    text-transform: capitalize;
  }

  .status.active {
    background: color-mix(in srgb, #22c55e 15%, transparent);
    color: #16a34a;
  }

  .status.shipped {
    background: color-mix(in srgb, var(--color-accent) 15%, transparent);
    color: var(--color-accent);
  }

  .project-title {
    font-family: 'Manrope', sans-serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.025em;
    color: var(--color-text-primary);
    margin: 0 0 0.75rem;
  }

  .project-summary {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--color-text-secondary);
    margin: 0 0 1.5rem;
  }

  .project-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .tech-tags { display: flex; flex-wrap: wrap; gap: 0.375rem; }

  .tech {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-accent) 10%, transparent);
    color: var(--color-accent);
  }

  .project-links { display: flex; gap: 1rem; }

  .proj-link {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-accent);
    text-decoration: none;
    transition: opacity 0.15s ease;
  }

  .proj-link:hover { opacity: 0.75; }

  /* Writing section */
  .writing-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .see-all {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-accent);
    text-decoration: none;
    transition: opacity 0.15s ease;
  }

  .see-all:hover { opacity: 0.75; }

  .writing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
    width: 100%;
  }

  .writing-card {
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

  .writing-card:hover { border-color: var(--color-accent); }

  .writing-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .writing-tags { display: flex; gap: 0.375rem; flex-wrap: wrap; }

  .writing-tag {
    font-size: 0.6875rem;
    font-weight: 600;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-accent) 12%, transparent);
    color: var(--color-accent);
  }

  .writing-time {
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    white-space: nowrap;
  }

  .writing-title {
    font-family: 'Manrope', sans-serif;
    font-size: 0.9375rem;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: var(--color-text-primary);
    margin: 0;
  }

  .writing-summary {
    font-size: 0.8125rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }

  .writing-li {
    font-size: 0.75rem;
    font-weight: 600;
    color: #0a66c2;
    margin-top: auto;
  }

  /* Prose */
  .prose :global(h2) {
    font-family: 'Manrope', sans-serif;
    font-size: 1.375rem;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: var(--color-text-primary);
    margin: 2rem 0 0.875rem;
  }

  .prose :global(h3) {
    font-family: 'Manrope', sans-serif;
    font-size: 1.0625rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--color-text-primary);
    margin: 1.75rem 0 0.75rem;
  }

  .prose :global(p) {
    font-size: 0.9375rem;
    line-height: 1.8;
    color: var(--color-text-primary);
    margin: 0 0 1rem;
  }

  .prose :global(ul), .prose :global(ol) {
    padding-left: 1.5rem;
    margin: 0 0 1rem;
  }

  .prose :global(li) {
    font-size: 0.9375rem;
    line-height: 1.8;
    color: var(--color-text-primary);
    margin-bottom: 0.25rem;
  }

  .prose :global(strong) { font-weight: 700; color: var(--color-text-primary); }

  .prose :global(code) {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85em;
    background: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 0.15em 0.4em;
  }

  .prose :global(pre) {
    background: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
    padding: 1.25rem 1.5rem;
    overflow-x: auto;
    margin: 0 0 1.25rem;
  }

  .prose :global(pre code) {
    background: none;
    border: none;
    padding: 0;
    font-size: 0.875rem;
    line-height: 1.7;
  }

  .prose :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 1.25rem;
    font-size: 0.875rem;
  }

  .prose :global(th), .prose :global(td) {
    padding: 0.625rem 0.875rem;
    border: 1px solid var(--color-border);
    text-align: left;
  }

  .prose :global(th) {
    background: var(--color-card);
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .prose :global(td) { color: var(--color-text-secondary); }
</style>
