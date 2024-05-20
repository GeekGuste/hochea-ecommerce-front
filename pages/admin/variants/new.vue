<template>
  <div>
    <div>
      <NuxtLink class="btn btn-warning text-white" to="/admin/variants/"
        >Liste</NuxtLink
      >
      <hr />
    </div>
    <b-card header="Ajouter un type de variant">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Libellé:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.label"
            placeholder="Entrer le libelle"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Enregistrer</b-button>
        <b-button type="reset" variant="danger">Annuler</b-button>
      </b-form>
    </b-card>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  transition: {
    name: 'AdminAddVariantType'
  },
  middleware: ['auth']
})
const form = ref({
  label: ''
})
const onSubmit = (event: any) => {
  event.preventDefault()
  $fetch('/api/varianttype/', {
    method: 'POST',
    body: { ...form.value }
  }).then((res: any) => {
    //@ts-ignore
    this.$bvToast.toast('Type de variant enregistré avec succès', {
      title: 'Succès',
      variant: 'success'
    })
    clearForm()
  })
}
const onReset = (event: any) => {
  event.preventDefault()
  clearForm()
}
const clearForm = () => {
  // Reset our form values
  form.value.label = ''
}
</script>
