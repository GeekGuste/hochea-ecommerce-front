<template>
  <div>
    <h2><center>Liste des produits  <NuxtLink to="/admin/products/new" class="btn btn-primary">Ajouter</NuxtLink> </center></h2>
    <b-row>
      <div
        class="card col-md-4 col-lg-3 col-sm-6 m-2 mt-2 mb-4 shadow-sm"
        v-for="product in products"
        :key="product.id"
      >
        <div class="card-img">
          <img
            style="height: 100px;"
            :src="product.principal_image"
            class="card-img-top img-fluid"
            :alt="product.label"
          />
        </div>
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h4 class="card-title mb-3">{{ product.label }}</h4>
            <div v-if="product.categories.length > 0">
              <p class="my-2">
                <span class="badge badge-primary text-capitalize p-2 m-1" v-for="category of product.categories" :key="category.id">
                  <NuxtLink class="product-category" :to="`/search?category=${category.id}`">
                    {{ category.label }}
                  </NuxtLink>
                </span>
              </p>
            </div>
            <p class="my-2">
              <span class="text-muted">Price: </span>
              <span v-if="!!product.promo_price" class="text-capitalize">
                <b
                  ><strike>{{ product.price }} €</strike></b
                >
                &nbsp;&nbsp;
                <b>{{ product.promo_price }} €</b>
              </span>
              <span v-else class="text-capitalize">
                <b>{{ product.price }} €</b>
              </span>
            </p>
          </div>
          <div class="d-inline-block mt-4">
            <NuxtLink
              :to="'/admin/products/' + product.id + '/setData'"
              class="text-decoration-none"
            >
              <button
                class="
                  btn btn-success btn-sm
                  w-100
                  d-flex
                  align-items-center
                  justify-content-center
                  text-white
                "
              >
                Modifier
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </b-row>
  </div>
</template>
<style lang="css" scoped>
.product-category{
  color: #fff;
  text-decoration: none;
}
</style>
<script lang="ts">
import Vue from "vue";
import { Category } from "../../../models/category";
import { PaginatedList } from "../../../models/pagination";
import { Product } from "../../../models/product";

export default Vue.extend({
  name: "AdminCategorieListPage",
  layout: "admin",
  data() {
    return {
      products: [],
      productList: null,
    };
  },
  created: function () {
    this.$axios
      .$get("/api/product/?is_variant=False")
      .then((productList: PaginatedList<Product>) => {
        this.products = productList.results;
        this.productList = productList;
      });
  },
});
</script>