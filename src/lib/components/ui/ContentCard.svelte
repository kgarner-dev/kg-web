<script lang="ts">
  import type { ContentItem } from "$lib/types";

  interface Props {
    item: ContentItem;
  }

  let { item }: Props = $props();
</script>

<a href="/content/{item.slug}" class="card content-card">
  <div class="image-wrap">
    {#if item.preview_image}
      <img src={item.preview_image} alt={item.title} class="image" loading="lazy" />
    {:else}
      <div class="image-placeholder"></div>
    {/if}
  </div>

  <div class="body">
    <div class="top">
      <h2 class="title">{item.title}</h2>
      {#if item.tags.length > 0}
        <div class="tags">
          {#each item.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      {/if}
    </div>

    <p class="description">{item.summary}</p>
  </div>
</a>

<style>
  .content-card {
    display: flex;
    align-items: stretch;
    background: var(--color-bg);
    border-color: var(--color-border);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition:
      box-shadow 0.2s ease,
      border-color 0.2s ease;
  }

  .content-card:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
    border-color: color-mix(
      in srgb,
      var(--color-accent) 30%,
      var(--color-border)
    );
  }

  .image-wrap {
    width: 0;
    aspect-ratio: 1;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: calc(var(--radius-card) - 1px) 0 0
      calc(var(--radius-card) - 1px);

    @media screen and (min-width: 768px) {
      width: 20%;
    }
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .image-placeholder {
    width: 100%;
    height: 100%;
    background: color-mix(
      in srgb,
      var(--color-text-secondary) 8%,
      var(--color-bg)
    );
  }

  .body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    gap: 0.625rem;
  }

  .top {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .title {
    font-family: "Manrope", sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: -0.015em;
    line-height: 1.3;
    color: var(--color-text-primary);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  .description {
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
