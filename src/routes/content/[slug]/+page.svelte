<script lang="ts">
  import Bento from '$lib/components/ui/Bento.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  const hasToc = $derived(data.post.toc.length > 2)

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
</script>

<svelte:head>
  <title>{data.post.title} — Kaleb Garner</title>
  <meta name="description" content={data.post.summary} />
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
              {#each data.post.toc as item}
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
            <a href="/content" class="back">← Writing</a>
            <div class="post-meta">
              <time>{formatDate(data.post.date)}</time>
              <span class="dot">·</span>
              <span>{data.post.readingTime} min read</span>
            </div>
          </div>
        </svelte:fragment>
        <svelte:fragment slot="bottom">
          <h1 class="post-title">{data.post.title}</h1>
          <p class="post-summary">{data.post.summary}</p>
          <div class="post-footer">
            <div class="post-tags">
              {#each data.post.tags as tag}
                <a href="/content?tag={tag}" class="tag">{tag}</a>
              {/each}
            </div>
            {#if data.post.linkedin_url}
              <a href={data.post.linkedin_url} target="_blank" rel="noopener noreferrer" class="li-link">LinkedIn →</a>
            {/if}
          </div>
        </svelte:fragment>
      </Bento>

      <Bento as="article">
        <svelte:fragment slot="top">
          <span class="eyebrow">Article</span>
        </svelte:fragment>
        <svelte:fragment slot="bottom">
          <div class="prose">{@html data.post.html}</div>
        </svelte:fragment>
      </Bento>
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
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .back {
    font-size: 0.8rem;
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .back:hover { color: var(--color-accent); }

  .post-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--color-text-secondary);
  }

  .dot { opacity: 0.4; }

  .post-title {
    font-family: 'Manrope', sans-serif;
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.025em;
    color: var(--color-text-primary);
    margin: 0 0 0.75rem;
  }

  .post-summary {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--color-text-secondary);
    margin: 0 0 1.25rem;
  }

  .post-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .post-tags { display: flex; flex-wrap: wrap; gap: 0.375rem; }

  .tag {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-accent) 10%, transparent);
    color: var(--color-accent);
    text-decoration: none;
    transition: opacity 0.15s ease;
  }

  .tag:hover { opacity: 0.75; }

  .li-link {
    font-size: 0.75rem;
    font-weight: 600;
    color: #0a66c2;
    text-decoration: none;
    transition: opacity 0.15s ease;
    flex-shrink: 0;
  }

  .li-link:hover { opacity: 0.75; }

  /* Prose */
  .prose :global(h2) {
    font-family: 'Manrope', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: var(--color-text-primary);
    margin: 2.5rem 0 1rem;
  }

  .prose :global(h3) {
    font-family: 'Manrope', sans-serif;
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--color-text-primary);
    margin: 2rem 0 0.75rem;
  }

  .prose :global(p) {
    font-size: 1rem;
    line-height: 1.85;
    color: var(--color-text-primary);
    margin: 0 0 1.25rem;
  }

  .prose :global(ul), .prose :global(ol) {
    padding-left: 1.5rem;
    margin: 0 0 1.25rem;
  }

  .prose :global(li) {
    font-size: 1rem;
    line-height: 1.8;
    color: var(--color-text-primary);
    margin-bottom: 0.375rem;
  }

  .prose :global(strong) { font-weight: 700; color: var(--color-text-primary); }
  .prose :global(em) { font-style: italic; }

  .prose :global(a) {
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .prose :global(blockquote) {
    border-left: 3px solid var(--color-accent);
    padding-left: 1.25rem;
    margin: 1.5rem 0;
    color: var(--color-text-secondary);
    font-style: italic;
  }

  .prose :global(code) {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875em;
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
    margin: 0 0 1.5rem;
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
    margin: 0 0 1.5rem;
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

  .prose :global(img) {
    max-width: 100%;
    border-radius: var(--radius-card);
    margin: 1.5rem 0;
  }

  .prose :global(hr) {
    border: none;
    border-top: 1px solid var(--color-border);
    margin: 2.5rem 0;
  }
</style>
