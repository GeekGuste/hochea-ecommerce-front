<template>
  <div>
    <center>
      <h3><u>Commandes</u></h3>
    </center>
    <div v-if="!!orderList">
      <table class="table table-stripped">
        <thead>
          <tr>
            <th scope="col">Date commande</th>
            <th scope="col">Numéro</th>
            <th scope="col">Total</th>
            <th scope="col">Statut</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>
              {{ formatDate(order.order_date) }}
            </td>
            <td>#{{ order.id }}</td>
            <td>
              {{ order.total }}
            </td>
            <td>
              <span v-if="order.is_paid" class="badge badge-success">Payé</span>
              <span v-else class="badge badge-danger">Paiment échoué</span>
              <span v-if="order.is_delivered" class="badge badge-success"
                >Livré</span
              >
              <span v-else class="badge badge-danger">Non livré</span>
            </td>
            <td>
              <nuxt-link
                :to="'/admin/order/' + order.id + '/details'"
                class="btn btn-primary"
                >Détails</nuxt-link
              >
              <button
                v-if="!order.is_delivered"
                @click="confirmDelivery(order.id)"
                class="btn btn-success"
              >
                Confirmer la livraison
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <b-row
        class="d-flex justify-content-center"
        v-if="!!orderList.next || !!orderList.previous"
      >
        <div>
          <b-pagination-nav
            :link-gen="linkGen"
            v-model="currentPage"
            v-bind:number-of-pages="orderList.count / 12"
          ></b-pagination-nav>
        </div>
      </b-row>
    </div>
    <div v-else class="alert alert-danger">Aucune commande enregistrée</div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { PaginatedList } from "../../../models/pagination";
import { Order } from "../../../models/product";

export default Vue.extend({
  name: "UserOrderPage",
  layout: "admin",
  middleware: ["auth"],
  data() {
    return {
      orderList: null,
      id: null,
      currentPage: 1,
    };
  },
  mounted: function () {
    this.currentPage = this.$route.query.page || 1;
    this.loadOrders();
  },
  watch: {
    "$route.query"() {
      this.currentPage = this.$route.query.page || 1;
      console.log(this.$route);
    },
  },
  computed: {
    orders() {
      return this.orderList?.results;
    },
  },
  methods: {
    formatDate(dateString: string) {
      return new Date(dateString).toLocaleString("fr-FR");
    },
    linkGen(pageNum: Number) {
      let query = this.$route.query;
      query.page = pageNum;
      return (
        this.$router.history.current.path + "?" + this.toQueryString(query)
      );
    },
    loadOrders() {
      this.$axios
        .$get("/api/order/all/?page=" + this.currentPage)
        .then((orderList: PaginatedList<Order>) => {
          this.orderList = orderList;
        });
    },
    confirmDelivery(id: number) {
      if (confirm("Êtes vous sûr de déclarer la livraison?")) {
        this.$axios
          .$patch(`/api/order/${id}/`, {
            is_delivered: true,
          })
          .then((order) => {
            //@ts-ignore
            this.$bvToast.toast("Commande enregistrée comme livrée", {
              title: "Succès",
              variant: "success",
            });
            this.loadOrders();
          });
      }
    },
    toQueryString(obj: Object) {
      let str = [];
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      }
      return str.join("&");
    },
  },
});
</script>