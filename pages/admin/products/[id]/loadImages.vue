<template>
  <div>
    <b-card header="variants du produit">
      <div class="d-flex flex-wrap">
        <div>
          <label>{{ product.label }}</label>
          <ImageUploadAddButton :id="product.id + ''" @onSelect="onSelect" />
        </div>
        <div
          class="d-flex flex-column m-4"
          v-for="(image, index) in product.images"
          :key="image.id"
        >
          <img :src="image.photo" width="100px" height="100px" />
          <b-button
            variant="danger"
            @click="deleteImage(image.id, index, product.id)"
            type="button"
            >supprimer</b-button
          >
        </div>
      </div>
      <div
        class="d-flex flex-column"
        v-if="!!product.variants && !!product.variants.length"
      >
        <center><u>Images par variant</u></center>
        <div v-for="(variant, index) in product.variants" :key="index">
          <div class="d-flex flex-wrap" :id="variant.id">
            <div>
              <label v-if="product.variant_type.label == 'Couleur'"
                >{{ product.variant_type.label + ': ' }}
                <div
                  width="30px"
                  height="20px"
                  :style="
                    'display: inline-block; width: 50px; height: 18px; background-color: ' +
                    variant.variant_value
                  "
                ></div>
              </label>
              <label v-else>
                {{ product.variant_type.label + ' = ' + variant.variant_value }}
              </label>
              <ImageUploadAddButton
                :id="variant.id + ''"
                @onSelect="onSelect"
              />
            </div>
            <div
              class="d-flex flex-column m-4"
              v-for="(image, index) in variant.images"
              :key="image.id"
            >
              <img :src="image.photo" width="100px" height="100px" />
              <b-button
                variant="danger"
                @click="deleteImage(image.id, index, variant.id)"
                type="button"
                >supprimer</b-button
              >
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div class="float-left">
        <NuxtLink :to="variantStepUrl" class="btn btn-primary">
          &lt; Variants</NuxtLink
        >
      </div>
    </b-card>
  </div>
</template>
<script setup lang="ts">
import { Image, Product, VariantType } from '../../../../models/product'
import ImageUploadAddButton from '../../../../components/widget/ImageUploadAddButton.vue'

definePageMeta({
  layout: 'admin',
  transition: {
    name: 'AdminEditVariantPage'
  },
  middleware: ['auth']
})
const route = useRoute()
const product = ref({} as Product | null)
onMounted(() => {
  useFetch(`/api/product/${route.params.id}/`).then(
    (loadedProduct: Product) => {
      product.value = loadedProduct
    }
  )
})
const onSelect = (payload: any) => {
  let formData = new FormData()
  let config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  formData.append('photo', payload.image)
  formData.append('product', payload.id)
  $fetch('/api/category/', {
    method: 'POST',
    body: formData,
    ...config
  }).then((image: Image) => {
    if (product.value.id == payload.id) {
      product.value.images.push(image)
    } else {
      product.value.variants.forEach((variant: any) => {
        if (variant.id == payload.id) {
          variant.images.push(image)
          throw 'Break'
        }
      })
    }
  })
}
const deleteImage = (imageId: number, index: number, id: number) => {
  $fetch(`/api/image/${imageId}/`, {
    method: 'DELETE'
  }).then(() => {
    if (product.value.id == id) {
      product.value.images.splice(index, 1)
    } else {
      product.value.variants.forEach((variant: any) => {
        if (variant.id == id) {
          variant.images.splice(index, 1)
          throw 'Break'
        }
      })
    }
  })
}
const variantStepUrl = computed(
  () => `/admin/products/${route.params.id}/editVariant/`
)
</script>
