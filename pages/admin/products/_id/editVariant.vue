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
          required
          @change="updateVariantType"
          v-model="form.variant_type"
          :options="variantTypes"
        ></b-form-select>
        <b-button
          type="button"
          v-if="!!form.variant_type"
          variant="success"
          @click="addNew()"
          >+</b-button
        >
      </b-form-group>
      <div v-if="!!newVariants.length">
        <center><u>Ajouter un variant</u></center>
        <b-form inline v-for="(variant, index) in newVariants" :key="index">
          <b-col sm="6" md="4">
            <b-input-group prepend="Valeur" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input
                class="mb-2 mr-sm-2 mb-sm-0"
                :type="type"
                v-model="variant.variant_value"
                placeholder="Valeur"
              ></b-form-input>
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-input-group prepend="Quantité" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input v-model="variant.qte_stock"></b-form-input>
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-input-group prepend="Prix" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input v-model="variant.price"></b-form-input>
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-input-group
              prepend="Prix promotionnel"
              class="mb-2 mr-sm-2 mb-sm-0"
            >
              <b-form-input v-model="variant.promo_price"></b-form-input>
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-button
              type="button"
              variant="success"
              class="mb-2 mr-sm-2 mb-sm-0"
              @click="createNewVariant(variant, index)"
              >Ajouter</b-button
            >
            <b-button
              type="button"
              variant="danger"
              class="mb-2 mr-sm-2 mb-sm-0"
              @click="removeNewVariant(index)"
              >Retirer</b-button
            >
          </b-col>
        </b-form>
      </div>
      <div v-if="!!product.variants && !!product.variants.length">
        <center><u>Modifier un variant</u></center>
        <b-form
          inline
          v-for="(variant, index) in product.variants"
          :key="index"
          class="mt-5"
        >
          <b-col sm="6" md="4">
            <b-input-group prepend="Valeur" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input
                class="mb-2 mr-sm-2 mb-sm-0"
                :type="type"
                v-model="variant.variant_value"
                placeholder="Valeur"
              ></b-form-input>
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-input-group prepend="Quantité" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input v-model="variant.qte_stock"></b-form-input>
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-input-group prepend="Prix" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input v-model="variant.price"></b-form-input>
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-input-group
              prepend="Prix promotionnel"
              class="mb-2 mr-sm-2 mb-sm-0"
            >
              <b-form-input v-model="variant.promo_price"></b-form-input>
            </b-input-group>
          </b-col>
          <b-col sm="6" md="4">
            <b-button
              type="button"
              variant="warning"
              class="mb-2 mr-sm-2 mb-sm-0"
              @click="updateVariant(variant, index)"
              >Modifier</b-button
            >
          </b-col>
        </b-form>
      </div>
      <div class="float-right">
          <NuxtLink class="btn btn-primary" :to="imageStepUrl">Chargement d'images &gt;</NuxtLink>
      </div>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Product, VariantType } from "../../../../models/product";

export default Vue.extend({
  name: "AdminEditVariantPage",
  layout: "admin",
  middleware: ["auth"],
  data() {
    return {
      product: {} as Product | null,
      variantTypes: [],
      form: {
        variant_type: null,
      },
      newVariants: [],
    };
  },
  created: function () {
    this.$axios
      .$get(`/api/product/${this.$route.params.id}/`)
      .then((product: Product) => {
        this.product = product;
        this.$axios
          .$get("/api/varianttype/")
          .then((variantTypes: VariantType[]) => {
            this.variantTypes.push({
              value: null,
              text: "Pas de variant",
            } as never);
            variantTypes.forEach((variantType: VariantType) => {
              if (product?.variant_type?.id == variantType.id)
                this.variantTypes.push({
                  value: variantType.id,
                  text: variantType.label,
                  selected: "selected",
                } as never);
              else
                this.variantTypes.push({
                  value: variantType.id,
                  text: variantType.label,
                } as never);
            });
            this.form.variant_type = product?.variant_type?.id as never;
          });
      });
  },
  computed: {
    type() {
      if (this.form.variant_type == 1) {
        //couleur
        return "color";
      }  else {
        return "text";
      }
    },
    imageStepUrl(){
        return `/admin/products/${this.$route.params.id}/loadImages/`;
    }
  },
  methods: {
    addNew() {
      this.newVariants.push({
        variant_value: "",
        label: this.product?.label,
        variant_type: this.product?.variant_type?.id,
        qte_stock: this.product?.qte_stock,
        description: this.product?.description,
        parent: this.product?.id,
        price: this.product?.price,
        promo_price: this.product?.promo_price,
        category: this.product?.category.id,
        is_variant: true,
        is_active: true,
      } as never);
    },
    updateVariantType() {
      this.$axios.$patch(`/api/product/${this.$route.params.id}/`, {
        variant_type: this.form.variant_type,
      });
    },
    createNewVariant(variant: any, index: number) {
      //Add variant in database
      this.$axios.$post("/api/product/", variant).then((product: Product) => {
        this.removeNewVariant(index);
        if (!!this.product && !this.product?.variants) {
          this.product.variants = [];
        }
        this.product?.variants.push(product);
      });
    },
    removeNewVariant(index: number) {
      this.newVariants.splice(index, 1);
    },
    updateVariant(variant: any, index: number) {
      //Add variant in database
      this.$axios
        .$put(`/api/product/${variant.id}/`, variant)
        .then((product: Product) => {
          alert("Modification réussie");
          if (!!this.product?.variants.length)
            this.product.variants[index] = product;
        });
    },
  },
});
</script>