import PayPal from 'vue-paypal-checkout'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use('paypal-checkout', PayPal)
})
