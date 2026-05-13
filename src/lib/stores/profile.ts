import { writable } from 'svelte/store'
import { browser } from '$app/environment'
import { PUBLIC_DEFAULT_ACCENT_COLOR } from '$env/static/public'
import type { Profile, ThemePreference } from '$lib/types'

const STORAGE_KEY = 'kg_profile'
const DEFAULT_ACCENT = PUBLIC_DEFAULT_ACCENT_COLOR || '#228B22'

const DEFAULT: Profile = {
  accentColor: DEFAULT_ACCENT,
  theme: 'light'
}

function createProfileStore() {
  const stored = browser ? localStorage.getItem(STORAGE_KEY) : null
  const initial: Profile = stored
    ? { ...DEFAULT, ...(JSON.parse(stored) ?? {}) }
    : DEFAULT

  const { subscribe, set, update } = writable<Profile>(initial)

  if (browser) {
    subscribe((value) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value)))
  }

  return {
    subscribe,
    setAccentColor: (hex: string) => update((s) => ({ ...s, accentColor: hex })),
    setTheme: (theme: ThemePreference) => update((s) => ({ ...s, theme })),
    reset: () => set(DEFAULT)
  }
}

export const profile = createProfileStore()
