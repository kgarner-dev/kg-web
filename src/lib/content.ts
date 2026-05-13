import matter from 'gray-matter'
import { marked } from 'marked'
import type { TocItem, ContentItem, ContentItemFull } from '$lib/types'

const postFiles = import.meta.glob('/src/content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

// ─── Helpers ─────────────────────────────────────────────

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

function normalizeTags(tags: unknown): string[] {
  return Array.isArray(tags) ? tags.map((t) => String(t).toLowerCase()) : []
}

// ─── Content ─────────────────────────────────────────────

export function getAllContent(): ContentItem[] {
  return Object.values(postFiles)
    .map((raw) => {
      const { data, content } = matter(raw)
      return {
        slug: data.slug ?? '',
        title: data.title ?? '',
        date: data.date ?? '',
        tags: normalizeTags(data.tags),
        status: data.status ?? 'draft',
        summary: data.summary ?? '',
        readingTime: calcReadingTime(content),
        preview_image: data.preview_image,
        links: data.links ?? undefined
      } satisfies ContentItem
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getContentItem(slug: string): ContentItemFull | undefined {
  const raw = Object.values(postFiles).find((r) => matter(r).data.slug === slug)
  if (!raw) return undefined
  const { data, content } = matter(raw)
  return {
    slug: data.slug ?? '',
    title: data.title ?? '',
    date: data.date ?? '',
    tags: normalizeTags(data.tags),
    status: data.status ?? 'draft',
    summary: data.summary ?? '',
    readingTime: calcReadingTime(content),
    preview_image: data.preview_image,
    links: data.links ?? undefined,
    html: marked(content, { renderer: makeRenderer() }) as string,
    toc: extractToc(content)
  }
}

export function getRecentContent(limit = 5): ContentItem[] {
  return getAllContent().slice(0, limit)
}
