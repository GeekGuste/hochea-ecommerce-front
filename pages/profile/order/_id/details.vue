<template>
  <div>
    <center>
      <h3><u>Détail de votre commande</u></h3>
    </center>
    <div v-if="!!order">
        <b-row>
            <b-col sm="6">Numéro: #{{ order.id }}</b-col>
            <b-col sm="6">Date commande: {{ formatDate(order.order_date) }}</b-col>
        </b-row>
        <b-row>
            <b-col sm="6">Total: {{ order.total }} €</b-col>
            <b-col sm="6">
                Statut: 
                <span v-if="order.is_paid" class="badge badge-success">Payé</span>
                <span v-else class="badge badge-danger">Paiment échoué</span>
                <span v-if="order.is_delivered" class="badge badge-success">Livré</span>
                <span v-else class="badge badge-danger">Non livré</span>
            </b-col>
        </b-row>
        <center><u>Adresse de livraison</u></center>
        <b-row>
            <b-col sm="6">Nom: {{ order.last_name}}</b-col>
            <b-col sm="6">Prénom: {{ order.first_name }}</b-col>
        </b-row>
        <b-row>
            <b-col sm="6">Email: {{ order.email }}</b-col>
            <b-col sm="6">Numéro de téléphone: {{ order.phone_number }}</b-col>
        </b-row>
        <b-row>
            <b-col sm="6">Adresse: {{ order.address }}</b-col>
            <b-col sm="6">Pays: {{ order.country }}</b-col>
        </b-row>
        <b-row>
            <b-col sm="6">Ville: {{ order.town }}</b-col>
            <b-col sm="6">Code postal: {{ order.postal_code }}</b-col>
        </b-row>
        <b-row>
            <b-col sm="6"></b-col>
            <b-col sm="6"></b-col>
        </b-row>
        <center><u>Produits</u></center>
        <b-row v-for="orderProduct in order.orderProducts" :key="orderProduct.id">
            <b-col>
                <b-img
                    class="rounded fluid"
                    style="max-height: 100px"
                    :src="orderProduct.image_url"
                    fluid
                    :alt="orderProduct.label"
                    ></b-img>
            </b-col>
            <b-col>
                {{ orderProduct.label }}
            </b-col>
            <b-col>
                {{ orderProduct.price }} € x {{ orderProduct.quantity }}
            </b-col>
        </b-row>
    </div>
    <div v-else class="alert alert-danger">
        Cette commande n'existe pas/plus
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Order } from "../../../../models/product";
export default Vue.extend({
  name: "UserOrderPage",
  layout: "profile",
  middleware: ["auth"],
  data() {
    return {
      order: null,
      id: null,
    };
  },
  mounted: function () {
    this.$axios.$get(`/api/order/${this.$route.params.id}/`)
        .then((order: Order) => {
            this.order = order;
        });
  },
  methods: {
    formatDate(dateString: string){
        return new Date(dateString).toLocaleString("fr-FR");
    },
  },
});
</script>