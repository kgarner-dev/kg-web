<script lang="ts">
  import Bento from "$lib/components/ui/Bento.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const hasToc = $derived(data.item.toc.length > 2);
  const linkEntries = $derived(Object.entries(data.item.links ?? {}));

  const PLATFORMS: Record<string, { label: string; icon: string }> = {
    youtube: { label: "YouTube", icon: "ph-youtube-logo" },
    podcast: { label: "Podcast", icon: "ph-microphone-stage" },
    github: { label: "GitHub", icon: "ph-github-logo" },
    linkedin: { label: "LinkedIn", icon: "ph-linkedin-logo" },
    twitter: { label: "Twitter", icon: "ph-x-logo" },
    x: { label: "X", icon: "ph-x-logo" },
    instagram: { label: "Instagram", icon: "ph-instagram-logo" },
    devto: { label: "Dev.to", icon: "ph-dev-to-logo" },
    twitch: { label: "Twitch", icon: "ph-twitch-logo" },
    medium: { label: "Medium", icon: "ph-medium-logo" },
    spotify: { label: "Spotify", icon: "ph-spotify-logo" },
    website: { label: "Website", icon: "ph-globe" },
    live: { label: "Live", icon: "ph-arrow-square-out" },
    slides: { label: "Slides", icon: "ph-presentation" },
    article: { label: "Article", icon: "ph-newspaper" },
  };

  function platform(key: string) {
    return PLATFORMS[key.toLowerCase()] ?? { label: key, icon: "ph-link" };
  }

  function youtubeId(url: string): string | null {
    const m = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/,
    );
    return m?.[1] ?? null;
  }

  const embedId = $derived(
    data.item.links?.youtube ? youtubeId(data.item.links.youtube) : null,
  );

  const contentLabel = $derived(embedId ? "Transcript" : "Article");

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
</script>

<svelte:head>
  <title>Kaleb Garner | {data.item.title}</title>
  <meta name="description" content={data.item.summary} />
  {#if data.item.preview_image}
    <meta property="og:image" content={data.item.preview_image} />
  {/if}
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
              {#each data.item.toc as entry}
                <li class:indent={entry.level === 3}>
                  <a href="#{entry.id}" class="toc-link">{entry.text}</a>
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
            <a href="/content" class="back">← All content</a>
            <div class="post-meta">
              <time>{formatDate(data.item.date)}</time>
              {#if data.item.readingTime > 0}
                <span class="dot">·</span>
                <span>{data.item.readingTime} min read</span>
              {/if}
            </div>
          </div>
        </svelte:fragment>
        <svelte:fragment slot="bottom">
          {#if data.item.preview_image}
            <img src={data.item.preview_image} alt="" class="preview-image" />
          {/if}
          <h1 class="post-title">{data.item.title}</h1>
          <p class="post-summary">{data.item.summary}</p>
          <div class="post-footer">
            <div class="post-tags">
              {#each data.item.tags as tag}
                <a href="/content?tag={encodeURIComponent(tag)}" class="tag"
                  >{tag}</a
                >
              {/each}
            </div>
            {#if linkEntries.length > 0}
              <div class="post-links">
                {#each linkEntries as [key, url]}
                  {@const p = platform(key)}
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="link-btn"
                    aria-label={p.label}
                  >
                    <i class="ph-bold {p.icon}"></i>
                    {p.label}
                  </a>
                {/each}
              </div>
            {/if}
          </div>
        </svelte:fragment>
      </Bento>

      {#if embedId}
        <Bento>
          <svelte:fragment slot="top">
            <span class="eyebrow">Video</span>
          </svelte:fragment>
          <svelte:fragment slot="bottom">
            <div class="embed-wrap">
              <iframe
                src="https://www.youtube.com/embed/{embedId}"
                title={data.item.title}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </svelte:fragment>
        </Bento>
      {/if}

      <Bento as="article">
        <svelte:fragment slot="top">
          <span class="eyebrow">{contentLabel}</span>
        </svelte:fragment>
        <svelte:fragment slot="bottom">
          <div class="prose">{@html data.item.html}</div>
        </svelte:fragment>
      </Bento>
    </div>
  </div>
</div>

<style>
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
    top: calc(var(--header-h, 64px) + 1rem);
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

  .toc-list li.indent {
    padding-left: 0.875rem;
  }

  .toc-link {
    font-size: 0.8rem;
    line-height: 1.4;
    color: var(--color-text-secondary);
    text-decoration: none;
    display: block;
    padding: 0.2rem 0;
    transition: color 0.15s ease;
  }

  .toc-link:hover {
    color: var(--color-accent);
  }

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

  .back:hover {
    color: var(--color-accent);
  }

  .post-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--color-text-secondary);
  }

  .dot {
    opacity: 0.4;
  }

  .post-title {
    font-family: "Manrope", sans-serif;
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

  .preview-image {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 1.25rem;
    border: 1px solid var(--color-border);
  }

  .post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.875rem;
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  .post-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .link-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.875rem;
    border-radius: 999px;
    border: 1px solid var(--color-border);
    background: var(--color-bg);
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    text-decoration: none;
    white-space: nowrap;
    transition:
      border-color 0.15s ease,
      color 0.15s ease,
      background 0.15s ease;
  }

  .link-btn i {
    font-size: 1rem;
  }

  .link-btn:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
    background: color-mix(in srgb, var(--color-accent) 8%, var(--color-bg));
  }

  /* Video embed */
  .embed-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: calc(var(--radius-card) - 4px);
    overflow: hidden;
    background: #000;
  }

  .embed-wrap iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  /* Prose */
  .prose :global(h2) {
    font-family: "Manrope", sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: var(--color-text-primary);
    margin: 2.5rem 0 1rem;
  }

  .prose :global(h3) {
    font-family: "Manrope", sans-serif;
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

  .prose :global(ul),
  .prose :global(ol) {
    padding-left: 1.5rem;
    margin: 0 0 1.25rem;
  }

  .prose :global(li) {
    font-size: 1rem;
    line-height: 1.8;
    color: var(--color-text-primary);
    margin-bottom: 0.375rem;
  }

  .prose :global(strong) {
    font-weight: 700;
    color: var(--color-text-primary);
  }
  .prose :global(em) {
    font-style: italic;
  }

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
    font-family: "JetBrains Mono", monospace;
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

  .prose :global(th),
  .prose :global(td) {
    padding: 0.625rem 0.875rem;
    border: 1px solid var(--color-border);
    text-align: left;
  }

  .prose :global(th) {
    background: var(--color-card);
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .prose :global(td) {
    color: var(--color-text-secondary);
  }

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
