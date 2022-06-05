<template>
  <div>
    <b-card header="Ajouter une catégorie">
      <b-form @submit="onSubmit" @reset="onReset">
        <ImageUpload ref="uploadComponent" :imageUrl="null" @onSelect="onImageSelect" />
        <b-form-group
          id="input-group-1"
          label="Nom de la catégorie:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.label"
            placeholder="Entrer le nom"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Parent:" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="form.parent"
            :options="categories"
          ></b-form-select>
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
        image: "",
        parent: "",
      },
      categories: [],
      show: true,
    };
  },
  mounted: function () {
    this.$axios.$get("/api/category/").then((categoryList: PaginatedList<Category>) => {
      this.categories = categoryList.results.map((category) => {
        return { value: category.id, text: category.label } as never;
      });
      this.categories.push({
        value: "",
        text: "Aucun",
        selected: "selected",
      } as never);
    });
  },
  methods: {
    onImageSelect(payload: any) {
      this.form.image = payload.image;
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
      formData.append("label", this.form.label);
      formData.append("image", this.form.image);
      formData.append("parent", this.form.parent);
      this.$axios
        .$post("/api/category/", formData, config)
        .then((res: any) => {
          //@ts-ignore
          this.$bvToast.toast("Catégorie " + this.form.label + " ajoutée avec succès!", {
            title: "Succès",
            variant: "success",
          });
          this.clearForm();
        });
    },
    onReset(event: any) {
      event.preventDefault();
      this.clearForm();
    },
    clearForm() {
      // Reset our form values
      this.form.label = "";
      this.form.parent = "";
      this.form.image = "";
      this.$refs.uploadComponent.clear();
    },
  },
});
</script>