<template>
  <div>
    <div>
      <NuxtLink class="btn btn-warning text-white" to="/admin/variants/"
        >Liste</NuxtLink
      >
      <hr />
    </div>
    <b-card header="Modifier un type de variant">
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-1" label="libellé:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="variantType.label"
            placeholder="Entrer le libellé"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="success">Modifier</b-button>
        <b-button type="reset" variant="danger">Annuler</b-button>
      </b-form>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { VariantType } from '~/models/product'

definePageMeta({
  layout: 'admin',
  transition: {
    name: 'AdminEditVariantTypePage'
  },
  middleware: ['auth']
})
const variantType = ref({
  id: 0,
  label: ''
})
const route = useRoute()
onMounted(() => {
  useFetch(`/api/varianttype/${route.params.id}/`).then(
    (variantType: VariantType) => {
      variantType.value = { ...variantType }
    }
  )
})
const onSubmit = (event: any) => {
  event.preventDefault()
  $fetch(`/api/varianttype/${route.params.id}/`, {
    method: 'PUT',
    body: variantType.value
  }).then((res: any) => {
    //@ts-ignore
    this.$bvToast.toast('Type de variant modifié avec succès', {
      title: 'Succès',
      variant: 'success'
    })
  })
}
</script>
