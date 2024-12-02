export const API_URLS = {
    local: 'http://localhost',
    stage: 'https://api-stage.ivg.auction',
    prod: 'https://api.ivg.auction',
} as const;

interface Language {
    id: string
    code: string
    name: string
}
export const LANGUAGES: Language[] = [
    {
        id: '19d97f48-bfee-45ce-8bd9-eab6fad36826',
        code: 'de',
        name: 'Deutsch',
    },
    {
        id: '7940885c-26a0-48cd-90b4-57d202034751',
        code: 'en',
        name: 'English',
    }
] as const;

export type ApiUrl = (typeof API_URLS)[keyof typeof API_URLS]