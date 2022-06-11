<template>
  <div class="filtre-container">
    <b-row class="d-flex justify-content-center mb-5">
      <slider />
    </b-row>
    <b-row>
      <b-col md="8" offset-md="2" lg="6" offset-lg="3">
        <b-row class="d-flex justify-content-center">
          <b-col  v-for="cat in categoryTree" :key="cat.id" md="3" sm="4">
            <b-img :src="cat.image" fluid :alt="cat.label"></b-img>
            <center><b>{{ cat.label }}</b></center>
            <br>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <h2 v-if="!!productsList && !!productsList.count && productsList.count > 0"><center>Nos derniers produits</center></h2>
        <ProductsList :productsList="productsList" />
      </b-col>
    </b-row>
  </div>
</template>

<style>
.filtre-container {
  margin-top: 20px;
}
</style>

<script lang="ts">
import Vue from "vue";
import SideBar from "../components/widget/SideBar.vue";
import Slider from "../components/widget/Slider.vue";
import { CategoryTree } from "../models/category";
import { PaginatedList } from "../models/pagination";
import { Product } from "../models/product";
export default Vue.extend({
  components: { SideBar, Slider },
  name: "IndexPage",
  data() {
    return {
      categoryTree: [],
      productsList: [],
    };
  },
  async mounted() {
    this.$axios
      .$get("/api/category/tree/")
      .then((categoryTree: CategoryTree[]) => {
        this.categoryTree = categoryTree;
      });
    this.$axios
      .$get("/api/product/", {
        params: { is_variant: "False", ...this.$route.query },
      })
      .then((productsList: PaginatedList<Product>) => {
        this.productsList = productsList;
      });
  },
});
</script>
