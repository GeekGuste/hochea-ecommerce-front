import { StripeCheckout, StripePlugin } from '@vue-stripe/vue-stripe'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const options = {
    pk: config.STRIPE_PK,
    locale: config.LOCALE
  }
  /*nuxtApp.vueApp.component('StripeCheckout', StripeCheckout);*/
  nuxtApp.vueApp.use(StripePlugin, options)
})
