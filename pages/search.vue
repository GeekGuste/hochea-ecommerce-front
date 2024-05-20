<template>
  <div class="filtre-container">
    <b-row>
      <b-col md="3">
        <SideBar
          v-for="category in categoryTree"
          :key="category.id"
          :tree="category"
        />
      </b-col>
      <b-col md="9">
        <div v-if="!!category" class="m-auto">
          <div class="w-100">
            <center>
              <u>Produits de la catégorie {{ category.label }}</u>
            </center>
            <br />
          </div>
          <div class="d-flex flex-wrap justify-content-center">
            <b-col
              class="text-center"
              style="cursor: pointer"
              md="2"
              sm="3"
              v-for="cat in category.enfants"
              :key="cat.id"
              :tree="cat"
              @click="goToCategoryPage(cat.id)"
            >
              <img
                :src="cat.image"
                style="max-height: 150px"
                width="100%"
                alt=""
              />
              <br />
              <span>{{ cat.label }}</span>
            </b-col>
          </div>
        </div>
        <ProductsList :loading="loading" :productsList="productsList" />
      </b-col>
    </b-row>
  </div>
</template>

<script setup lang="ts">
import SideBar from '../components/widget/SideBar.vue'
import Slider from '../components/widget/Slider.vue'
import { Category, CategoryTree } from '../models/category'
import { PaginatedList } from '../models/pagination'
import { Product } from '../models/product'

const productsList = ref([])
const categoryTree = ref([])
const category = ref(null)
const loading = ref(true)
const route = useRoute()

onMounted(() => {
  this.$axios
    .$get('/api/category/tree/')
    .then((categoryTree: CategoryTree[]) => {
      this.categoryTree = categoryTree
    })
  categoryTree.value = await useFetch()
  loadProducts()
  getCategory()
})
watch(
  () => route.query,
  () => {
    loadProducts()
    getCategory()
  }
)
const loadProducts = () => {
  loading.value = true
  this.$axios
    .$get('/api/product/', {
      params: { is_variant: 'False', ...this.$route.query }
    })
    .then((productsList: PaginatedList<Product>) => {
      productsList.value = productsList
      loading.value = false
    })
}
const getCategory = () => {
  if (!!this.$route.query?.category) {
    this.$axios
      .$get(`/api/category/${this.$route.query.category}/`)
      .then((category: Category) => {
        category.value = category
      })
  } else {
    category.value = null
  }
}
const goToCategoryPage = (id: number) => {
  navigateTo({ path: '/search/', query: { category: id } })
}
</script>

<style>
.filtre-container {
  margin-top: 20px;
}
</style>
