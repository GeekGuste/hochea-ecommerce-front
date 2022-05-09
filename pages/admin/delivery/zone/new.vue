<template>
  <div>
  <div>
    <NuxtLink class="btn btn-warning text-white" to="/admin/delivery/zone/">Liste</NuxtLink>
    <hr>
  </div>
    <b-card header="Ajouter une zone de livraison">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Zone:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.zone"
            placeholder="Entrer la zone/pays"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Frais de livraison:" label-for="input-3">
          <b-form-input
            id="input-1"
            v-model="form.delivery_charges"
            placeholder="Entrer les frais de livraison"
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
import { DeliveryZoneInfo } from "../../../../models/delivery";
import { PaginatedList } from "../../../../models/pagination";

export default Vue.extend({
  name: "AdminAddCategoriePage",
  layout: "admin",
  middleware: ["auth"],
  data() {
    return {
      form: {
        zone: "",
        delivery_charges: "",
      },
    };
  },
  methods: {
    onSubmit(event: any) {
      event.preventDefault();
      this.$axios
        .$post("/api/deliveryZoneInfo/", { ...this.form, is_active: true })
        .then((res: any) => {
          //@ts-ignore
         this.$bvToast.toast("Zone/pays de livraison enregistré avec succès", {
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
      this.form.zone = "";
      this.form.delivery_charges = "";
    },
  },
});
</script>