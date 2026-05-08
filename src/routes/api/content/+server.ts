import type { RequestHandler } from './$types'
import { getAllPosts } from '$lib/content'
import { json } from '@sveltejs/kit'

export const GET: RequestHandler = () => {
  return json(getAllPosts())
}
