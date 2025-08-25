<template>
  <div class="col-md-4 offset-md-4 mt-5">
    <b-card header="Connexion">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Email:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            placeholder="Email"
            type="email"
            required
          />
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Mot de passe:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Mot de passe"
            required
          />
        </b-form-group>
        <div class="text-center">
          <b-button type="submit" variant="primary">Se connecter</b-button>
          <b-button type="reset" variant="danger">Annuler</b-button>
          <hr />
          Ou
          <br />
          <NuxtLink to="/register" class="btn btn-info">S'inscrire</NuxtLink>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  email: '',
  password: ''
})

const nuxtApp = useNuxtApp()

function onSubmit(event: Event) {
  event.preventDefault()
  nuxtApp.$auth.loginWith('local', { data: form })
}

function onReset(event: Event) {
  event.preventDefault()
  form.email = ''
  form.password = ''
}
</script>
