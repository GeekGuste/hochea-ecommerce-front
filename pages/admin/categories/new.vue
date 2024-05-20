<template>
  <div>
    <b-card header="Ajouter une catégorie">
      <b-form @submit="onSubmit" @reset="onReset">
        <ImageUpload
          ref="uploadComponent"
          :imageUrl="null"
          @onSelect="onImageSelect"
        />
        <b-form-group
          id="input-group-1"
          label="Nom de la catégorie:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.label"
            placeholder="Entrer le nom"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Parent:" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="form.parent"
            :options="categories"
          ></b-form-select>
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
  transition: {
    name: 'AdminAddCategoriePage'
  },
  middleware: ['auth']
})

const form = ref({
  label: '',
  image: '',
  parent: ''
})
const categories = ref([])
const show = ref(true)
const uploadComponent = ref(null)

onMounted(() => {
  useFetch('/api/category/').then((categoryList: PaginatedList<Category>) => {
    categories.value = categoryList.results
  })
})
const onImageSelect = (payload: any) => {
  form.value.image = payload.image
}

const clearForm = () => {
  // Reset our form values
  form.value.label = ''
  form.value.parent = ''
  form.value.image = ''
  uploadComponent.clear()
}
const onSubmit = (event: any) => {
  event.preventDefault()
  let formData = new FormData()
  let config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  formData.append('is_active', 'true')
  formData.append('label', form.value.label)
  formData.append('image', form.value.image)
  formData.append('parent_id', form.value.parent)
  $fetch('/api/category/', {
    method: 'POST',
    body: formData,
    ...config
  }).then((res: any) => {
    //@ts-ignore
    this.$bvToast.toast(
      'Catégorie ' + form.value.label + ' ajoutée avec succès!',
      {
        title: 'Succès',
        variant: 'success'
      }
    )
    clearForm()
  })
}
const onReset = (event: any) => {
  event.preventDefault()
  clearForm()
}
</script>
