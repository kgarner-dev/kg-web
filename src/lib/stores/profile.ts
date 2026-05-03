import { writable } from 'svelte/store'
import { browser } from '$app/environment'
import type { AccentColor, Profile, ThemePreference } from '$lib/types'

const STORAGE_KEY = 'kg_profile'

const DEFAULT: Profile = {
  accentColor: 'amber',
  theme: 'light'
}

function createProfileStore() {
  const initial: Profile = browser
    ? (JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') ?? DEFAULT)
    : DEFAULT

  const { subscribe, set, update } = writable<Profile>(initial)

  if (browser) {
    subscribe((value) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value)))
  }

  return {
    subscribe,
    setAccentColor: (color: AccentColor) => update((s) => ({ ...s, accentColor: color })),
    setTheme: (theme: ThemePreference) => update((s) => ({ ...s, theme })),
    reset: () => set(DEFAULT)
  }
}

export const profile = createProfileStore()
