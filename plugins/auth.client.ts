import { defineNuxtPlugin, useNuxtApp } from '#app'
import { ref, computed } from 'vue'

export default defineNuxtPlugin(() => {
  const user = ref(null as any)
  const loggedIn = computed(() => !!user.value)
  const nuxtApp = useNuxtApp()

  async function loginWith(_strategy: string, opts: { data: any }) {
    try {
      const { data } = await nuxtApp.$axios.post('/auth/login/', opts.data)
      user.value = data
    } catch (e) {
      console.error(e)
    }
  }

  function logout() {
    user.value = null
    return Promise.resolve()
  }

  return {
    provide: {
      auth: { user, loggedIn, loginWith, logout }
    }
  }
})
