<script lang="ts">
  import Bento from "$lib/components/ui/Bento.svelte";
  import ContentCard from "$lib/components/ui/ContentCard.svelte";
  import type { PageData } from "./$types";
  import { page } from "$app/stores";

  let { data }: { data: PageData } = $props();

  let activeTag = $derived(
    $page.url.searchParams.get("tag")?.toLowerCase() ?? null,
  );

  const items = $derived(
    activeTag
      ? data.items.filter((item) => item.tags.includes(activeTag!))
      : data.items,
  );
</script>

<svelte:head>
  <title>Kaleb Garner | {activeTag ? `#${activeTag}` : 'Content'}</title>
  <meta name="description" content="Articles, conference talks, podcasts, and transcripts from Kaleb Garner — product architect and technical lead in healthtech." />
</svelte:head>

<div class="layout">
  <Bento>
    <svelte:fragment slot="top">
      <span class="count"
        >{items.length} item{items.length === 1 ? "" : "s"}</span
      >

      <h1 class="heading">
        {#if activeTag}
          <span class="tag-prefix">#</span>{activeTag}
        {:else}
          All Content
        {/if}
      </h1>
    </svelte:fragment>
    <svelte:fragment slot="bottom">
      {#if items.length === 0}
        <p class="empty">Nothing here yet.</p>
      {:else}
        <ul class="item-list">
          {#each items as item (item.slug)}
            <li>
              <ContentCard {item} />
            </li>
          {/each}
        </ul>
      {/if}
    </svelte:fragment>
  </Bento>
</div>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .count {
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    flex-shrink: 0;
  }

  .heading {
    font-family: "Manrope", sans-serif;
    font-size: clamp(1.5rem, 3.5vw, 2.25rem);
    font-weight: 800;
    letter-spacing: -0.025em;
    color: var(--color-text-primary);
    margin: 0;
  }

  .tag-prefix {
    color: var(--color-accent);
  }

  .empty {
    color: var(--color-text-secondary);
    font-size: 0.9375rem;
    margin: 0;
  }

  .item-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }
</style>
