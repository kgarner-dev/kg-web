<script lang="ts">
  import Doorway from "$lib/components/ui/Doorway.svelte";
  import FeaturedCard from "$lib/components/ui/FeaturedCard.svelte";
</script>

<svelte:head>
  <title>Kaleb Garner | Engineering Lead</title>
</svelte:head>

<div class="homepage">
  <div class="hero glass">
    <div class="hero-left">
      <div class="identity">
        <img src="/images/headshot.webp" alt="Kaleb Garner" class="headshot" />
        <span class="name">Kaleb Garner</span>
      </div>
      <div class="headlines">
        <h2>Engineering Lead</h2>
        <h2>Systems & Platform Architecture</h2>
        <h2>Speaker & Content Creator</h2>
      </div>
    </div>

    <div class="hero-right">
      <div class="socials">
        <a
          href="https://x.com/kalebgarneryoiu"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
        >
          <i class="ph-bold ph-x-logo"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/kalebgarner/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <i class="ph-bold ph-linkedin-logo"></i>
        </a>
        <a
          href="https://github.com/kgarner-dev"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <i class="ph-bold ph-github-logo"></i>
        </a>
        <a
          href="https://www.youtube.com/@kgthedevgu"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <i class="ph-bold ph-youtube-logo"></i>
        </a>
      </div>

      <div class="hero-desc">
        <p>
          A space to learn more about me and keep up with everything that I am
          actively working on.
        </p>
      </div>
    </div>
  </div>

  <div class="doorways">
    <Doorway
      headline="About Me"
      text="Learn more about me"
      href="/now"
      icon="ph-user"
    />
    <Doorway
      headline="Work"
      text="Things that I have built"
      href="/work"
      icon="ph-briefcase"
    />
    <Doorway
      headline="Blog"
      text="Thoughts and opinions"
      href="/blog"
      icon="ph-article"
    />
    <Doorway
      headline="Speaking"
      text="Talks, videos, podcasts"
      href="/speaking"
      icon="ph-microphone"
    />
  </div>

  <div class="featured glass">
    <p class="featured-label">Featured Pages</p>
    <div class="featured-grid">
      <FeaturedCard
        title="Engineering & Leadership Writing"
        description="Thoughts on platform thinking, technical leadership, and building teams that actually ship."
        image="/images/waves-3.webp"
        tag="Writing"
        href="/blog"
      />
      <FeaturedCard
        title="Projects & Shipped Work"
        description="A look at the products, platforms, and systems I've designed and built over the years."
        image="/images/waves-7.webp"
        tag="Work"
        href="/work"
      />
      <FeaturedCard
        title="Talks & Conference Appearances"
        description="Speaking engagements, panels, and workshops on engineering culture and platform design."
        image="/images/waves-11.webp"
        tag="Speaking"
        href="/speaking"
      />
      <FeaturedCard
        title="Coffee Shop Coders"
        description="The podcast and content series I co-host — conversations at the intersection of code and culture."
        image="/images/waves-1.webp"
        tag="Podcast"
        href="https://www.youtube.com/@kgthedevgu"
      />
    </div>
  </div>

  <div class="more glass">
    <p class="more-label">More Pages</p>
    <div class="more-grid">
      <FeaturedCard
        title="Coffee Chat"
        description="Book some time to chat!"
        tag="Book a Call"
        href="https://cal.com/kalebgarner"
        icon="ph-calendar"
      />
      <FeaturedCard
        title="Personal Projects"
        description="Just some fun projects that reflect my personal life."
        tag="Personal"
        href="/interests"
        icon="ph-baseball"
      />
      <FeaturedCard
        title="My Setup"
        description="The tools I use on a daily basis."
        tag="Tools"
        href="/setup"
        icon="ph-laptop"
      />
    </div>
  </div>
</div>

<style>
  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .homepage {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 1rem;
  }

  .hero {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media (min-width: 800px) {
      flex-direction: row;
      align-items: flex-end;
      min-height: 65vh;
    }

    .hero-left {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      @media (min-width: 800px) {
        flex: 2;
      }
    }

    .hero-right {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      @media (min-width: 800px) {
        flex: 1;
        justify-content: flex-end;
      }
    }
  }

  .identity {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    animation: fade-up 0.5s 0s ease-out both;

    .headshot {
      width: var(--img-profile);
      height: var(--img-profile);
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
    }

    .name {
      font-size: var(--text-medium);
      font-weight: 400;
      color: var(--color-tertiary);
      letter-spacing: 0.04em;
    }
  }

  .headlines {
    display: flex;
    flex-direction: column;
    gap: 0;

    h2 {
      margin: 0;
      line-height: 1.05;
      font-size: var(--text-large);

      &:nth-child(1) {
        animation: fade-up 0.5s 0.25s ease-out both;
      }

      &:nth-child(2) {
        animation: fade-up 0.5s 0.45s ease-out both;
      }

      &:nth-child(3) {
        animation: fade-up 0.5s 0.65s ease-out both;
      }
    }
  }

  .socials {
    display: flex;
    gap: 0.75rem;

    a {
      font-size: 1.5rem;
      color: var(--color-font);
      text-decoration: none;
      line-height: 1;
      transition: color 0.2s ease;

      &:hover {
        color: var(--color-accent);
      }

      &:nth-child(1) {
        animation: fade-up 0.4s 0.85s ease-out both;
      }

      &:nth-child(2) {
        animation: fade-up 0.4s 0.95s ease-out both;
      }

      &:nth-child(3) {
        animation: fade-up 0.4s 1.05s ease-out both;
      }

      &:nth-child(4) {
        animation: fade-up 0.4s 1.15s ease-out both;
      }
    }
  }

  .hero-desc {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    animation: fade-up 0.5s 1.35s ease-out both;

    p {
      color: var(--color-tertiary);
      font-size: var(--text-body);
      line-height: 1.25;
      margin: 0;
    }
  }

  .featured {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .featured-label {
      font-size: var(--text-small);
      font-weight: 600;
      color: var(--color-font);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin: 0;
    }

    .featured-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;

      @media (min-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 960px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }

  .more {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .more-label {
      font-size: var(--text-small);
      font-weight: 600;
      color: var(--color-font);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin: 0;
    }

    .more-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;

      @media (min-width: 600px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }

  .doorways {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 750px) {
      flex-direction: row;
    }
  }
</style>
