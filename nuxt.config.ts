import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'hochea-ecommerce-front',
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
    }
  },
  css: ['~/assets/scss/main'],
  plugins: [
    { src: '~/plugins/vue-stripe.js', mode: 'client' },
    { src: '~/plugins/paypal.client.js', mode: 'client' },
    { src: '~/plugins/axios.ts', mode: 'client' },
    { src: '~/plugins/auth.client.ts', mode: 'client' }
  ],
  components: true,
  modules: [
    'bootstrap-vue-3/nuxt'
  ],
  bootstrapVue: {
    icons: true,
    bootstrapCSS: true,
    bootstrapVueCSS: true
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL || 'https://hochea.tincom.biz',
      STRIPE_PK: process.env.STRIPE_PK
    }
  }
})
