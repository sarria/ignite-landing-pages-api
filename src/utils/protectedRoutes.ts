const getProtectedRoutes = (protectedRoutesString: string) => {
    return protectedRoutesString.split(',')
}

export const isProtectedRoute = (route: string) => {
    if (!import.meta.env.PROTECTED_ROUTES) {
        throw new Error('PROTECTED_ROUTES env not defined.')
    }
    if (typeof import.meta.env.PROTECTED_ROUTES !== 'string') {
        throw new Error('PROTECTED_ROUTES env not defined correctly.')
    }

    const protectedRoutes = getProtectedRoutes(import.meta.env.PROTECTED_ROUTES)
    return protectedRoutes.includes(route)
}
