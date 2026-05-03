export type AccentColor = 'amber' | 'clay' | 'blue' | 'sage'
export type ThemePreference = 'light' | 'dark'

export interface Profile {
  accentColor: AccentColor
  theme: ThemePreference
}

export interface AccentColorConfig {
  label: string
  hex: string
  smokeSecondary: string
}
