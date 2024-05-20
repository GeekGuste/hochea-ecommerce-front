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

<script setup lang="ts">
import SideBar from "../components/widget/SideBar.vue";
import Slider from "../components/widget/Slider.vue";
import { CategoryTree } from "../models/category";
import { PaginatedList } from "../models/pagination";
import { Product } from "../models/product";

definePageMeta({
  transition: {
    name: "IndexPage",
  },
});
const categoryTree = ref([]);
const productsList = ref([]);
const loading = ref(true);

onMounted(() => {
  $fetch("/api/category/tree/", {
    method: "GET",
  }).then((myCategoryTree: CategoryTree[]) => {
    categoryTree.value = myCategoryTree;
  });

  $fetch("/api/product/last/", {
    method: "GET",
  }).then((myProductsList: PaginatedList<Product>) => {
    productsList.value = myProductsList;
    loading.value = false;
  });
});

const generateCategoryUrl = (tree: any) => {
  return `/search?category=${tree.id}`;
};
</script>

<style>
.filtre-container {
  margin-top: 20px;
}
</style>
