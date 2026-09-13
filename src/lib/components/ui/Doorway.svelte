<script lang="ts">
  interface Props {
    headline: string;
    text: string;
    href: string;
    icon: string;
  }

  let { headline, text, href, icon }: Props = $props();
</script>

<a {href} class="doorway">
  <div class="doorway-content">
    <i class="ph-bold {icon} doorway-icon"></i>
    <div>
      <h3 class="doorway-headline">{headline}</h3>
      <p class="doorway-text">{text}</p>
    </div>
  </div>
</a>

<style>
  .doorway {
    display: block;
    flex: 1;
    padding: 2rem;
    position: relative;
    border-radius: 2rem;
    text-decoration: none;
    color: var(--color-font);
    transition: color 0.2s ease;

    @media (max-width: 768px) {
      padding: 1.25rem 1.5rem;
    }

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      right: 75%;
      border-radius: 2rem;
      background: linear-gradient(
        to right,
        transparent,
        var(--color-accent),
        transparent
      );
      z-index: -2;
      opacity: 0;
      transition:
        opacity 0.2s ease,
        right 0.2s ease;
    }

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 2rem;
      background: rgba(0, 0, 0, 0.785);
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      z-index: -1;
    }

    &:hover {
      color: var(--color-accent);

      &::before {
        right: 0;
        opacity: 1;
      }
    }
  }

  .doorway-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .doorway-icon {
    font-size: 1.75rem;
    flex-shrink: 0;
  }

  .doorway-headline {
    margin: 0 0 0.25rem;
    font-size: var(--text-body);
  }

  .doorway-text {
    font-size: var(--text-body);
    color: var(--color-tertiary);
    margin: 0;
    line-height: 1.4;
  }
</style>
