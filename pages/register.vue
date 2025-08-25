<template>
  <div class="col-md-4 offset-md-4 mt-5">
    <b-card header="Inscription">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Nom*:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.last_name"
            placeholder="Nom"
            type="text"
            required
          />
        </b-form-group>
        <b-form-group id="input-group-2" label="Prénom*:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.first_name"
            placeholder="Prénom"
            type="text"
            required
          />
        </b-form-group>
        <b-form-group id="input-group-3" label="Email*:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.email"
            placeholder="Email"
            type="email"
            required
          />
        </b-form-group>
        <b-form-group id="input-group-4" label="Numéro de téléphone:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.phone_number"
            placeholder="Numéro de téléphone"
            type="text"
          />
        </b-form-group>
        <b-form-group id="input-group-5" label="Mot de passe*:" label-for="input-5">
          <b-form-input
            id="input-5"
            v-model="form.password"
            type="password"
            placeholder="Mot de passe"
            required
          />
          <b-form-text>
            Votre mot de passe doit faire au moins 8 caractères
          </b-form-text>
        </b-form-group>
        <b-button type="submit" variant="primary">S'inscrire</b-button>
        <b-button type="reset" variant="danger">Annuler</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  phone_number: ''
})

const nuxtApp = useNuxtApp()

async function onSubmit(event: Event) {
  event.preventDefault()
  const result = await nuxtApp.$axios.post('/auth/users/', {
    ...form,
    username: form.email
  })
  if (result) {
    await nuxtApp.$auth.loginWith('local', { data: { email: form.email, password: form.password } })
    window.location.replace('/profile/')
  }
}

function onReset(event: Event) {
  event.preventDefault()
  form.email = ''
  form.password = ''
}
</script>
