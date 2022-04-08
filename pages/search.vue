<template>
  <div class="filtre-container">
    <b-row>
      <b-col md="3">
        <side-bar v-for="tree in categoryTree" :key="tree.id" v-bind:tree="tree" />
      </b-col>
      <b-col md="9">
        <ProductsList />
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
export default Vue.extend({
  components: { SideBar, Slider },
  name: "IndexPage",
  data(){
    return {
      categoryTree: []
    }
  }, 
  created: function () {
    this.$axios
      .$get("/api/category/tree/")
      .then((categoryTree: CategoryTree[]) => {
        this.categoryTree = categoryTree;
      });
  }
});
</script>
