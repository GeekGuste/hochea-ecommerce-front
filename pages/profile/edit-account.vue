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
import { User } from '../../models/user'
definePageMeta({
  layout: 'profile',
  transition: {
    name: 'ProfileEditAccountPage'
  },
  middleware: ['auth']
})
const form = ref({
  first_name: '',
  last_name: '',
  phone_number: ''
})
const id = ref(null)

onMounted(() => {
  categoryTree.value = await useFetch('/api/category/tree/')
  $fetch('/auth/users/me/', {
    method: 'GET'
  }).then((user: User) => {
    id.value = user.id
    form.value.first_name = user.first_name
    form.value.last_name = user.last_name
    form.value.phone_number = user.phone_number
  })
})

const onSubmit = (event: any) {
  event.preventDefault()
  //user registration
  $fetch(`/api/profile/${id.value}/`, {
    method: 'PATCH',
    body: {...form.value},
  }).then((result) => {
      //@ts-ignore
      this.$bvToast.toast('Compte mis à jour avec succès', {
        title: 'Succès',
        variant: 'success'
      })
    })
}
const onReset = (event: any) => {}
</script>
