import type { AccentColor, AccentColorConfig } from '$lib/types'

export const ACCENT_COLORS: Record<AccentColor, AccentColorConfig> = {
  amber: {
    label: 'Amber',
    hex: '#f59e0b',
    smokeSecondary: '#92400e'
  },
  clay: {
    label: 'Clay',
    hex: '#c4704f',
    smokeSecondary: '#7c3a20'
  },
  blue: {
    label: 'Blue',
    hex: '#3b82f6',
    smokeSecondary: '#1e3a8a'
  },
  sage: {
    label: 'Sage',
    hex: '#6b8f6e',
    smokeSecondary: '#2d4a30'
  }
}
