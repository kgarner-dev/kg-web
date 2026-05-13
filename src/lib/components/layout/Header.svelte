<script lang="ts">
  import { page } from '$app/stores'
  import ProfilePanel from '$lib/components/ui/ProfilePanel.svelte'

  interface Tag {
    name: string
    count: number
  }

  interface Props {
    tags?: Tag[]
  }

  let { tags = [] }: Props = $props()

  let menuOpen = $state(false)

  let activeTag = $derived($page.url.searchParams.get('tag')?.toLowerCase() ?? null)

  function closeMenu() {
    menuOpen = false
  }
</script>

<header class="header">
  <div class="header-inner">
    <a href="/" class="wordmark">Kaleb Garner</a>

    <div class="header-right">
      <button
        class="menu-btn"
        onclick={() => (menuOpen = true)}
        aria-label="Open navigation"
        aria-expanded={menuOpen}
      >
        <i class="ph-bold ph-list"></i>
      </button>
      <ProfilePanel />
    </div>
  </div>
</header>

{#if menuOpen}
  <div class="modal-backdrop" role="presentation" onclick={closeMenu}></div>

  <div class="modal-panel card" role="dialog" aria-modal="true" aria-label="Navigation">
    <div class="modal-header">
      <span class="modal-title">Topics</span>
      <button class="modal-close" onclick={closeMenu} aria-label="Close">
        <i class="ph-bold ph-x"></i>
      </button>
    </div>

    {#if tags.length > 0}
      <div class="modal-tags">
        {#each tags as tag}
          <a
            href="/content?tag={encodeURIComponent(tag.name)}"
            class="tag-chip"
            class:active={activeTag === tag.name}
            onclick={closeMenu}
          >
            {tag.name}
            <span class="tag-count">{tag.count}</span>
          </a>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 50;
    height: var(--header-h, 64px);
    display: flex;
    align-items: center;
    background: color-mix(in srgb, var(--color-bg) 80%, transparent);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--color-border);
  }

  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    padding: 0 1.5rem;
  }

  .wordmark {
    font-family: 'Manrope', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-text-primary);
    text-decoration: none;
    letter-spacing: -0.02em;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .menu-btn {
    display: none;
    width: 2.125rem;
    height: 2.125rem;
    border-radius: 8px;
    border: 1px solid var(--color-border);
    background: var(--color-card);
    cursor: pointer;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    color: var(--color-text-primary);
    transition: background 0.15s ease;
  }

  .menu-btn:hover {
    background: color-mix(in srgb, var(--color-border) 60%, transparent);
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 60;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  .modal-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 70;
    width: min(480px, calc(100vw - 2rem));
    max-height: calc(100dvh - 4rem);
    overflow-y: auto;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .modal-title {
    font-family: 'Manrope', sans-serif;
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--color-text-primary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .modal-close {
    width: 2rem;
    height: 2rem;
    border-radius: 8px;
    border: 1px solid var(--color-border);
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: var(--color-text-secondary);
    transition: all 0.15s ease;
  }

  .modal-close:hover {
    background: var(--color-border);
    color: var(--color-text-primary);
  }

  .modal-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  @media (max-width: 768px) {
    .menu-btn {
      display: flex;
    }
  }
</style>
