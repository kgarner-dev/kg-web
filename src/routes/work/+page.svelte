<script lang="ts">
  import Bento from "$lib/components/ui/Bento.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Work — Kaleb Garner</title>
</svelte:head>

<div class="page">
  <Bento as="header">
    <svelte:fragment slot="top">
      <span class="eyebrow">Work</span>
    </svelte:fragment>
    <svelte:fragment slot="bottom">
      <h1 class="heading">Things I've built.</h1>
      <p class="sub">Projects, systems, and shipped products.</p>
    </svelte:fragment>
  </Bento>

  <ul class="grid">
    {#each data.projects as project (project.slug)}
      <li>
        <a href="/work/{project.slug}" class="card-link">
          <Bento as="article">
            <svelte:fragment slot="top">
              <div class="card-meta">
                <div class="tech-tags">
                  {#each project.tech.slice(0, 3) as t}
                    <span class="tech">{t}</span>
                  {/each}
                </div>
                <span
                  class="status"
                  class:active={project.status === "active"}
                  class:shipped={project.status === "shipped"}
                >
                  {project.status}
                </span>
              </div>
            </svelte:fragment>
            <svelte:fragment slot="bottom">
              <h2 class="card-title">{project.title}</h2>
              <p class="card-summary">{project.summary}</p>
              <div class="card-footer">
                <div class="card-tags">
                  {#each project.tags as tag}
                    <span class="tag">{tag}</span>
                  {/each}
                </div>
                {#if project.live_url}
                  <span class="live-link">Visit →</span>
                {/if}
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
    height: 100%;
  }

  .card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 0.75rem;
  }

  .tech-tags {
    display: flex;
    gap: 0.375rem;
    flex-wrap: wrap;
  }

  .tech {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-accent) 10%, transparent);
    color: var(--color-accent);
  }

  .status {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--color-text-secondary) 10%,
      transparent
    );
    color: var(--color-text-secondary);
    text-transform: capitalize;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .status.active {
    background: color-mix(in srgb, #22c55e 15%, transparent);
    color: #16a34a;
  }

  .status.shipped {
    background: color-mix(in srgb, var(--color-accent) 15%, transparent);
    color: var(--color-accent);
  }

  .card-title {
    font-family: "Manrope", sans-serif;
    font-size: 1.25rem;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
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

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  .tag {
    font-size: 0.7rem;
    font-weight: 500;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    border: 1px solid var(--color-border);
    color: var(--color-text-secondary);
  }

  .live-link {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-accent);
    white-space: nowrap;
  }
</style>
