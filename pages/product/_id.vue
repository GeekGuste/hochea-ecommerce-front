<template>
  <div>
    <b-row class="product-container">
      <b-col class="d-flex flex-column image-container" sm="12" md="5">
        <b-img
          v-if="!!product"
          :src="selectedImageSrc"
          class="principal"
          fluid-grow
          :alt="product.label"
        />
        <div v-if="!!images.length" class="d-flex flex-wrap">
          <b-img
            v-for="image in images"
            :key="image.id"
            class="m-1 option-image"
            style="cursor: pointer"
            width="50"
            height="50"
            :src="image.photo"
            fluid
            :alt="selectedProduct.label"
            @click="selectedImageSrc = image.photo"
          />
        </div>
      </b-col>
      <b-col v-if="!!selectedProduct" sm="12" md="7">
        <h1>{{ selectedProduct.label }}</h1>
        <p class="price-container">
          <b>Prix: &nbsp;</b>
          <span v-if="!!selectedProduct.promo_price" class="price">
            <b
              ><strike>{{ selectedProduct.price }} €</strike></b
            >
            &nbsp;&nbsp;
            <b>{{ selectedProduct.promo_price }} €</b>
          </span>
          <span v-else>{{ selectedProduct.price }} €</span>
        </p>
        <div v-if="!!product.variants && product.variants.length > 0">
          <div v-if="!!product.with_size">
            <div class="d-flex flex-wrap">
              <div
                v-for="variantElement in withSizeVariantList"
                :key="variantElement.label"
                class="with-size-label-container"
                @click="selectVariantLabel(variantElement.label)"
              >
                <b-img
                  :class="{
                    isLabelSelected:
                      selectedVariantLabel === variantElement.label
                  }"
                  :src="variantElement.image"
                  class="with-size-image"
                  fluid
                  :alt="variantElement.label"
                />
                <span>{{ variantElement.label }}</span>
              </div>
            </div>
            <div v-if="withSizeVariantSizeList.length > 0">
              <b-form-group
                v-slot="{ ariaDescribedby }"
                label="Taille de l'article"
              >
                <b-form-radio-group
                  :key="`size-${selectedVariantLabel}`"
                  :options="withSizeVariantSizeList"
                  :aria-describedby="ariaDescribedby"
                  button-variant="outline-warning"
                  size="md"
                  name="radio-btn-outline"
                  buttons
                  @change="selectVariantSize"
                />
              </b-form-group>
            </div>
          </div>
          <div v-else-if="product.variant_type.label == 'Couleur'">
            <div>Sélectionner une couleur</div>
            <div
              v-for="variant in product.variants"
              :key="variant.id"
              class="color-div"
              :class="{ isSelected: variant.id == selectedProduct.id }"
              :style="
                'display: inline-block; width: 20px; height:20px; border-radius: 10px; margin: 0 5px; background: ' +
                variant.variant_value
              "
              @click="selectVariant(variant)"
            />
          </div>
          <div v-else />
        </div>
        <div>
          <p>
            {{ selectedProduct.description }}
          </p>
        </div>
        <div>
          <b-button
            type="submit"
            variant="success"
            :disabled="
              !selectedProduct.is_variant &&
              !!selectedProduct.variant_type &&
              (!!selectedProduct.with_size || !!selectedVariantSize)
            "
            @click="addProduct(selectedProduct)"
          >
            Ajouter au panier
          </b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import {
  Product,
  CartItem,
  VariantType,
  Image,
  WithSizeVariant,
  WithSizeVariantSize
} from '../../models/product'

export default Vue.extend({
  name: 'ProductDetailPage',
  data() {
    return {
      product: {} as Product | null,
      selectedProduct: {} as Product | null,
      selectedImageSrc: '',
      images: [],
      withSizeVariantList: [] as WithSizeVariant[],
      withSizeVariantSizeList: [] as WithSizeVariantSize[],
      isSizeSetted: false,
      selectedVariantLabel: '',
      selectedVariantSize: ''
    }
  },
  computed: {
    type() {
      if (this.product.variant_type.id === 1) {
        // couleur
        return 'color'
      } else {
        return 'text'
      }
    }
  },
  created() {
    this.$axios
      .$get(`/api/product/${this.$route.params.id}/`)
      .then((product: Product) => {
        this.product = product
        this.selectedProduct = product
        this.selectedImageSrc = product.principal_image
        this.images = product.images
        if (this.product.with_size) {
          this.product.variants.forEach((variant) => {
            if (
              !this.withSizeVariantList.find(
                (v) => v.label === variant.variant_value
              )
            ) {
              this.withSizeVariantList.push({
                label: variant.variant_value,
                image: variant.images[0].photo
              })
            }
          })
        }
        // Add principal image at top list
        this.images.unshift({ id: product.id, photo: product.principal_image })
      })
  },
  methods: {
    ...mapActions({
      addProductToCart: 'cart/addProduct'
    }),
    addProduct(product: Product) {
      const cartItem = {
        id: product.id,
        label: product.label,
        quantity: 1,
        price: product.promo_price ? product.promo_price : product.price,
        image: this.selectedImageSrc,
        qte_stock: product.qte_stock,
        variant_value: product.variant_value,
        variant_type: this.product?.variant_type?.label,
        weight: product.weight
      } as CartItem
      this.addProductToCart(cartItem)
      // @ts-ignore
      this.$bvToast.toast(
        'Le produit ' + product.label + ' a été ajouté au panier avec succès',
        {
          title: 'Succès',
          variant: 'success'
        }
      )
    },
    selectVariantLabel(label: string) {
      this.selectedVariantLabel = label
      this.selectedVariantSize = ''
      const selectedVariants = this.product.variants.filter(
        (variant: Product) => variant.variant_value === label
      )
      this.images = selectedVariants[0].images
      this.selectedImageSrc = selectedVariants[0].images[0].photo
      this.withSizeVariantSizeList = selectedVariants.map(
        (variant: Product) => {
          return {
            text: variant.size,
            value: variant.size
          }
        }
      )
    },
    selectVariantSize(checked: string) {
      this.selectedVariantSize = checked
      this.selectedProduct = this.product.variants.find(
        (variant) =>
          variant.variant_value == this.selectedVariantLabel &&
          variant.size === checked
      )
    },
    selectVariantOption(event: any) {
      const variant = this.product.variants.find(
        (variant: Product) => variant.id === event.target.value
      )
      this.selectVariant(variant)
    },
    selectVariant(variant: Product) {
      this.selectedImageSrc = (
        variant.images.length > 0
          ? variant.images[0].photo
          : this.product.principal_image
      ) as string
      this.images =
        variant.images.length > 0 ? variant.images : this.product.images
      this.selectedProduct = variant
    }
  }
})
</script>
<style>
.isSelected {
  outline: dashed #ffc107;
}
.isLabelSelected {
  outline: solid #ffc107;
}
.product-container {
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  max-width: 1200px;
}
.principal {
  max-height: 500px;
  /*min-height: 360px;*/
  max-width: 502px;
}
.option-image {
  cursor: pointer;
}
.option-image:hover {
  border: 2px solid #ffc107;
}
.price-container {
  font-size: 2em;
}
.price {
  color: #b12704;
}
.color-div {
  cursor: pointer;
}
.color-div:hover {
  box-shadow: 2px 2px 6px 4px black;
}
.with-size-label-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
}
.with-size-label-container .with-size-image {
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
</style>
