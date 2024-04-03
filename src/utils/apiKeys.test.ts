import { describe, it, expect, vi, afterEach } from 'vitest'
import { getApiKeys, parseApiKeys } from './apiKeys'

describe('parses api keys properly', () => {
    it('parses valid input correctly', () => {
        const input = 'user1:key1,user2:key2'
        const result = parseApiKeys(input)
        expect(result).toEqual([
            { user: 'user1', key: 'key1' },
            { user: 'user2', key: 'key2' },
        ])
    })

    it('throws error for invalid format (no colon)', () => {
        const input = 'user1key1'
        expect(() => parseApiKeys(input)).toThrow('Invalid key format: ":" not found.')
    })

    it('throws error for missing user or key', () => {
        const input = 'user1:,user2:key2'
        expect(() => parseApiKeys(input)).toThrow('Invalid key format: Both user and key are required.')
    })

    it('handles empty string input', () => {
        const input = ''
        expect(() => parseApiKeys(input)).toThrow('Invalid key format: empty string.')
    })

    it('handles extra whitespaces', () => {
        const input = ' user1 : key1 , user2 : key2 '
        const result = parseApiKeys(input)
        expect(result).toEqual([
            { user: 'user1', key: 'key1' },
            { user: 'user2', key: 'key2' },
        ])
    })

    it('parses multiple pairs correctly', () => {
        const input = 'user1:key1,user2:key2,user3:key3'
        const result = parseApiKeys(input)
        expect(result).toHaveLength(3)
        expect(result[2]).toEqual({ user: 'user3', key: 'key3' })
    })
})

describe('it gets api keys properly', () => {
    afterEach(() => {
        vi.unstubAllEnvs()
    })

    it('correctly parses API keys when API_KEYS is defined', () => {
        vi.stubEnv('API_KEYS', 'user1:key1,user2:key2')
        const apiKeys = getApiKeys()
        expect(apiKeys).toEqual([
            { user: 'user1', key: 'key1' },
            { user: 'user2', key: 'key2' },
        ])
    })

    it('throws error if API_KEYS env is not defined', () => {
        expect(() => getApiKeys()).toThrow('API_KEYS env not defined.')
    })
})
