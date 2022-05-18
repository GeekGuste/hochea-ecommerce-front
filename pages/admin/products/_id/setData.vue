<template>
  <div class="col-md-6 offset-md-3">
    <b-card header="Modifier un produit">
      <b-form @submit="onSubmit">
        <ImageUpload :imageUrl="product.principal_image" @onSelect="onImageSelect" />
        <b-form-group id="input-group-2" label="catégorie:" label-for="input-3">
          <b-form-select
            id="input-3"
            required
            v-model="categorie_id"
            :options="categories"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Nom du produit:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="product.label"
            placeholder="Entrer le nom"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Description du produit:"
          label-for="input-1"
        >
          <b-form-textarea
            id="input-1"
            v-model="product.description"
            placeholder="Entrer la description"
            rows="3"
            max-rows="6"
            required
          ></b-form-textarea>
        </b-form-group>
        <b-form-group id="input-group-1" label="Prix:" label-for="input-1">
          <b-form-input
            id="input-1"
            type="number"
            min="0"
            step="any"
            v-model="product.price"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-checkbox
          id="checkbox-1"
          v-model="in_promotion"
          value="in_promotion"
          name="checkbox-1"
          unchecked-value="false"
        >
          En promotion?
        </b-form-checkbox>
        <b-form-group
          v-if="!!in_promotion"
          id="input-group-1"
          label="Prix promotionnel:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="number"
            step="any"
            min="0"
            v-model="product.promo_price"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Modifier</b-button>
        <NuxtLink :to="variantStepUrl" class="btn btn-primary">
          Variants &gt;</NuxtLink>
      </b-form>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Product } from "../../../../models/product";
import ImageUpload from "../../../..//components/widget/ImageUpload.vue";
import { Category } from "../../../../models/category";
import { PaginatedList } from "../../../../models/pagination";

export default Vue.extend({
  components: { ImageUpload },
  name: "AdminAddCategoriePage",
  layout: "admin",
  middleware: ["auth"],
  data() {
    return {
      product: {} as Product,
      in_promotion: false,
      categories: [],
      show: true,
      categorie_id: null,
      image: null,
    };
  },
  created: function () {
    this.$axios
      .$get(`/api/product/${this.$route.params.id}/`)
      .then((product: Product) => {
        this.product = product;
        this.categorie_id = product.category.id;
        //check for promotion
        this.in_promotion = (this.product.promo_price > 0);
      });
    this.$axios.$get("/api/category/").then((categoryList: PaginatedList<Category>) => {
        this.categories = categoryList.results.map((category) => {
          if(category.id == this.product.category.id){
            return { value: category.id, text: category.label, selected: "selected" } as never;
          }
          else{
            return { value: category.id, text: category.label } as never;            
          }
      });
    });
  },
  methods: {
    onImageSelect(payload: any) {
      this.image = payload.image;
    },
    onSubmit(event: any) {
      event.preventDefault();
      let formData = new FormData();
      let config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      formData.append("is_active", "true");
      formData.append("label", this.product.label);
      formData.append("category", this.categorie_id);
      formData.append("description", this.product.description);
      formData.append("qte_stock", this.product.qte_stock as any);
      if(!!this.image){
        formData.append("principal_image", this.image);
      }
      formData.append("price", this.product.price as any);
      formData.append("promo_price", this.product.promo_price as any);
      this.$axios.$patch(`/api/product/${this.$route.params.id}/`, formData, config).then((res: any) => {
        //@ts-ignore
        this.$bvToast.toast("Produit ajouté avec succès", {
            title: "Succès",
            variant: "success",
          });
        this.$router.push('/admin/products/'+res.id+'/editVariant');
      })
      .catch(function(error) {
          //show error message
          //@ts-ignore
          this.$bvToast.toast("Erreur d'ajout du produit.", {
            title: "Erreur",
            variant: "danger",
          });
       });
    }
  },
  computed: {
    variantStepUrl() {
      return `/admin/products/${this.$route.params.id}/editVariant/`;
    },
  }
});
</script>