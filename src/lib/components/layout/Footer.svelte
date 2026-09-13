<footer class="footer">
  <div class="footer-inner">
    <div class="footer-left">
      <a href="/" class="footer-logo-link" aria-label="Home">
        <img src="/images/logo.png" alt="Kaleb Garner" class="footer-logo" />
      </a>
      <p class="footer-tagline">Thank you for visiting my site!</p>
      <p class="footer-copy">
        &copy; {new Date().getFullYear()} Kaleb Garner. All rights reserved.
      </p>
    </div>

    <nav class="footer-nav" aria-label="Footer navigation">
      <div class="nav-col">
        <p class="nav-heading">Navigate</p>
        <a href="/">Home</a>
        <a href="/now">About</a>
        <a href="/work">Work</a>
        <a href="/blog">Blog</a>
        <a href="/speaking">Speaking</a>
        <a href="/interests">Personal Projects</a>
      </div>

      <div class="nav-col">
        <p class="nav-heading">Connect</p>
        <a
          href="https://cal.com/kalebgarner"
          target="_blank"
          rel="noopener noreferrer">Coffee Chat</a
        >
        <a
          href="https://www.linkedin.com/in/kalebgarner/"
          target="_blank"
          rel="noopener noreferrer">LinkedIn</a
        >
        <a
          href="https://github.com/kgarner-dev"
          target="_blank"
          rel="noopener noreferrer">GitHub</a
        >
        <a
          href="https://www.youtube.com/@kgthedevgu"
          target="_blank"
          rel="noopener noreferrer">YouTube</a
        >
        <a
          href="https://x.com/kalebgarneryoiu"
          target="_blank"
          rel="noopener noreferrer">X</a
        >
      </div>
    </nav>
  </div>
</footer>

<style>
  .footer {
    background: #000000;
    width: 100%;
    margin-top: 2rem;
  }

  .footer-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;

    @media (min-width: 750px) {
      flex-direction: row;
      justify-content: space-between;
      gap: 4rem;
    }
  }

  .footer-left {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex-shrink: 0;
  }

  .footer-logo-link {
    display: inline-block;
    width: fit-content;
  }

  .footer-logo {
    height: 2.5rem;
    width: auto;
    display: block;
    border-radius: 10px;
  }

  .footer-tagline {
    font-size: var(--text-body);
    color: var(--text-primary);
    margin: 0.5rem 0 0;
  }

  .footer-copy {
    font-size: var(--text-small);
    color: var(--text-tertiary);
    margin: 0;
  }

  .footer-nav {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    flex: 1;
    max-width: 500px;
  }

  .nav-col {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .nav-heading {
    font-size: var(--text-small);
    font-weight: 700;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .nav-col a {
    font-size: var(--text-body);
    color: rgba(255, 255, 255, 0.4);
    text-decoration: none;
    transition: color 0.15s ease;
    line-height: 1;

    &:hover {
      color: rgba(255, 255, 255, 0.85);
    }
  }
</style>
