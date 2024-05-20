<template>
  <b-dropdown-item class="menu-item"><NuxtLink :to="generateCategoryUrl(tree)">{{ props.tree.label }}</NuxtLink></b-dropdown-item>
</template>
<style>
  .menu-item a{
    color: #ffffff;
  }
  .menu-item:hover{
    background-color: #007bff;
  }
</style>
</style>
<script setup lang="ts">
const props = defineProps({
  tree: {
    type: Object
  }
})
const generateCategoryUrl = (tree: any) => `/search?category=${tree.id}`;
</script>