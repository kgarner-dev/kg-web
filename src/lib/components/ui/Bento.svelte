<script lang="ts">
  export let as: string = "div";
  export let variant: "glass" | "accent" = "glass";
</script>

<svelte:element
  this={as}
  class="bento card"
  class:card--accent={variant === "accent"}
>
  {#if $$slots.top}
    <div class="bento-top">
      <slot name="top" />
    </div>
  {/if}
  {#if $$slots.bottom}
    <div class="bento-bottom">
      <slot name="bottom" />
    </div>
  {/if}

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
    padding: 1.75rem;
    gap: 1.25rem;
  }
</style>
