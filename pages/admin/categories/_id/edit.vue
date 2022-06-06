<template>
  <div>
    <b-card header="Modifier une catégorie">
      <b-form @submit="onSubmit">
        <ImageUpload ref="uploadComponent" :imageUrl="imageUrl" @onSelect="onImageSelect" />
        <b-form-group
          id="input-group-1"
          label="Nom de la catégorie:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="category.label"
            placeholder="Entrer le nom"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Parent:" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="category.parent"
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
import { Category } from "../../../../models/category";
import ImageUpload from "../../../../components/widget/ImageUpload.vue";
import { PaginatedList } from "../../../../models/pagination";

export default Vue.extend({
  components: { ImageUpload },
  name: "AdminAddCategoriePage",
  layout: "admin",
  middleware: ["auth"],
  data() {
    return {
      categories: [],
      category: {
          id: "",
          label: "",
          image: null,
          parent: null,
      },
      show: true,
      imageUrl: "",
      image: null,
    };
  },
  mounted: function () {
    this.$axios
      .$get(`/api/category/${this.$route.params.id}/`)
      .then((category: Category) => {
        this.category = {label: category.label, parent: category.parent?.id, image: category.image, id: category.id};
        this.imageUrl = category.image;
        this.$axios
          .$get("/api/category/")
          .then((categoryList: PaginatedList<Category>) => {
            this.categories.push({
              value: "",
              text: "Aucun",
              selected: "selected",
            } as never);
            this.categories = categoryList.results.map((category: Category) => {
              if (!!this.category.parent && this.category.parent.id == category.id){
                  //alert("parent = " + this.category.parent.label);
                  return {
                    value: category.id,
                    text: category.label,
                    selected: "selected",
                  } as never;
              }
              else { return { value: category.id, text: category.label } as never};
            });
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
      formData.append("label", this.category.label);
      if(!!this.image){
        formData.append("image", this.image);
      }
      if(!!this.category.parent){
        formData.append("parent_id", this.category.parent);
      }
      this.$axios
        .$patch(`/api/category/${this.$route.params.id}/`, formData, config)
        .then((res: any) => {
          //@ts-ignore
          this.$bvToast.toast("Catégorie modifiée avec succès", {
            title: "succès",
            variant: "success",
          });
        });
    },
  },
});
</script>