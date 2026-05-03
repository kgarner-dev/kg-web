<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  export let index: number;

  const { current } = getContext<{
    current: Writable<number>;
    goTo: (i: number) => void;
  }>("scroll");

  $: state =
    $current === index ? "active" : $current > index ? "above" : "below";
</script>

<div class="section {state}" aria-hidden={$current !== index}>
  <slot />
</div>

<style>
  .section {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5.5rem 2rem 2rem;
    transition:
      opacity 0.55s ease,
      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
  }

  .section.active {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  /* section we already passed — exits upward */
  .section.above {
    opacity: 0;
    transform: translateY(-28px) scale(0.97);
    pointer-events: none;
  }

  /* section below — waiting to enter from below */
  .section.below {
    opacity: 0;
    transform: translateY(28px) scale(0.97);
    pointer-events: none;
  }
</style>
