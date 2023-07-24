<template>
  <div>
    <b-row class="d-flex justify-content-center">
      <template v-if="!!loading">
        <div class="card m-2 mb-4 shadow-sm" v-for="i in 6" :key="i">
          <div>
            <b-skeleton-img
              class="card-img-top img-fluid product-image"
            ></b-skeleton-img>
          </div>
          <div class="card-body">
            <b-skeleton></b-skeleton>
            <b-skeleton></b-skeleton>
          </div>
        </div>
      </template>
      <template v-else-if="!!products && products.length > 0">
        <div
          class="card m-2 mb-4 shadow-sm"
          v-for="product in products"
          :key="product.id"
        >
          <div class="card-img">
            <NuxtLink
              :to="'/product/' + product.id"
              class="text-decoration-none"
            >
              <img
                :src="product.principal_image"
                class="card-img-top img-fluid product-image"
                :alt="product.label"
              />
            </NuxtLink>
          </div>
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h4 class="card-title mb-3">{{ product.label }}</h4>
              <div v-if="product.categories.length > 0">
                <p class="my-2">
                  <span
                    class="badge badge-primary text-capitalize p-2 m-1"
                    v-for="category of product.categories"
                    :key="category.id"
                  >
                    <NuxtLink
                      class="product-category"
                      :to="`/search?category=${category.id}`"
                    >
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
                :to="'/product/' + product.id"
                class="text-decoration-none"
              >
                <button
                  class="btn btn-warning btn-sm w-100 d-flex align-items-center justify-content-center text-white"
                >
                  Détails
                  <i class="fas fa-angle-double-right mx-1"></i>
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="alert alert-danger">
          <center>Aucun produit ne correspond à votre recherche</center>
        </div>
      </template>
    </b-row>
    <b-row
      class="d-flex justify-content-center"
      v-if="!!productsList.next || !!productsList.previous"
    >
      <div>
        <b-pagination-nav
          :link-gen="linkGen"
          v-model="currentPage"
          v-bind:number-of-pages="numberOfPages"
        ></b-pagination-nav>
      </div>
    </b-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { PaginatedList } from '../models/pagination'
import { Product } from '../models/product'
export default Vue.extend({
  name: 'ProductsList',
  props: {
    productsList: null,
    loading: null
  },
  data() {
    return {
      //products: [],
      currentPage: 1
    }
  },
  mounted() {
    this.currentPage = this.$route.query.page || 1
  },
  watch: {
    '$route.query'() {
      this.currentPage = this.$route.query.page || 1
    }
  },
  computed: {
    products() {
      return this.productsList?.results
    },
    numberOfPages() {
      return Math.ceil(this.productsList?.count / 12)
    }
  },
  methods: {
    productUrl(product: Product) {
      return `/product/${product.id}`
    },
    linkGen(pageNum: Number) {
      let query = this.$route.query
      query.page = pageNum
      return this.$router.history.current.path + '?' + this.toQueryString(query)
    },
    toQueryString(obj: Object) {
      let str = []
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
        }
      }
      return str.join('&')
    }
  }
})
</script>
<style lang="css" scoped>
.card {
  width: 21.25rem;
}
.card-img {
  height: 22.5rem;
  width: 100%;
}
img {
  height: 100%;
  width: 100%;
  transform: scale(0.75);
  object-fit: contain;
}
.product-category {
  color: #fff;
  text-decoration: none;
}
</style>
