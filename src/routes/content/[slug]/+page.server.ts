import type { PageServerLoad } from './$types'
import { getPost } from '$lib/content'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = ({ params }) => {
  const post = getPost(params.slug)
  if (!post) error(404, 'Post not found')
  return { post }
}
