import matter from 'gray-matter'
import { marked } from 'marked'
import type { Post, PostMeta, TocItem, Project, ProjectMeta } from '$lib/types'

const postFiles = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

const projectFiles = import.meta.glob('/src/content/projects/*/index.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function extractToc(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const toc: TocItem[] = []
  let match
  while ((match = headingRegex.exec(markdown)) !== null) {
    toc.push({ level: match[1].length, text: match[2], id: slugify(match[2]) })
  }
  return toc
}

function calcReadingTime(text: string): number {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / 200))
}

function makeRenderer() {
  const renderer = new marked.Renderer()
  renderer.heading = ({ text, depth }) => `<h${depth} id="${slugify(text)}">${text}</h${depth}>\n`
  return renderer
}

function slugFromProjectPath(path: string): string {
  const parts = path.split('/')
  return parts[parts.indexOf('projects') + 1]
}

// ─── Posts ───────────────────────────────────────────────

export function getAllPosts(): PostMeta[] {
  return Object.values(postFiles)
    .map((raw) => {
      const { data, content } = matter(raw)
      return {
        title: data.title ?? '',
        slug: data.slug ?? '',
        type: data.type ?? 'post',
        date: data.date ?? '',
        status: data.status ?? 'draft',
        tags: data.tags ?? [],
        summary: data.summary ?? '',
        readingTime: calcReadingTime(content),
        featured: data.featured ?? false,
        project: data.project,
        linkedin_url: data.linkedin_url ?? ''
      } satisfies PostMeta
    })
    .filter((p) => p.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): Post | undefined {
  const raw = Object.values(postFiles).find((r) => matter(r).data.slug === slug)
  if (!raw) return undefined
  const { data, content } = matter(raw)
  if ((data.status ?? 'draft') !== 'published') return undefined
  return {
    title: data.title ?? '',
    slug: data.slug ?? '',
    type: data.type ?? 'post',
    date: data.date ?? '',
    status: data.status ?? 'draft',
    tags: data.tags ?? [],
    summary: data.summary ?? '',
    readingTime: calcReadingTime(content),
    featured: data.featured ?? false,
    project: data.project,
    linkedin_url: data.linkedin_url ?? '',
    html: marked(content, { renderer: makeRenderer() }) as string,
    toc: extractToc(content)
  }
}

export function getFeaturedPosts(limit = 3): PostMeta[] {
  return getAllPosts().filter((p) => p.featured).slice(0, limit)
}

export function getAllTags(): string[] {
  return [...new Set(getAllPosts().flatMap((p) => p.tags))].sort()
}

// ─── Projects ────────────────────────────────────────────

export function getAllProjects(): ProjectMeta[] {
  return Object.entries(projectFiles)
    .map(([path, raw]) => {
      const { data } = matter(raw)
      return {
        title: data.title ?? '',
        slug: data.slug ?? slugFromProjectPath(path),
        type: 'project' as const,
        status: data.status ?? 'active',
        summary: data.summary ?? '',
        live_url: data.live_url,
        repo_url: data.repo_url,
        tags: data.tags ?? [],
        tech: data.tech ?? [],
        featured: data.featured ?? false,
        date: data.date ?? ''
      } satisfies ProjectMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getProject(slug: string): Project | undefined {
  const entry = Object.entries(projectFiles).find(([path, raw]) => {
    const { data } = matter(raw)
    return (data.slug ?? slugFromProjectPath(path)) === slug
  })
  if (!entry) return undefined
  const [, raw] = entry
  const { data, content } = matter(raw)

  const posts = getAllPosts()
    .filter((p) => p.project === slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return {
    title: data.title ?? '',
    slug: data.slug ?? slug,
    type: 'project' as const,
    status: data.status ?? 'active',
    summary: data.summary ?? '',
    live_url: data.live_url,
    repo_url: data.repo_url,
    tags: data.tags ?? [],
    tech: data.tech ?? [],
    featured: data.featured ?? false,
    date: data.date ?? '',
    html: marked(content, { renderer: makeRenderer() }) as string,
    toc: extractToc(content),
    posts
  }
}

export function getFeaturedProjects(limit = 3): ProjectMeta[] {
  return getAllProjects().filter((p) => p.featured).slice(0, limit)
}
