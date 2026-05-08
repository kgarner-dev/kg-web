import type { PageServerLoad } from './$types'
import { getAllPosts, getAllTags } from '$lib/content'

export const load: PageServerLoad = () => {
  return {
    posts: getAllPosts(),
    tags: getAllTags()
  }
}
