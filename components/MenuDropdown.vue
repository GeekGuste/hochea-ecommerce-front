<template>
  <b-dropdown-item class="menu-item"><NuxtLink :to="generateCategoryUrl(tree)">{{ tree.label }}</NuxtLink></b-dropdown-item>
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
defineProps<{ tree: any }>()

function generateCategoryUrl(tree: any) {
  return `/search?category=${tree.id}`
}
</script>