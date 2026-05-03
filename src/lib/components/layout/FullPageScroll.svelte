<script lang="ts">
  import { setContext, onMount, onDestroy } from "svelte";
  import { writable, get } from "svelte/store";

  export let sectionCount: number;

  const current = writable(0);

  let locked = false;
  const LOCK_MS = 750;

  function goTo(index: number) {
    if (locked || index < 0 || index >= sectionCount) return;
    locked = true;
    current.set(index);
    setTimeout(() => (locked = false), LOCK_MS);
  }

  setContext("scroll", { current, goTo });

  let touchStartY = 0;

  function onWheel(e: WheelEvent) {
    e.preventDefault();
    if (Math.abs(e.deltaY) < 20) return;
    goTo(get(current) + (e.deltaY > 0 ? 1 : -1));
  }

  function onTouchStart(e: TouchEvent) {
    touchStartY = e.touches[0].clientY;
  }

  function onTouchEnd(e: TouchEvent) {
    const diff = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) goTo(get(current) + (diff > 0 ? 1 : -1));
  }

  function onKeyDown(e: KeyboardEvent) {
    const tag = (e.target as HTMLElement).tagName;
    if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
    if (["ArrowDown", "PageDown"].includes(e.key)) {
      e.preventDefault();
      goTo(get(current) + 1);
    }
    if (["ArrowUp", "PageUp"].includes(e.key)) {
      e.preventDefault();
      goTo(get(current) - 1);
    }
  }

  onMount(() => {
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
  });

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    }
  });
</script>

<div class="scroll-root">
  <slot />

  <nav class="section-dots" aria-label="Section navigation">
    {#each Array(sectionCount) as _, i}
      <button
        class="dot"
        class:active={i === $current}
        on:click={() => goTo(i)}
        aria-label="Go to section {i + 1}"
      ></button>
    {/each}
  </nav>
</div>

<style>
  .scroll-root {
    position: relative;
    width: 100%;
    height: 100dvh;
    overflow: hidden;
  }

  .section-dots {
    position: fixed;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 40;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }

  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    border: none;
    background: var(--color-text-secondary);
    opacity: 0.25;
    cursor: pointer;
    padding: 0;
    transition:
      opacity 0.25s ease,
      transform 0.25s ease,
      background 0.25s ease;
  }

  .dot.active {
    background: var(--color-accent);
    opacity: 1;
    transform: scale(1.6);
  }

  .dot:hover:not(.active) {
    opacity: 0.55;
    transform: scale(1.3);
  }
</style>
