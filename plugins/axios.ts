import axios from 'axios'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const instance = axios.create({ baseURL: config.public.BASE_URL })
  return {
    provide: { axios: instance }
  }
})
