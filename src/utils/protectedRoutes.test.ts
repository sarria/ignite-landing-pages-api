import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { isProtectedRoute } from './protectedRoutes'

describe('checks protected route', () => {
    beforeEach(() => {
        vi.stubEnv('PROTECTED_ROUTES', '/api/route1,/route2,/route3')
    })

    afterEach(() => {
        vi.unstubAllEnvs()
    })

    it('returns true for a protected route', () => {
        expect(isProtectedRoute('/api/route1')).toBeTruthy()
    })

    it('returns false for a non-protected route', () => {
        expect(isProtectedRoute('/route4')).toBeFalsy()
    })

    it('throws error if PROTECTED_ROUTES env is not defined', () => {
        vi.unstubAllEnvs() // Clear the mock for this test
        expect(() => isProtectedRoute('route1')).toThrow('PROTECTED_ROUTES env not defined.')
    })
})
