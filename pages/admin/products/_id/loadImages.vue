<template>
  <div>
    <b-card header="variants du produit">
      <div class="d-flex flex-wrap">
        <div>
          <label>{{ product.label }}</label>
          <ImageUploadAddButton :id="(product.id + '')" @onSelect="onSelect" />
        </div>
        <div class="d-flex flex-column m-4" v-for="(image, index) in product.images" :key="image.id">
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
              <label v-if="product.variant_type.label == 'Couleur'">{{
                product.variant_type.label + ": "
              }}
              <div width="30px" height="20px" :style="'display: inline-block; width: 50px; height: 18px; background-color: '+ variant.variant_value"></div>
              </label>
              <label v-else>
                {{ product.variant_type.label + " = " + variant.variant_value }}
              </label>
              <ImageUploadAddButton :id="(variant.id + '')" @onSelect="onSelect" />
            </div>
            <div class="d-flex flex-column m-4" v-for="(image, index) in variant.images" :key="image.id">
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
<script lang="ts">
import Vue from "vue";
import { Image, Product, VariantType } from "../../../../models/product";
import ImageUploadAddButton from "../../../../components/widget/ImageUploadAddButton.vue";

export default Vue.extend({
  components: { ImageUploadAddButton },
  name: "AdminEditVariantPage",
  layout: "admin",
  middleware: ["auth"],
  data() {
    return {
      product: {} as Product | null,
    };
  },
  created: function () {
    this.$axios
      .$get(`/api/product/${this.$route.params.id}/`)
      .then((product: Product) => {
        this.product = product;
      });
  },
  methods: {
    onSelect(payload: any) {
      let formData = new FormData();
      let config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      formData.append("photo", payload.image);
      formData.append("product", payload.id);
      console.log(payload);
      this.$axios
        .$post(`/api/image/`, formData, config)
        .then((image: Image) => {
          if (this.product.id == payload.id) {
            this.product.images.push(image);
          } else {
            this.product.variants.forEach((variant: any) => {
              if (variant.id == payload.id) {
                variant.images.push(image);
                throw "Break";
              }
            });
          }
        });
    },
    deleteImage(imageId: number, index: number, id: number) {
      this.$axios.$delete(`/api/image/${imageId}/`).then(() => {
        if (this.product.id == id) {
          this.product.images.splice(index, 1);
        } else {
          this.product.variants.forEach((variant: any) => {
            if (variant.id == id) {
              variant.images.splice(index, 1);
              throw "Break";
            }
          });
        }
      });
    },
  },
  computed: {
    variantStepUrl() {
      return `/admin/products/${this.$route.params.id}/editVariant/`;
    },
  },
});
</script>