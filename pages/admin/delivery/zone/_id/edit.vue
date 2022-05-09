<template>
  <div>
    <b-card header="Ajouter une zone de livraison">
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Zone:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="deliveryZoneInfo.zone"
            placeholder="Entrer la zone/pays"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Frais de livraison:" label-for="input-3">
          <b-form-input
            id="input-1"
            v-model="deliveryZoneInfo.delivery_charges"
            placeholder="Entrer les frais de livraison"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="success">Modifier</b-button>
        <b-button type="reset" variant="danger">Annuler</b-button>
      </b-form>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { DeliveryZoneInfo } from "../../../../../models/delivery";

export default Vue.extend({
  name: "AdminEditdeliveryZoneInfoPage",
  layout: "admin",
  middleware: ["auth"],
  data() {
    return {
      deliveryZoneInfo: {
        id: 0,
        zone: "",
        delivery_charges: "",
      },
    };
  },
  created: function () {
    this.$axios
      .$get(`/api/deliveryZoneInfo/${this.$route.params.id}/`)
      .then((deliveryZoneInfo: DeliveryZoneInfo) => {
        this.deliveryZoneInfo = { ...deliveryZoneInfo };
        console.log(this.deliveryZoneInfo);
      });
  },
  methods: {
    onSubmit(event: any) {
      event.preventDefault();
      this.$axios
        .$put(`/api/deliveryZoneInfo/${this.$route.params.id}/`, { ...this.deliveryZoneInfo })
        .then((res: any) => {
          //@ts-ignore
         this.$bvToast.toast("Zone/pays de livraison modifié avec succès", {
            title: "Succès",
            variant: "success",
          });
        });
    }
  },
});
</script>