// ─── Unified content system ───────────────────────────────

export interface ContentItem {
  slug: string
  title: string
  date: string
  tags: string[]
  status: string
  summary: string
  readingTime: number
  preview_image?: string
  links?: Record<string, string>
}

export interface ContentItemFull extends ContentItem {
  html: string
  toc: TocItem[]
}

// ─── Theme / profile ──────────────────────────────────────

export type ThemePreference = 'light' | 'dark'

export interface Profile {
  accentColor: string   // hex color e.g. '#39ff14'
  theme: ThemePreference
}

export interface AccentColorConfig {
  label: string
  hex: string
}

// ─── Legacy types (used by homepage featured query) ───────

export type ContentType = 'post' | 'note' | 'video' | 'project'
export type ContentStatus = 'published' | 'draft'
export type ProjectStatus = 'active' | 'shipped' | 'archived'

export interface TocItem {
  level: number
  text: string
  id: string
}

export interface PostMeta {
  title: string
  slug: string
  tags: string[]
  summary: string
  date: string
  readingTime: number
  preview_image?: string
}

export interface Post extends PostMeta {
  html: string
  toc: TocItem[]
}

export interface PlatformStats {
  devto?: { reactions: number; reads: number; comments: number; url: string }
  youtube?: { views: number; likes: number; comments: number }
}
