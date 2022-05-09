<template>
  <div>
    <b-row class="product-container ml-1">
      <b-col class="d-flex flex-column image-container" sm="12" md="5">
        <b-img
          v-if="!!product"
          :src="selectedImageSrc"
          class="principal"
          fluid-grow
          :alt="product.label"
        ></b-img>
        <div class="d-flex flex-wrap" v-if="!!images.length">
          <b-img
            class="m-1"
            v-for="image in images"
            style="cursor: pointer"
            :key="image.id"
            width="50"
            height="50"
            :src="image.photo"
            fluid
            :alt="selectedProduct.label"
            @click="selectedImageSrc = image.photo"
          ></b-img>
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
          <div v-if="product.variant_type.label == 'Couleur'">
            <div>Sélectionner une couleur</div>
            <div
              v-for="variant in product.variants"
              :key="variant.id"
              @click="selectVariant(variant)"
              class="color-div"
              :class="{ isSelected: (variant.id == selectedProduct.id)}"
              :style="
                'display: inline-block; width: 20px; height:20px; border-radius: 10px; margin: 0 5px; background: ' +
                variant.variant_value
              "
            ></div>
          </div>
          <div v-else>
            <select class="form-control" @change="selectVariantOption">
              <option value="" selected disabled>Sélectionner {{ product.variant_type.label }}</option>
              <option
                v-for="variant in product.variants"
                :key="variant.id"
                :value="variant.id"
              >
                {{ variant.variant_value }}
              </option>
            </select>
          </div>
        </div>
        <p>
          {{ selectedProduct.description }}
        </p>
        <div>
          <b-button type="submit" variant="success" :disabled="(!selectedProduct.is_variant && !!selectedProduct.variant_type)" @click="addProduct(selectedProduct)">Ajouter au panier</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<style>
.isSelected{
  outline: dashed red;
}
.product-container {
  margin-top: 40px;
}
.principal {
  max-height: 500px;
  min-height: 360px;
}
.price-container {
  font-size: 2em;
}
.price {
  color: #b12704;
}
.color-div{
    cursor: pointer;
}
.color-div:hover {
  box-shadow: 2px 2px 6px 4px black;
}
</style>
<script lang="ts">
import Vue from "vue";
import { Product, CartItem, VariantType, Image } from "../../models/product";
import { mapActions } from 'vuex';

export default Vue.extend({
  name: "ProductDetailPage",
  data() {
    return {
      product: {} as Product | null,
      selectedProduct: {} as Product | null,
      selectedImageSrc: "",
      images: [],
    };
  },
  created: function () {
    this.$axios
      .$get(`/api/product/${this.$route.params.id}/`)
      .then((product: Product) => {
        this.product = product;
        this.selectedProduct = product;
        this.selectedImageSrc = product.principal_image;
        this.images = product.images;
        console.log(this.selectedProduct);
      });
  },
  computed: {
    type() {
      if (this.product.variant_type.id == 1) {
        //couleur
        return "color";
      } else {
        return "text";
      }
    },
  },
  methods: {
    ...mapActions({
      addProductToCart : 'cart/addProduct'
    }),
    addProduct(product: Product){
      let cartItem = {id: product.id, label: product.label, quantity: 1, price: product.promo_price?product.promo_price:product.price, image: this.selectedImageSrc, qte_stock: product.qte_stock, variant_value: product.variant_value, variant_type: this.product?.variant_type?.label} as CartItem;
      this.addProductToCart(cartItem);
      //@ts-ignore
      this.$bvToast.toast("Le produit " + product.label + " a été ajouté au panier avec succès", {
        title: "Succès",
        variant: "success",
      });
    },
    selectVariantOption(event: any){
      console.log(event.target.value);
      let variant = this.product.variants.find((variant: Product) => variant.id == event.target.value);
      console.log(variant);
      this.selectVariant(variant);
    },
    selectVariant(variant: Product) {
      this.selectedImageSrc =
        (variant.images.length > 0
          ? variant.images[0].photo
          : this.product.principal_image) as string;
      this.images =
        variant.images.length > 0 ? variant.images : this.product.images;
      this.selectedProduct = variant;
        console.log(this.selectedProduct);
    },
  },
});
</script>