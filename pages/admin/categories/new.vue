<template>
  <div>
    <b-card header="Ajouter une catégorie">
      <b-form @submit="onSubmit" @reset="onReset">
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
import { Category } from "../../../models/category";

export default Vue.extend({
  name: "AdminAddCategoriePage",
  layout: "admin",
  middleware: ["auth"],
  data() {
    return {
      form: {
        label: "",
        parent: "",
      },
      categories: [],
      show: true,
    };
  },
  created: function () {
    this.$axios.$get("/api/category/").then((categories: Category[]) => {
      this.categories = categories.map((category) => {
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
    onSubmit(event: any) {
      event.preventDefault();
      this.$axios
        .$post("/api/category/", { ...this.form, is_active: true })
        .then((res: any) => {
          alert(JSON.stringify(res));
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
    },
  },
});
</script>