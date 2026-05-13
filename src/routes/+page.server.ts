import type { PageServerLoad } from './$types'
import { getRecentContent } from '$lib/content'

export const load: PageServerLoad = () => ({
  recent: getRecentContent(3)
})
