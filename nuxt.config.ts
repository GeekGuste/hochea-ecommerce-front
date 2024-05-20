import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  runtimeConfig: {
    // Private config that is only available on the server
    stripePk: 'pk_test_51Kpr85DP9ndu4EFOVJwmW613vPQLBznGcMK3uCTRb9P3BukYWtvjPLPRE6Ro1UiQUj4iyS48PZKjgGfmP14BBZpA00zasiO8k7',
    locale: 'fr',
    // Config within public will be also exposed to the client
    public: {
      apiVersion: '1.0',
      baseUrl: 'http://127.0.0.1:8000',
    }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  meta: {
    title: 'hochea creation',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: 'https://js.stripe.com/v3' },
      {
        src: 'https://unpkg.com/vue-paypal-checkout@2.0.0/dist/vue-paypal-checkout.min.js'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],
  scss: ['~/assets/scss/main'],
  styleResources: {
    scss: '@/assets/scss/_variables.scss'
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@pinia/nuxt',
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/eslint-module',
    //'@nuxtjs/style-resources',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access',
          maxAge: 1800,
          global: true
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: /*'username'*/ false
          //autoFetch: true
        },
        endpoints: {
          login: {
            url: 'auth/jwt/create/',
            method: 'post'
          },
          refresh: { url: 'auth/jwt/refresh/', method: 'post' },
          logout: { url: 'auth/token/logout/', method: 'post' },
          user: {
            url: 'auth/users/me/',
            method: 'get',
            propertyName: false
          }
        },
        redirect: {
          login: '/login',
          home: '/'
        }
      }
    }
  },
  // Disable Nuxt from importing Bootstrap compiled CSS file
  bootstrapVue: {
    icons: true,
    bootstrapCSS: true,
    bootstrapVueCSS: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL || 'https://hochea.tincom.biz'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: true
    },
    vendor: ['vue-paypal-checkout']
  }
})
