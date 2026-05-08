import type { PageServerLoad } from './$types'
import { getProject } from '$lib/content'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = ({ params }) => {
  const project = getProject(params.slug)
  if (!project) error(404, 'Project not found')
  return { project }
}
