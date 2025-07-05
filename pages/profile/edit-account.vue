<template>
  <div>
    <center>
      <h3><u>Modifier mes informations</u></h3>
    </center>
    <b-form @submit="onSubmit" @reset="onReset" v-if="!!id">
      <b-form-group id="input-group-1" label="Nom*:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.last_name"
          placeholder="Nom"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-1" label="Prénom*:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.first_name"
          placeholder="Prénom"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Numéro de téléphone:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.phone_number"
          placeholder="Numéro de téléphone"
          type="text"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="success">Enregister</b-button>
      <b-button type="reset" variant="danger">Annuler</b-button>
    </b-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { User } from '../../models/user'

definePageMeta({ layout: 'profile', middleware: ['auth'] })

const form = reactive({
  first_name: '',
  last_name: '',
  phone_number: ''
})
const id = ref<number | null>(null)
const nuxtApp = useNuxtApp()

const { data: user } = await useFetch<User>('/auth/users/me/')
if (user.value) {
  id.value = user.value.id
  form.first_name = user.value.first_name
  form.last_name = user.value.last_name
  form.phone_number = user.value.phone_number
}

async function onSubmit(event: Event) {
  event.preventDefault()
  await nuxtApp.$axios.$patch(`/api/profile/${id.value}/`, { ...form })
  // @ts-ignore
  nuxtApp.$bvToast.toast('Compte mis à jour avec succès', {
    title: 'Succès',
    variant: 'success'
  })
}

function onReset(event: Event) {
  event.preventDefault()
}
</script>