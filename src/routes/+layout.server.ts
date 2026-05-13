import { getAllContent } from '$lib/content'

export const prerender = false
export const ssr = true

export function load() {
  const counts = new Map<string, number>()
  for (const item of getAllContent()) {
    for (const tag of item.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  const tags = [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, count]) => ({ name, count }))
  return { tags }
}
