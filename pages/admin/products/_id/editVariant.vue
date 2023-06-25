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
<script lang="ts">
import Vue from 'vue'
import { Category } from '../../../../models/category'
import { PaginatedList } from '../../../../models/pagination'
import { Product, VariantType } from '../../../../models/product'

export default Vue.extend({
  name: 'AdminEditVariantPage',
  layout: 'admin',
  middleware: ['auth'],
  data() {
    return {
      product: {} as Product | null,
      variantTypes: [],
      form: {
        variant_type: null
      },
      newVariants: []
    }
  },
  computed: {
    type() {
      if (this.form.variant_type == 1) {
        // couleur
        return 'color'
      } else {
        return 'text'
      }
    },
    imageStepUrl() {
      return `/admin/products/${this.$route.params.id}/loadImages/`
    },
    dataStepUrl() {
      return `/admin/products/${this.$route.params.id}/setData/`
    }
  },
  created() {
    this.$axios
      .$get(`/api/product/${this.$route.params.id}/`)
      .then((product: Product) => {
        this.product = product
        this.$axios
          .$get('/api/varianttype/')
          .then((variantTypesList: PaginatedList<VariantType>) => {
            this.variantTypes.push({
              value: null,
              text: 'Pas de variant'
            } as never)
            variantTypesList.results.forEach((variantType: VariantType) => {
              if (product?.variant_type?.id == variantType.id) {
                this.variantTypes.push({
                  value: variantType.id,
                  text: variantType.label,
                  selected: 'selected'
                } as never)
              } else {
                this.variantTypes.push({
                  value: variantType.id,
                  text: variantType.label
                } as never)
              }
            })
            this.form.variant_type = product?.variant_type?.id as never
          })
      })
  },
  methods: {
    addNew() {
      this.newVariants.push({
        variant_value: '',
        label: this.product?.label,
        variant_type: this.product?.variant_type?.id,
        qte_stock: this.product?.qte_stock,
        weight: this.product?.weight,
        description: this.product?.description,
        parent: this.product?.id,
        price: this.product?.price,
        with_size: this.product?.with_size,
        size: this.product?.size,
        promo_price: this.product?.promo_price,
        categories: this.product?.categories
          .map((category: Category) => {
            return category.id
          })
          .join(','),
        is_variant: true,
        is_active: true
      } as never)
    },
    updateVariantType() {
      if (
        this.form.variant_type != this.product?.variant_type?.id ||
        this.form.variant_type == null
      ) {
        this.$axios.$patch(`/api/product/${this.$route.params.id}/`, {
          variant_type: this.form.variant_type
        })
      }
    },
    createNewVariant(variant: any, index: number) {
      // Add variant in database
      this.$axios.$post('/api/product/', variant).then((product: Product) => {
        this.removeNewVariant(index)
        if (!!this.product && !this.product?.variants) {
          this.product.variants = []
        }
        this.product?.variants.push(product)
      })
    },
    removeNewVariant(index: number) {
      this.newVariants.splice(index, 1)
    },
    updateVariant(variant: any, index: number) {
      // Add variant in database
      this.$axios
        .$patch(`/api/product/${variant.id}/`, {
          variant_value: variant.variant_value,
          qte_stock: variant.qte_stock,
          price: variant.price,
          promo_price: variant.promo_price,
          weight: variant.weight,
          size: variant.size,
          with_size: variant.with_size
        })
        .then((product: Product) => {
          // @ts-ignore
          this.$bvToast.toast('Modification réussie', {
            title: 'Succès',
            variant: 'success'
          })
          if (this.product?.variants.length) {
            this.product.variants[index] = product
          }
        })
    }
  }
})
</script>
