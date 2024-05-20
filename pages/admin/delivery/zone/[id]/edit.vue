<template>
  <div>
    <b-card header="Modifier une zone de livraison">
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-1" label="Zone:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="deliveryZoneInfo.zone"
            placeholder="Entrer la zone/pays"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Frais de livraison:"
          label-for="input-3"
        >
          <b-form-input
            id="input-1"
            v-model="deliveryZoneInfo.delivery_charges"
            placeholder="Entrer les frais de livraison"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="success">Modifier</b-button>
        <b-button type="reset" variant="danger">Annuler</b-button>
      </b-form>
    </b-card>
  </div>
</template>
<script setup lang="ts">
import { DeliveryZoneInfo } from '../../../../../models/delivery'

definePageMeta({
  layout: 'admin',
  transition: {
    name: 'AdminEditdeliveryZoneInfoPage'
  },
  middleware: ['auth']
})
const deliveryZoneInfo = ref({
  id: 0,
  zone: '',
  delivery_charges: 0
})
const route = useRoute()

onMounted(() => {
  useFetch(`/api/deliveryZoneInfo/${route.params.id}/`).then(
    (deliveryZoneInf: DeliveryZoneInfo) => {
      deliveryZoneInf.value = { ...deliveryZoneInf }
    }
  )
})
const onSubmit = (event: any) => {
  event.preventDefault()
  $fetch(`/api/deliveryZoneInfo/${route.params.id}/`, {
    method: 'PUT',
    body: deliveryZoneInfo.value
  }).then((res: any) => {
    //@ts-ignore
    this.$bvToast.toast('Zone/pays de livraison modifié avec succès', {
      title: 'Succès',
      variant: 'success'
    })
  })
}
</script>
