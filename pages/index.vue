<template>
  <div class="filtre-container">
    <b-row class="d-flex justify-content-center mb-5">
      <Slider />
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
import Slider from '../components/widget/Slider.vue'
import ProductsList from '../components/ProductsList.vue'
import { CategoryTree } from '../models/category'
import { PaginatedList } from '../models/pagination'
import { Product } from '../models/product'

const { data: categoryTree } = await useFetch<CategoryTree[]>('/api/category/tree/')
const { data: productsList, pending: loading } = await useFetch<PaginatedList<Product>>('/api/product/last/')

function generateCategoryUrl(tree: any) {
  return `/search?category=${tree.id}`
}
</script>

<style>
.filtre-container {
  margin-top: 20px;
}
</style>
