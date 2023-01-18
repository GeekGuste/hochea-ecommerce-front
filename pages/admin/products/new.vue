<template>
  <div class="col-md-6 offset-md-3">
    <b-card header="Ajouter un produit">
      <b-form @submit="onSubmit" @reset="onReset">
        <ImageUpload ref="uploadComponent" :imageUrl="null" @onSelect="onImageSelect" />
        <b-form-group id="input-group-2" label="catégorie:" label-for="input-3">
          <b-form-select
            id="input-3"
            required
            multiple
            v-model="form.categories"
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
            v-model="form.label"
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
            v-model="form.description"
            placeholder="Entrer la description"
            rows="3"
            max-rows="6"
            required
          ></b-form-textarea>
        </b-form-group>
        <b-form-group id="input-group-1" label="Prix:" label-for="input-1">
          <b-form-input
            id="input-1"
            type="text"
            min="0"
            step="any"
            v-model="form.price"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1" label="Poids (en grammes):" label-for="input-1">
          <b-form-input
            id="input-1"
            type="number"
            min="0"
            step="any"
            v-model="form.weight"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-checkbox
          id="checkbox-1"
          v-model="in_promotion"
          name="checkbox-1"
          value="true"
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
            type="text"
            step="any"
            min="0"
            v-model="form.promo_price"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Enregistrer</b-button>
        <b-button type="reset" variant="danger">Annuler</b-button>
      </b-form>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import ImageUpload from "../../../components/widget/ImageUpload.vue";
import { Category } from "../../../models/category";
import { PaginatedList } from "../../../models/pagination";

export default Vue.extend({
  components: { ImageUpload },
  name: "AdminAddCategoriePage",
  layout: "admin",
  middleware: ["auth"],
  data() {
    return {
      form: {
        label: "",
        categories: [],
        description: "",
        qte_stock: "100",
        weight: 500,
        principal_image: "",
        price: "",
        promo_price: "",
        is_active: true,
      },
      in_promotion: false,
      categories: [],
      show: true,
    };
  },
  mounted: function () {
    this.$axios.$get("/api/category/").then((categoryList: PaginatedList<Category>) => {
        this.categories = categoryList.results.map((category) => {
        return { value: category.id, text: (category.label + (category.parent?"(" + category.parent.label + ")": "")) } as never;
      });
    });
  },
  methods: {
    onImageSelect(payload: any) {
      this.form.principal_image = payload.image;
    },
    onSubmit(event: any) {
      event.preventDefault();
      let formData = new FormData();
      let config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      formData.append("is_active", "True");
      formData.append("label", this.form.label);
      formData.append("weight", this.form.weight      );
      //console.log(this.form.categories)
      formData.append("categories", this.form.categories);
      formData.append("description", this.form.description);
      formData.append("qte_stock", this.form.qte_stock);
      formData.append("principal_image", this.form.principal_image);
      formData.append("price", this.form.price);
      formData.append("promo_price", this.form.promo_price);
      this.$axios.$post("/api/product/", formData, config).then((res: any) => {
        //@ts-ignore
        this.$bvToast.toast("Produit ajouté avec succès", {
            title: "Succès",
            variant: "success",
        });
        this.clearForm();
        this.$router.push('/admin/products/'+res.id+'/editVariant');
      })
      .catch(function(error) {
          //@ts-ignore
          this.$bvToast.toast("Erreur d'ajout du produit.", {
              title: "Erreur !",
              variant: "error",
          });
          // handle error
          console.log(error);
       });
    },
    onReset(event: any) {
      event.preventDefault();
      this.clearForm();
    },
    clearForm() {
      // Reset our form values
      this.form.label = "";
      this.form.category = "";
      this.form.description = "";
      this.form.qte_stock = "";
      this.form.price = "";
      this.form.promo_price = "";
      this.$refs.uploadComponent.clear();
    }
  },
});
</script>