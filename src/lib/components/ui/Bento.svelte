<script lang="ts">
  // Optional: pass `as` to change the root element for semantics
  export let as: string = 'div'
</script>

<svelte:element this={as} class="bento card">
  {#if $$slots.top}
    <div class="bento-top">
      <slot name="top" />
    </div>
  {/if}
  {#if $$slots.bottom}
    <div class="bento-bottom" class:divided={$$slots.top}>
      <slot name="bottom" />
    </div>
  {/if}
  <!-- Simple usage: no named slots -->
  {#if !$$slots.top && !$$slots.bottom}
    <div class="bento-body">
      <slot />
    </div>
  {/if}
</svelte:element>

<style>
  .bento {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
  }

  .bento-top {
    padding: 2rem 2.25rem 1.75rem;
  }

  .bento-bottom {
    padding: 2rem 2.25rem;
  }

  .bento-bottom.divided {
    padding-top: 1.75rem;
    border-top: 1px solid var(--color-border);
  }

  .bento-body {
    padding: 2rem 2.25rem;
  }
</style>
