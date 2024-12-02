export interface LanguageResponse {
    data: {
        lang: string;
        translations: Record<string, string>;
    },
    message: null;
}