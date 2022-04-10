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
            :alt="product.label"
            @click="selectedImageSrc = image.photo"
          ></b-img>
        </div>
      </b-col>
      <b-col sm="12" md="7">
        <h1>{{ product.label }}</h1>
        <p class="price-container">
          <b>Prix: &nbsp;</b>
          <span v-if="!!product.promo_price" class="price">
            <b
              ><strike>{{ product.price }} €</strike></b
            >
            &nbsp;&nbsp;
            <b>{{ product.promo_price }} €</b>
          </span>
        </p>
        <div v-if="!!product.variants && product.variants.length > 0">
          <div v-if="product.variant_type.id == 1">
            <div
              v-for="variant in product.variants"
              :key="variant.id"
              @click="selectVariant(variant)"
              class="color-div"
              :style="
                'display: inline-block; width: 20px; height:20px; border-radius: 10px; margin: 0 5px; background: ' +
                variant.variant_value
              "
            ></div>
          </div>
          <div v-else>
            <select class="form-control">
              <option value=""></option>
              <option
                v-for="variant in product.variants"
                @click="selectVariant(variant)"
                :key="variant.id"
                :value="variant.id"
              >
                {{ variant.variant_value }}
              </option>
            </select>
          </div>
        </div>
        <p>
          {{ product.description }}
        </p>
        <div>
          <b-button type="submit" variant="success">Ajouter au panier</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<style>
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
import { Product, VariantType, Image } from "../../models/product";

export default Vue.extend({
  name: "ProductDetailPage",
  data() {
    return {
      product: {} as Product | null,
      selectedImageSrc: "",
      images: [],
    };
  },
  created: function () {
    this.$axios
      .$get(`/api/product/${this.$route.params.id}/`)
      .then((product: Product) => {
        this.product = product;
        this.selectedImageSrc = product.principal_image;
        this.images = product.images;
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
    selectVariant(variant: Product) {
      this.selectedImageSrc =
        (variant.images.length > 0
          ? variant.images[0]
          : this.product.principal_image) as string;
      this.images =
        variant.images.length > 0 ? variant.images : this.product.images;
    },
  },
});
</script>