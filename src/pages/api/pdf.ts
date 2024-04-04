import type { APIRoute } from 'astro'
import z from 'zod'
import { getPdfFromUrl, pdfFormats } from '../../services/pdf'

const requestSchema = z.object({
    url: z.string().url(),
    size: z.enum(pdfFormats),
})

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json().catch(() => {
            throw new Error('No body received.')
        })
        const payload = requestSchema.parse(body)
        console.log('Request payload: ', payload)

        const pdf = await getPdfFromUrl(payload.url, payload.size)
        console.log('pdf', pdf)

        return new Response(pdf.toString('base64'), {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
            },
            // TODO: determine if this is necessary.
            // https://aws.amazon.com/blogs/compute/handling-binary-data-using-amazon-api-gateway-http-apis/
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            isBase64Encoded: true,
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
