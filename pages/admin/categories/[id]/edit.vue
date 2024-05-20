<template>
  <div>
    <b-card header="Modifier une catégorie">
      <b-form @submit="onSubmit">
        <ImageUpload
          ref="uploadComponent"
          :imageUrl="imageUrl"
          @onSelect="onImageSelect"
        />
        <b-form-group
          id="input-group-1"
          label="Nom de la catégorie:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="category.label"
            placeholder="Entrer le nom"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Parent:" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="category.parent"
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
import { Category } from '../../../../models/category'
import ImageUpload from '../../../../components/widget/ImageUpload.vue'
import { PaginatedList } from '../../../../models/pagination'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const categories = ref([])
const categorie = ref({
  id: '',
  label: '',
  image: null,
  parent: null
})

const show = ref(true)
const imageUrl = ref('')
const image = ref(null)

const route = useRoute()

onMounted(() => {
  useFetch(`/api/category/${route.params.id}/`).then((category: Category) => {
    category.value = {
      label: category.label,
      parent: category.parent?.id,
      image: category.image,
      id: category.id
    }
    imageUrl.value = category.image
    useFetch('/api/category/').then((categoryList: PaginatedList<Category>) => {
      categories.value.push({
        value: '',
        text: 'Aucun',
        selected: 'selected'
      } as never)
      categories.value = categoryList.results.map((categ: Category) => {
        if (!!category.value.parent && category.value.parent.id == categ.id) {
          return {
            value: categ.id,
            text: categ.label,
            selected: 'selected'
          } as never
        } else {
          return { value: categ.id, text: categ.label } as never
        }
      })
    })
  })
})
const onImageSelect = (payload: any) => {
  image.value = payload.image
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
  formData.append('label', category.value.label)
  if (!!image.value) {
    formData.append('image', image.value)
  }
  if (!!category.value.parent) {
    formData.append('parent_id', category.value.parent)
  }
  $fetch(`/api/category/${route.params.id}/`, {
    method: 'PATCH',
    body: formData,
    ...config
  }).then((res: any) => {
    //@ts-ignore
    this.$bvToast.toast('Catégorie modifiée avec succès', {
      title: 'succès',
      variant: 'success'
    })
  })
}
</script>
