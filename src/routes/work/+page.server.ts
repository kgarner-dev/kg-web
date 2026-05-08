import type { PageServerLoad } from './$types'
import { getAllProjects } from '$lib/content'

export const load: PageServerLoad = () => {
  return { projects: getAllProjects() }
}
