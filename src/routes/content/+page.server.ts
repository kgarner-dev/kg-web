import type { PageServerLoad } from './$types'
import { getAllContent } from '$lib/content'

export const load: PageServerLoad = () => ({
  items: getAllContent()
})
