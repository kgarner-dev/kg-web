<script lang="ts">
  interface Props {
    title: string;
    description?: string;
    image?: string;
    tag?: string;
    href?: string;
    icon?: string;
  }

  let { title, description, image, tag, href = "#", icon }: Props = $props();
</script>

<a {href} class="featured-card" class:icon-card={!!icon}>
  {#if image && !icon}
    <div class="card-image">
      <img src={image} alt={title} loading="lazy" decoding="async" />
    </div>
  {/if}
  <div class="card-body">
    {#if tag}
      <span class="card-tag">{tag}</span>
    {/if}
    <h3 class="card-title">{title}</h3>
    {#if description}
      <p class="card-desc">{description}</p>
    {/if}
  </div>
  {#if icon}
    <i class="ph-bold {icon} card-icon" aria-hidden="true"></i>
  {/if}
</a>

<style>
  .featured-card {
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    overflow: hidden;
    text-decoration: none;
    color: var(--color-font);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);

    &.icon-card {
      flex-direction: row;
      align-items: center;
      position: relative;

      .card-body {
        padding-right: 5rem;
      }

      .card-icon {
        position: absolute;
        right: -2rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: clamp(8rem, 30vw, 12rem);
        color: var(--color-accent);
        line-height: 1;
        pointer-events: none;
        opacity: 0.125;
      }
    }

    .card-image {
      width: 100%;
      aspect-ratio: 16 / 9;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }

    .card-body {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
      flex: 1;
    }

    .card-tag {
      font-size: var(--text-small);
      font-weight: 600;
      color: var(--color-accent);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .card-title {
      font-size: clamp(0.95rem, 1.5vw, 1.1rem);
      line-height: 1.3;
      letter-spacing: 0.01em;
      margin: 0;
    }

    .card-desc {
      font-size: var(--text-body);
      color: var(--color-tertiary);
      line-height: 1.6;
      margin: 0;
      flex: 1;
    }
  }
</style>
