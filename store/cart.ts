// stores/counter.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cart: {
        items: [
          /*{id, label, image, price, qte_stock, quantity, variant_value, weight}*/
        ]
      }
    }
  },
  // could also be defined as
  actions: {
    reduceProductQuantity(payload) {
      const product = this.cart.items.find(
        (product) => product.id == payload.id
      )
      product.quantity -= payload.quantity
    },
    incrementProductQuantity(state, payload) {
      const product = this.cart.items.find((product) => product.id == payload.id)
      product.quantity += payload.quantity
    },
    removeProduct(payload) {
      this.cart.items.splice(
        this.cart.items.findIndex((product) => payload),
        1
      )
    },
    addProduct(payload) {
      const product = this.cart.items.find(
        (product) => product.id == payload.id
      )
      if (!product) {
        this.cart.items.push(payload)
      } else {
        product.quantity += payload.quantity
      }
    },
    setProductQuantity(payload) {
      this.cart.items.map((product) => product.id == payload.id)
    },
    cartTotalPrice: () => {
      return this.cart.items.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0)
    },
    clearCart() {
      this.cart.items = []
    }
  }
})
