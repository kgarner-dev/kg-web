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

export type ContentType = 'post' | 'project'
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
  type: ContentType
  date: string
  status: ContentStatus
  tags: string[]
  summary: string
  readingTime: number
  featured?: boolean
  project?: string
  linkedin_url?: string
}

export interface Post extends PostMeta {
  html: string
  toc: TocItem[]
}

export interface ProjectMeta {
  title: string
  slug: string
  type: 'project'
  status: ProjectStatus
  summary: string
  live_url?: string
  repo_url?: string
  tags: string[]
  tech: string[]
  featured?: boolean
  date: string
}

export interface Project extends ProjectMeta {
  html: string
  toc: TocItem[]
  posts: PostMeta[]
}
