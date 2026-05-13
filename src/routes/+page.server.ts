import type { PageServerLoad, Actions } from './$types'
import { getRecentContent } from '$lib/content'
import { env } from '$env/dynamic/private'
import { fail } from '@sveltejs/kit'

export const load: PageServerLoad = () => ({
  recent: getRecentContent(3)
})

export const actions: Actions = {
  contact: async ({ request }) => {
    const data = await request.formData()
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    const details = String(data.get('details') ?? '').trim()

    if (!name || !email || !details) {
      return fail(400, { error: 'Missing required fields.' })
    }

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      `\n${details}`,
    ]
      .filter(Boolean)
      .join('\n')

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <contact@kalebgarner.com>',
        to: 'kaleb.garner.15@gmail.com',
        reply_to: email,
        subject: company
          ? `[kgweb] ${name} @ ${company}`
          : `[kgweb] Message from ${name}`,
        text: body,
      }),
    })

    if (!res.ok) {
      console.error('Resend error:', await res.text())
      return fail(500, { error: 'Failed to send. Please try again.' })
    }

    return { success: true }
  },
}
