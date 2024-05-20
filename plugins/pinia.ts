import { useCartStore } from '~/store'

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      store: useCartStore($pinia)
    }
  }
})
