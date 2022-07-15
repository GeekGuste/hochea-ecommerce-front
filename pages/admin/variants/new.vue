<template>
  <div>
  <div>
    <NuxtLink class="btn btn-warning text-white" to="/admin/variants/">Liste</NuxtLink>
    <hr>
  </div>
    <b-card header="Ajouter un type de variant">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Libellé:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.label"
            placeholder="Entrer le libelle"
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

export default Vue.extend({
  name: "AdminAddVariantType",
  layout: "admin",
  middleware: ["auth"],
  data() {
    return {
      form: {
        label: "",
      },
    };
  },
  methods: {
    onSubmit(event: any) {
      event.preventDefault();
      this.$axios
        .$post("/api/varianttype/", { ...this.form })
        .then((res: any) => {
          //@ts-ignore
         this.$bvToast.toast("Type de variant enregistré avec succès", {
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
    },
  },
});
</script>