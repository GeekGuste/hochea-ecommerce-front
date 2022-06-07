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
        <div v-if="!!category" class="m-auto">
          <div class="w-100">
            <center><u>Produits de la catégorie {{ category.label }}</u></center>
            <br/>
          </div>
          <div class="d-flex flex-wrap justify-content-center">
            <b-col class="text-center" style="cursor: pointer;" md="2" sm="3" v-for="cat in category.enfants"
                :key="cat.id"
                :tree="cat"
                @click="goToCategoryPage(cat.id)">
              <img :src="cat.image" style="max-height:150px;" width="100%" alt="">
              <br/>
              <span>{{ cat.label }}</span>
            </b-col>
          </div>
        </div>
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
import { Category, CategoryTree } from '../models/category';
import { PaginatedList } from '../models/pagination';
import { Product } from '../models/product';
export default Vue.extend({
  components: { SideBar, Slider },
  name: "IndexPage",
  data(){
    return {
      productsList: [],
      categoryTree: [],
      category: null,
    }
  }, 
  async mounted() {
    this.$axios
      .$get("/api/category/tree/")
      .then((categoryTree: CategoryTree[]) => {
        this.categoryTree = categoryTree;
      });
    this.loadProducts();
    this.getCategory();
  },
  watch: {
    "$route.query" (){
      this.loadProducts();
      this.getCategory();
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
    },
    getCategory(){
      if(!!this.$route.query?.category){
        this.$axios
          .$get(`/api/category/${this.$route.query.category}/`)
          .then((category: Category) => {
            this.category = category;
          });
      }
      else{
        this.category = null;
      }
    },
    goToCategoryPage(id: number){
      this.$router.push({path:'/search/', query: { category: id}});;
    }
  }
});
</script>
