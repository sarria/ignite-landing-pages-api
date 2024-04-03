import { defineMiddleware } from 'astro:middleware'
import { getApiKeys, logUserAccess } from '../utils/apiKeys'
import { isProtectedRoute } from '../utils/protectedRoutes'

export const onRequest = defineMiddleware(({ request, url }, next) => {
    if (import.meta.env.API_KEYS && isProtectedRoute(url.pathname)) {
        const keys = getApiKeys()

        const apiKey = request.headers?.get('X-Api-Key')
        if (!apiKey) {
            console.log('Request made with no api key.')
            return new Response(JSON.stringify({ message: 'Invalid authorization.' }), {
                status: 401,
            })
        }

        const matchingKey = keys.find((keyPair) => keyPair.key === apiKey)
        if (!matchingKey) {
            console.log('Request made with incorrect api key.')
            return new Response(JSON.stringify({ message: 'Invalid authorization.' }), {
                status: 401,
            })
        }

        logUserAccess(matchingKey)
    }

    return next()
})
