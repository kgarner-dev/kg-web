<script lang="ts">
  import { Shader, Smoke } from "shaders/svelte";

  export let colorA: string = "#f59e0b";
  export let colorB: string = "#92400e";
  export let opacity: number = 0.25;
</script>

<div class="smoke-wrap" aria-hidden="true" style="--smoke-opacity: {opacity}">
  <Shader style="width: 100%; height: 100%;">
    <Smoke {colorA} {colorB} colorDecay={0.5} />
  </Shader>
</div>

<style>
  .smoke-wrap {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: var(--smoke-opacity, 0.12);
  }
</style>
