export type KeyUserPair = {
    user: string
    key: string
}

export const parseApiKeys = (keys: string) => {
    if (keys.length === 0) {
        throw new Error('Invalid key format: empty string.')
    }

    const keyUserPairs: Array<KeyUserPair> = []

    // Replaces all whitespace character with nothing.
    const pairs = keys.replace(/\s+/g, '').split(',')

    for (const pair of pairs) {
        if (!pair.includes(':')) {
            throw new Error('Invalid key format: ":" not found.')
        }

        const [user, key] = pair.split(':')
        if (!user || !key) {
            throw new Error('Invalid key format: Both user and key are required.')
        }

        keyUserPairs.push({ user, key })
    }

    return keyUserPairs
}

export const getApiKeys = () => {
    const apiKeys = import.meta.env?.API_KEYS

    if (!apiKeys) {
        throw new Error('API_KEYS env not defined.')
    }

    return parseApiKeys(apiKeys)
}

export const logUserAccess = (keyUserPair: KeyUserPair) => {
    console.log(`API Key access for user: ${keyUserPair.user}.`)
}
