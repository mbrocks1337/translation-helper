export const API_URLS = {
    local: 'http://localhost',
    stage: 'https://api-stage.ivg.auction',
    prod: 'https://api.ivg.auction',
} as const;

interface Language {
    code: string
    name: string
}
export const LANGUAGES: Language[] = [
    {
        code: 'de',
        name: 'Deutsch',
    },
    {
        code: 'en',
        name: 'English',
    }
] as const;

export type ApiUrl = (typeof API_URLS)[keyof typeof API_URLS]