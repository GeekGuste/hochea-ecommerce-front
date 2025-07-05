<template>
  <div>
    <center>
      <h3><u>Modifier votre mot de passe</u></h3>
    </center>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Ancien Mot de passe*:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.current_password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Nouveau mot de passe*:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.new_password"
          type="password"
          required
        ></b-form-input>
        <b-form-text> Au moins 8 caractères </b-form-text>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Confirmation du mot de passe:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.re_new_password"
          type="password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="success">Modifier</b-button>
      <b-button type="reset" variant="danger">Annuler</b-button>
    </b-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

definePageMeta({ layout: 'profile', middleware: ['auth'] })

const form = reactive({
  new_password: '',
  re_new_password: '',
  current_password: ''
})

const nuxtApp = useNuxtApp()

async function onSubmit(event: Event) {
  event.preventDefault()
  if (form.new_password !== form.re_new_password) {
    // @ts-ignore
    nuxtApp.$bvToast.toast('Les mots de passe saisis ne sont pas identiques', {
      title: 'Erreur',
      variant: 'danger'
    })
    return
  }

  try {
    await nuxtApp.$axios.$post('/auth/users/set_password/', { ...form })
    // @ts-ignore
    nuxtApp.$bvToast.toast('Mot de passe mis à jour avec succèss', {
      title: 'Succès',
      variant: 'success'
    })
  } catch {
    // @ts-ignore
    nuxtApp.$bvToast.toast('Erreur de modification de mot de passe', {
      title: 'erreur',
      variant: 'danger'
    })
  }
}

function onReset(event: Event) {
  event.preventDefault()
}
</script>