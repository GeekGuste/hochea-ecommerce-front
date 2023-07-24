<template>
  <div class="filtre-container">
    <b-row class="d-flex justify-content-center mb-5">
      <slider />
    </b-row>
    <b-row>
      <b-col md="8" offset-md="2" lg="6" offset-lg="3">
        <b-row class="d-flex justify-content-center">
          <b-col v-for="cat in categoryTree" :key="cat.id" md="3" sm="4">
            <nuxt-link :to="generateCategoryUrl(cat)">
              <b-img :src="cat.image" fluid :alt="cat.label"></b-img>
              <center>
                <b>{{ cat.label }}</b>
              </center>
            </nuxt-link>
            <br />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <h2>
          <center>Nos derniers produits</center>
        </h2>
        <ProductsList :loading="loading" :products-list="productsList" />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SideBar from '../components/widget/SideBar.vue'
import Slider from '../components/widget/Slider.vue'
import { CategoryTree } from '../models/category'
import { PaginatedList } from '../models/pagination'
import { Product } from '../models/product'
export default Vue.extend({
  components: { SideBar, Slider },
  name: 'IndexPage',
  data() {
    return {
      categoryTree: [],
      productsList: [],
      loading: true
    }
  },
  async mounted() {
    this.$axios
      .$get('/api/category/tree/')
      .then((categoryTree: CategoryTree[]) => {
        this.categoryTree = categoryTree
      })
    // On prend les derniers produits enregistrés pour la page d'accueil
    this.$axios
      .$get('/api/product/last/')
      .then((productsList: PaginatedList<Product>) => {
        this.productsList = productsList
        this.loading = false
      })
  },
  methods: {
    generateCategoryUrl(tree: any) {
      return `/search?category=${tree.id}`
    }
  }
})
</script>

<style>
.filtre-container {
  margin-top: 20px;
}
</style>
