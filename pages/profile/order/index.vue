<template>
  <div>
    <center>
      <h3><u>Mes commandes</u></h3>
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
                <tr v-for="order in orderList.results" :key="order.id">
                    <td>
                        {{ formatDate(order.order_date) }}
                    </td>
                    <td>
                        #{{ order.id }}
                    </td>
                    <td>
                        {{ order.total }}
                    </td>
                    <td>
                        <span v-if="order.is_paid" class="badge badge-success">Payé</span>
                        <span v-else class="badge badge-danger">Paiment échoué</span>
                    </td>
                    <td>
                        <nuxt-link :to="'/profile/order/'+order.id+'/details'" class="btn btn-primary">Détails</nuxt-link>
                    </td>
                </tr>
            </tbody>
            </table>
            <b-row class="d-flex justify-content-center" v-if="!!orderList.next || !!orderList.previous">
                <div>
                    <b-pagination-nav :link-gen="linkGen" v-model="currentPage" v-bind:number-of-pages="orderList.count/12" use-router></b-pagination-nav>
                </div>
            </b-row>
    </div>
    <div v-else class="alert alert-danger">
        Aucune commande enregistrée
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { PaginatedList } from "../../../models/pagination";
import { Order } from "../../../models/product";
export default Vue.extend({
  name: "UserOrderPage",
  layout: "profile",
  middleware: ["auth"],
  data() {
    return {
      orderList: null,
      id: null,
      currentPage: 1
    };
  },
  mounted: function () {
    this.$axios.$get("/api/order/").then((orderList: PaginatedList<Order>) => {
      this.orderList = orderList;
    });
    this.currentPage = this.$route.query.page || 1;
  },
  watch: {
    "$route.query" (){
      this.currentPage = this.$route.query.page || 1;
    }
  },
  methods: {
    formatDate(dateString: string){
        return new Date(dateString).toLocaleString("fr-FR");
    },
    linkGen(pageNum: Number){
      let query = this.$route.query;
      query.page = pageNum;
      return this.$router.history.current.path + "?" + this.toQueryString(query);
    },
    toQueryString(obj: Object){
      let str = [];
      for (var p in obj){
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      }
      return str.join("&");
    }
  },
});
</script>