import Aura from '@primevue/themes/aura';


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@primevue/nuxt-module', '@nuxtjs/tailwindcss'],
  app: {
    baseURL: "/translation-helper/",
    head: {
      title: "Translation Helper",
      meta: [{ name: "robots", content: "noindex" }],
    },
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'class',
        }
      }
    }
  },
  devtools: { enabled: true }
})