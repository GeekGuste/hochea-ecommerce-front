<template>
  <div>
    <b-card header="Ajouter une catégorie">
      <b-form @submit="onSubmit">
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
import { PaginatedList } from "../../../../models/pagination";

export default Vue.extend({
  name: "AdminAddCategoriePage",
  layout: "admin",
  middleware: ["auth"],
  data() {
    return {
      categories: [],
      category: {
          label: "",
          parent: null,
      },
      show: true,
    };
  },
  created: function () {
    this.$axios
      .$get(`/api/category/${this.$route.params.id}/`)
      .then((category: Category) => {
        this.category = {label: category.label, parent: category.parent?.id};
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
    onSubmit(event: any) {
      event.preventDefault();
      this.$axios
        .$patch(`/api/category/${this.$route.params.id}/`, this.category)
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