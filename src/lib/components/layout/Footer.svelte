<footer class="footer">
  <div class="footer-inner">
    <p class="copyright">© {new Date().getFullYear()} Kaleb Garner</p>
    <nav class="links" aria-label="Social links">
      <a href="https://github.com/kalebgarner" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://linkedin.com/in/kaleb-garner" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="https://twitter.com/kalebgarner" target="_blank" rel="noopener noreferrer">X</a>
    </nav>
  </div>
</footer>

<style>
  .footer {
    padding: 2rem 1.5rem;
    border-top: 1px solid var(--color-border);
  }

  .footer-inner {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .copyright {
    font-size: 0.8125rem;
    color: var(--color-text-secondary);
  }

  .links {
    display: flex;
    gap: 1.25rem;
  }

  .links a {
    font-size: 0.8125rem;
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .links a:hover {
    color: var(--color-accent);
  }
</style>
