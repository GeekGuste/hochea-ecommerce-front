<template>
  <b-dropdown-item class="menu-item"><NuxtLink @click="window.reload()" :prefetch="false" :to="generateCategoryUrl(tree)">{{ tree.label }}</NuxtLink></b-dropdown-item>
</template>
<style scoped>
  .menu-item a{
    color: #ffffff;
  }
  .menu-item:hover{
    background-color: #007bff;
    text-decoration: underline;
  }
</style>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    tree: {},
  },
  name: "MenuDropdown",
  methods: {
    generateCategoryUrl(tree: any){
      return `/search?category_id=${tree.id}`;
    }
  }
});
</script>