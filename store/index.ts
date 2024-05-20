import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [
      /* {id, label, image, price, qte_stock, quantity, variant_value, weight} */
    ]
  }),
  getters: {
    items: (state) => {
      return state.items
    },
    cartTotalPrice: (state) => {
      return state.items.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0)
    },
    cartTotalWeight: (state) => {
      return state.items.reduce((total, product) => {
        return total + product.weight
      }, 0)
    },
    cartNumberOfProducts: (state) => {
      return state.items.length
    }
  },
  actions: {
    incrementProductQuantity(payload) {
      const product = this.items.find((product) => product.id == payload.id)
      product.quantity += payload.quantity
    },
    reduceProductQuantity(payload) {
      const product = this.items.find((product) => product.id == payload.id)
      product.quantity -= payload.quantity
    },
    removeProduct(payload) {
      this.items.splice(
        this.items.findIndex((product) => payload),
        1
      )
    },
    setProductQuantity(state, payload) {
      state.items.map((product) => product.id == payload.id)
    },
    clearCart(state) {
      state.items = []
    },
    addProduct(payload) {
      const productIndex = this.items.find((p) => p.id == payload.id)
      if (!productIndex) {
        this.items.push(payload)
      } else {
        this.incrementProductQuantity({
          id: payload.id,
          quantity: payload.quantity
        })
      }
    }
  }
})
