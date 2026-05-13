<script lang="ts">
  import { enhance } from '$app/forms'

  let { open = $bindable(false) }: { open: boolean } = $props()

  let dialog: HTMLDialogElement | null = $state(null)
  let success = $state(false)
  let submitting = $state(false)

  $effect(() => {
    if (open) {
      success = false
      dialog?.showModal()
    }
  })

  function close() {
    open = false
    dialog?.close()
  }

  function onDialogClick(e: MouseEvent) {
    if (e.target === dialog) close()
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
<dialog bind:this={dialog} class="modal" onclick={onDialogClick} aria-label="Contact form">
  <div class="modal-inner card">
    {#if success}
      <div class="success-state">
        <div class="success-icon">
          <i class="ph-bold ph-check"></i>
        </div>
        <h2 class="success-heading">Message sent!</h2>
        <p class="success-body">
          Thanks for reaching out. I'll get back to you soon.
        </p>
        <button class="btn-primary" onclick={close}>Close</button>
      </div>
    {:else}
      <div class="modal-header">
        <h2 class="modal-title">Get in touch</h2>
        <button class="close-btn" onclick={close} aria-label="Close">
          <i class="ph-bold ph-x"></i>
        </button>
      </div>

      <form
        method="POST"
        action="/?/contact"
        use:enhance={() => {
          submitting = true
          return async ({ result, update }) => {
            submitting = false
            if (result.type === 'success') {
              success = true
            } else {
              await update()
            }
          }
        }}
        class="form"
      >
        <div class="field-row">
          <div class="field">
            <label for="cf-name" class="label">Name</label>
            <input
              id="cf-name"
              name="name"
              type="text"
              class="input"
              placeholder="Your name"
              required
              autocomplete="name"
            />
          </div>
          <div class="field">
            <label for="cf-email" class="label">Email</label>
            <input
              id="cf-email"
              name="email"
              type="email"
              class="input"
              placeholder="you@example.com"
              required
              autocomplete="email"
            />
          </div>
        </div>

        <div class="field">
          <label for="cf-company" class="label">
            Company or Organization
            <span class="optional">optional</span>
          </label>
          <input
            id="cf-company"
            name="company"
            type="text"
            class="input"
            placeholder="Where are you from?"
            autocomplete="organization"
          />
        </div>

        <div class="field">
          <label for="cf-details" class="label">How can I help you?</label>
          <textarea
            id="cf-details"
            name="details"
            class="input textarea"
            placeholder="Tell me about what you have in mind..."
            rows="4"
            required
          ></textarea>
        </div>

        <div class="form-footer">
          <button type="button" class="btn-ghost" onclick={close}>Cancel</button>
          <button type="submit" class="btn-primary" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send message'}
          </button>
        </div>
      </form>
    {/if}
  </div>
</dialog>

<style>
  dialog.modal {
    border: none;
    padding: 0;
    background: transparent;
    outline: none;
    width: min(520px, calc(100vw - 2rem));
    margin: auto;
  }

  dialog.modal::backdrop {
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  .modal-inner {
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* ── Header ─────────────────────────────────────────────── */
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .modal-title {
    font-family: 'Manrope', sans-serif;
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--color-text-primary);
    margin: 0;
  }

  .close-btn {
    width: 2rem;
    height: 2rem;
    border-radius: 8px;
    border: 1px solid var(--color-border);
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: var(--color-text-secondary);
    transition: background 0.15s ease, color 0.15s ease;
  }

  .close-btn:hover {
    background: var(--color-border);
    color: var(--color-text-primary);
  }

  /* ── Form ────────────────────────────────────────────────── */
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    .field-row { grid-template-columns: 1fr; }
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  .optional {
    font-size: 0.6875rem;
    font-weight: 400;
    opacity: 0.6;
  }

  .input {
    width: 100%;
    padding: 0.625rem 0.75rem;
    border-radius: 10px;
    border: 1px solid var(--color-border);
    background: var(--color-bg);
    color: var(--color-text-primary);
    font-size: 0.875rem;
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    box-sizing: border-box;
  }

  .input::placeholder { color: var(--color-text-secondary); opacity: 0.5; }

  .input:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 15%, transparent);
  }

  .textarea {
    resize: vertical;
    min-height: 100px;
  }

  /* ── Footer ──────────────────────────────────────────────── */
  .form-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.625rem;
    margin-top: 0.25rem;
  }

  .btn-primary {
    font-family: 'Manrope', sans-serif;
    font-size: 0.8125rem;
    font-weight: 700;
    padding: 0.5625rem 1.25rem;
    border-radius: 999px;
    border: none;
    background: var(--color-accent);
    color: #fff;
    cursor: pointer;
    transition: opacity 0.15s ease;
  }

  .btn-primary:hover:not(:disabled) { opacity: 0.82; }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-ghost {
    font-size: 0.8125rem;
    font-weight: 500;
    padding: 0.5625rem 1rem;
    border-radius: 999px;
    border: 1px solid var(--color-border);
    background: transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .btn-ghost:hover {
    background: var(--color-border);
    color: var(--color-text-primary);
  }

  /* ── Success ─────────────────────────────────────────────── */
  .success-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.875rem;
    padding: 1rem 0;
  }

  .success-icon {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: color-mix(in srgb, var(--color-accent) 15%, transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--color-accent);
  }

  .success-heading {
    font-family: 'Manrope', sans-serif;
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--color-text-primary);
    margin: 0;
  }

  .success-body {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    margin: 0;
    max-width: 30ch;
    line-height: 1.6;
  }
</style>
