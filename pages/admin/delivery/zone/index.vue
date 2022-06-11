<template>
  <div>
    <h2><center>Liste des zones de livraison &nbsp; <b-button to="/admin/delivery/zone/new" variant="success">Ajouter une zone +</b-button> </center></h2>
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Zone</th>
            <th scope="col">Frais de livraison(au kg)</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="deliveryZone in deliveryZones" :key="deliveryZone.id">
            <td>{{deliveryZone.id}}</td>
            <td>{{deliveryZone.zone}}</td>
            <td>{{deliveryZone.delivery_charges}} €</td>
            <td>
              <NuxtLink :to="'/admin/delivery/zone/' + deliveryZone.id + '/edit'" class="btn btn-success">Modifier</NuxtLink>
              <!--button @click="confirm('Do you want to delete this?');" class="btn btn-danger">Supprimer</button-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { DeliveryZoneInfo } from "../../../../models/delivery";
import { PaginatedList } from "../../../../models/pagination";

export default Vue.extend({
  name: "DeliveryZoneInfo",
  layout: "admin",
  data() {
    return {
      deliveryZones: [],
    };
  },
  created: function () {
    this.$axios
      .$get("/api/deliveryZoneInfo/")
      .then((deliveryZoneList: PaginatedList<DeliveryZoneInfo>) => {
        this.deliveryZones = deliveryZoneList.results;
      });
  },
});
</script>