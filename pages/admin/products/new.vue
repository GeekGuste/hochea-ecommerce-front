<template>
  <div class="col-md-6 offset-md-3">
    <b-card header="Ajouter un produit">
      <b-form @submit="onSubmit" @reset="onReset">
        <ImageUpload
          ref="uploadComponent"
          :imageUrl="null"
          @onSelect="onImageSelect"
        />
        <b-form-group id="input-group-2" label="catégorie:" label-for="input-3">
          <b-form-select
            id="input-3"
            required
            multiple
            v-model="form.categories"
            :options="categories"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Nom du produit:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.label"
            placeholder="Entrer le nom"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Description du produit:"
          label-for="input-1"
        >
          <b-form-textarea
            id="input-1"
            v-model="form.description"
            placeholder="Entrer la description"
            rows="3"
            max-rows="6"
            required
          ></b-form-textarea>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Prix(en euros):"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="text"
            min="0"
            step="any"
            v-model="form.price"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Poids (en grammes):"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="number"
            min="0"
            step="any"
            v-model="form.weight"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-checkbox
          id="checkbox-1"
          v-model="form.with_size"
          name="checkbox-1"
          class="my-2"
          :unchecked-value="false"
        >
          Avec variant + taille ?
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-2"
          v-model="in_promotion"
          name="checkbox-2"
          class="my-2"
          :unchecked-value="false"
        >
          En promotion?
        </b-form-checkbox>
        <b-form-group
          v-if="!!in_promotion"
          id="input-group-1"
          label="Prix promotionnel(en euros):"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="text"
            step="any"
            min="0"
            v-model="form.promo_price"
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
import ImageUpload from '../../../components/widget/ImageUpload.vue'
import { Category } from '../../../models/category'
import { PaginatedList } from '../../../models/pagination'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
const form = ref({
  label: '',
  categories: [],
  description: '',
  qte_stock: '100',
  weight: 500,
  principal_image: '',
  price: '',
  promo_price: '',
  with_size: false,
  is_active: true
})
const in_promotion = ref(false)
const categories = ref([])
const show = ref(true)
const uploadComponent = ref()
onMounted(() => {
  useFetch('/api/category/').then((categoryList: PaginatedList<Category>) => {
    categories.value = categoryList.results.map((category) => {
      return {
        value: category.id,
        text:
          category.label +
          (category.parent ? '(' + category.parent.label + ')' : '')
      } as never
    })
  })
})
const onImageSelect = (payload: any) => {
  form.value.principal_image = payload.image
}
const onSubmit = (event: any) => {
  event.preventDefault()
  let formData = new FormData()
  let config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  formData.append('is_active', 'True')
  formData.append('label', form.value.label)
  formData.append('weight', form.value.weight)
  formData.append('categories', form.value.categories)
  formData.append('description', form.value.description)
  formData.append('qte_stock', form.value.qte_stock)
  formData.append('with_size', form.value.with_size ? 'True' : 'False')
  formData.append('size', '')
  formData.append('principal_image', form.value.principal_image)
  formData.append('price', form.value.price)
  formData.append('promo_price', form.value.promo_price)
  $fetch('/api/product/', {
    method: 'POST',
    body: formData,
    ...config
  }).then((res: any) => {
      //@ts-ignore
      this.$bvToast.toast('Produit ajouté avec succès', {
        title: 'Succès',
        variant: 'success'
      })
      clearForm()
      navigateTo('/admin/products/' + res.id + '/editVariant')
    })
    .catch(function (error) {
      //@ts-ignore
      this.$bvToast.toast("Erreur d'ajout du produit.", {
        title: 'Erreur !',
        variant: 'error'
      })
      // handle error
      console.log(error)
    })
}
const onReset = (event: any) => {
  event.preventDefault()
  clearForm()
}
clearForm() {
  // Reset our form values
  form.value.label = ''
  form.value.category = ''
  form.value.description = ''
  form.value.qte_stock = ''
  form.value.price = ''
  form.value.promo_price = ''
  uploadComponent.clear()
}
</script>
