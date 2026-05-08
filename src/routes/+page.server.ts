import type { PageServerLoad } from './$types'
import { getFeaturedPosts, getFeaturedProjects } from '$lib/content'

export const load: PageServerLoad = () => {
  return {
    featured: getFeaturedPosts(3),
    projects: getFeaturedProjects(3)
  }
}
