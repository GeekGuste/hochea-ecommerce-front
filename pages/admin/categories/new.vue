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
            v-model="form.name"
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

export default Vue.extend({
  name: "AdminAddCategoriePage",
  layout: "admin",
  data() {
    return {
      form: {
        name: "",
        parent: "",
      },
      categories: [
        { value: null, text: "Aucun" },
        { text: "Hommes", value: 1 },
        "Colliers",
      ],
      show: true,
    };
  },
  methods: {
    onSubmit(event: any) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event: any) {
      event.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.form.parent = "";
    },
  },
});
</script>