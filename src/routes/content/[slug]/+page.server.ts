import type { PageServerLoad } from './$types'
import { getContentItem } from '$lib/content'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = ({ params }) => {
  const item = getContentItem(params.slug)
  if (!item) error(404, 'Not found')
  return { item }
}
