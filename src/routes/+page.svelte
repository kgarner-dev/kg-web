<script lang="ts">
  import BentoCard from '$lib/components/ui/BentoCard.svelte'
</script>

<svelte:head>
  <title>Kaleb Garner — Software Engineer & Builder</title>
</svelte:head>

<section class="hero-section">
  <div class="hero-container">
    <BentoCard />
  </div>
</section>

<style>
  .hero-section {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 1.5rem 4rem;
  }

  .hero-container {
    width: 100%;
    max-width: 640px;
  }
</style>
