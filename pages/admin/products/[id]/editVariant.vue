<template>
  <div>
    <b-card header="variants du produit">
      <b-form-group
        id="input-group-2"
        label="Type de variant:"
        label-for="input-3"
      >
        <b-form-select
          id="input-3"
          v-model="form.variant_type"
          required
          :options="variantTypes"
          @change="updateVariantType"
        />
        <b-button
          v-if="!!form.variant_type"
          type="button"
          variant="success"
          @click="addNew()"
        >
          +
        </b-button>
      </b-form-group>
      <div v-if="!!newVariants.length">
        <center><u>Ajouter un variant</u></center>
        <b-form v-for="(variant, index) in newVariants" :key="index" inline>
          <b-col sm="6" md="4">
            <b-input-group prepend="Valeur" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input
                v-model="variant.variant_value"
                class="mb-2 mr-sm-2 mb-sm-0"
                :type="type"
                placeholder="Valeur"
              />
            </b-input-group>
          </b-col>
          <b-col v-if="variant.with_size" sm="6" md="4">
            <b-input-group prepend="Taille" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input
                v-model="variant.size"
                class="mb-2 mr-sm-2 mb-sm-0"
                :type="type"
                placeholder="Taille"
              />
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-input-group prepend="Quantité" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input v-model="variant.qte_stock" />
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-input-group prepend="Prix" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input v-model="variant.price" />
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-input-group
              prepend="Prix promotionnel"
              class="mb-2 mr-sm-2 mb-sm-0"
            >
              <b-form-input v-model="variant.promo_price" />
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-input-group
              prepend="Poids (en grammes)"
              class="mb-2 mr-sm-2 mb-sm-0"
            >
              <b-form-input v-model="variant.weight" />
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-button
              type="button"
              variant="success"
              class="mb-2 mr-sm-2 mb-sm-0"
              @click="createNewVariant(variant, index)"
            >
              Ajouter
            </b-button>
            <b-button
              type="button"
              variant="danger"
              class="mb-2 mr-sm-2 mb-sm-0"
              @click="removeNewVariant(index)"
            >
              Retirer
            </b-button>
          </b-col>
        </b-form>
      </div>
      <div v-if="!!product.variants && !!product.variants.length">
        <center><u>Modifier un variant</u></center>
        <b-form
          v-for="(variant, index) in product.variants"
          :key="index"
          inline
          class="mt-5"
        >
          <b-col sm="6" md="4">
            <b-input-group prepend="Valeur" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input
                v-model="variant.variant_value"
                class="mb-2 mr-sm-2 mb-sm-0"
                :type="type"
                placeholder="Valeur"
              />
            </b-input-group>
          </b-col>
          <b-col v-if="variant.with_size" sm="6" md="4">
            <b-input-group prepend="Taille" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input
                v-model="variant.size"
                class="mb-2 mr-sm-2 mb-sm-0"
                :type="type"
                placeholder="Taille"
              />
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-input-group prepend="Quantité" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input v-model="variant.qte_stock" />
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-input-group prepend="Prix" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input v-model="variant.price" />
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-input-group
              prepend="Prix promotionnel"
              class="mb-2 mr-sm-2 mb-sm-0"
            >
              <b-form-input v-model="variant.promo_price" />
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-input-group
              prepend="Poids (en grammes)"
              class="mb-2 mr-sm-2 mb-sm-0"
            >
              <b-form-input v-model="variant.weight" />
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-button
              type="button"
              variant="warning"
              class="mb-2 mr-sm-2 mb-sm-0"
              @click="updateVariant(variant, index)"
            >
              Modifier
            </b-button>
          </b-col>
        </b-form>
      </div>
      <hr />
      <div class="mb-5 text-center">
        <NuxtLink class="btn btn-info" :to="dataStepUrl">
          &lt; Informations
        </NuxtLink>
        <NuxtLink class="btn btn-primary" :to="imageStepUrl">
          Chargement d'images &gt;
        </NuxtLink>
      </div>
    </b-card>
  </div>
</template>
<script setup lang="ts">
import { Category } from '../../../../models/category'
import { PaginatedList } from '../../../../models/pagination'
import { Product, VariantType } from '../../../../models/product'

definePageMeta({
  layout: 'admin',
  transition: {
    name: 'AdminEditVariantPage'
  },
  middleware: ['auth']
})
const route = useRoute()
const product = ref({} as Product | null)
const variantTypes = ref([])
const form = ref({
  variant_type: null
})
const newVariants = ref([])
const type = computed(() => {
  if (form.value.variant_type == 1) {
    // couleur
    return 'color'
  } else {
    return 'text'
  }
})
const imageStepUrl = computed(() => {
  return `/admin/products/${route.params.id}/loadImages/`
})
const dataStepUrl = computed(() => {
  return `/admin/products/${this.$route.params.id}/setData/`
})
onMounted(() => {
  useFetch(`/api/product/${route.params.id}/`)
    .then((categoryList: PaginatedList<Category>) => {
      categories.value = categoryList.results
    })
    .then((myProduct: Product) => {
      product.value = myProduct
      useFetch('/api/varianttype/').then(
        (variantTypesList: PaginatedList<VariantType>) => {
          variantTypes.value.push({
            value: null,
            text: 'Pas de variant'
          } as never)
          variantTypesList.results.forEach((variantType: VariantType) => {
            if (myProduct?.variant_type?.id == variantType.id) {
              variantTypes.value.push({
                value: variantType.id,
                text: variantType.label,
                selected: 'selected'
              } as never)
            } else {
              variantTypes.value.push({
                value: variantType.id,
                text: variantType.label
              } as never)
            }
          })
          form.value.variant_type = myProduct?.variant_type?.id as never
        }
      )
    })
})
const addNew = () => {
  newVariants.value.push({
    variant_value: '',
    label: product.value?.label,
    variant_type: product.value?.variant_type?.id,
    qte_stock: product.value?.qte_stock,
    weight: product.value?.weight,
    description: product.value?.description,
    parent: product.value?.id,
    price: product.value?.price,
    with_size: product.value?.with_size,
    size: product.value?.size,
    promo_price: product.value?.promo_price,
    categories: product.value?.categories
      .map((category: Category) => {
        return category.id
      })
      .join(','),
    is_variant: true,
    is_active: true
  } as never)
}
const updateVariantType = () => {
  if (
    form.value.variant_type != product.value?.variant_type?.id ||
    form.value.variant_type == null
  ) {
    $fetch(`/api/product/${route.params.id}/`, {
      method: 'PATCH',
      body: {
        variant_type: form.value.variant_type
      }
    })
  }
}
const createNewVariant = (variant: any, index: number) => {
  // Add variant in database
  $fetch('/api/product/', {
    method: 'POST',
    body: variant
  }).then((product: Product) => {
    removeNewVariant(index)
    if (!!product.value && !product.value?.variants) {
      product.value.variants = []
    }
    product.value?.variants.push(product)
  })
}
const removeNewVariant = (index: number) => {
  newVariants.value.splice(index, 1)
}
const updateVariant = (variant: any, index: number) => {
  // Add variant in database
  $fetch(`/api/product/${variant.id}/`, {
    method: 'PATCH',
    body: {
      variant_value: variant.variant_value,
      qte_stock: variant.qte_stock,
      price: variant.price,
      promo_price: variant.promo_price,
      weight: variant.weight,
      size: variant.size,
      with_size: variant.with_size
    }
  }).then((variantProduct: Product) => {
    // @ts-ignore
    this.$bvToast.toast('Modification réussie', {
      title: 'Succès',
      variant: 'success'
    })
    if (product.value?.variants.length) {
      product.value.variants[index] = variantProduct
    }
  })
}
</script>
