import type { APIRoute } from 'astro'
import z from 'zod'
import { getScrapeUrl } from '../../services/scrape'

const requestSchema = z.object({
    url: z.string().url(),
})

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json().catch(() => {
            throw new Error('No body received.')
        })
        const payload = requestSchema.parse(body)
        console.log('Request payload: ', payload)

        const result = await getScrapeUrl(payload.url)
        console.log('result', result)

        return new Response(JSON.stringify({ result }), {
            status: 200,
        })     
    } catch (err) {
        if (err instanceof z.ZodError) {
            console.log('Error (ZodError): ' + err.issues)
            return new Response(JSON.stringify({ validationError: err.issues }), {
                status: 400,
            })
        }

        if (err instanceof Error) {
            console.log('Error (Error): ' + err.message)
            return new Response(JSON.stringify({ message: err.message }), {
                status: 400,
            })
        }

        console.log('Unhandled exception: ' + err)
        return new Response(JSON.stringify({ message: 'Internal Error.' }), {
            status: 500,
        })
    }
}
