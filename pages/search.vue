<template>
  <div class="filtre-container">
      <h2><center>Boutique</center></h2>
    <b-row>
      <b-col md="3">
        <SideBar v-for="category in categoryTree"
          :key="category.id"
          :tree="category"/>
      </b-col>
      <b-col md="9">
        <ProductsList :productsList="productsList" />
      </b-col>
    </b-row>
  </div>
</template>

<style>
  .filtre-container{
    margin-top: 20px;
  }
</style>

<script lang="ts">
import Vue from 'vue'
import SideBar from '../components/widget/SideBar.vue';
import Slider from '../components/widget/Slider.vue';
import { CategoryTree } from '../models/category';
import { PaginatedList } from '../models/pagination';
import { Product } from '../models/product';
export default Vue.extend({
  components: { SideBar, Slider },
  name: "IndexPage",
  data(){
    return {
      productsList: [],
      categoryTree: [],
    }
  }, 
  async mounted() {
    this.$axios
      .$get("/api/category/tree/")
      .then((categoryTree: CategoryTree[]) => {
        this.categoryTree = categoryTree;
      });
    this.loadProducts();
  },
  watch: {
    "$route.query" (){
      this.loadProducts();
    }
  },
  methods: {
    loadProducts(){
      this.$axios
      .$get("/api/product/", {
        params: { is_variant: "False", ...this.$route.query },
      })
      .then((productsList: PaginatedList<Product>) => {
        this.productsList = productsList;
      });
    }
  }
});
</script>
