<template>
  <div class="filtre-container">
    <b-row class="d-flex justify-content-center mb-5">
      <slider />
    </b-row>
    <b-row>
      <b-col sm="12">
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
        console.log(this.productsList);
      });
  },
});
</script>
