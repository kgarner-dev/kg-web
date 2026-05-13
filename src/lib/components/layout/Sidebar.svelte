<script lang="ts">
  import { page } from "$app/stores";
  import ProfilePanel from "$lib/components/ui/ProfilePanel.svelte";

  interface Tag {
    name: string;
    count: number;
  }

  interface Props {
    tags: Tag[];
  }

  let { tags }: Props = $props();

  let activeTag = $derived(
    $page.url.searchParams.get("tag")?.toLowerCase() ?? null,
  );
</script>

{#if tags.length > 0}
  <aside class="sidebar-wrap" aria-label="Browse by topic">
    <div class="sidebar-card card">
      <div class="sidebar-section">
        <p class="section-label">Topics</p>
        <div class="tag-list">
          {#each tags as tag}
            <a
              href="/content?tag={encodeURIComponent(tag.name)}"
              class="tag-chip"
              class:active={activeTag === tag.name}
            >
              {tag.name}
              <span class="tag-count">{tag.count}</span>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </aside>
{/if}

<style>
  .sidebar-wrap {
    position: sticky;
    top: calc(var(--header-h, 64px) + 2rem);
    align-self: start;
    max-height: 50vh;
    overflow-y: auto;
    border-radius: var(--radius-card);
  }

  .sidebar-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .sidebar-section {
    padding: 1rem 0.875rem 1.125rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .section-label {
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-text-secondary);
    margin: 0;
    opacity: 0.7;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  @media (max-width: 768px) {
    .sidebar-wrap {
      display: none;
    }
  }
</style>
