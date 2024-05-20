<template>
  <div v-if="!props.tree.parent" class="m-auto">
    <hr />
    <NuxtLink :to="generateUrl(tree)">{{ tree.label }}</NuxtLink>
    <button
      v-if="!!props.tree.enfants.length && props.tree.enfants.length > 0"
      v-show="!isOpen"
      class="btn"
      @click="isOpen = !isOpen"
    >
      +
    </button>
    <button
      v-if="!!props.tree.enfants.length && props.tree.enfants.length > 0"
      v-show="isOpen"
      class="btn"
      @click="isOpen = !isOpen"
    >
      -
    </button>
    <div
      v-if="!!props.tree.enfants.length && props.tree.enfants.length > 0"
      v-show="isOpen"
      class="ml-3"
    >
      <SideBar v-for="t in props.tree.enfants" :key="t.id" :tree="t" />
    </div>
  </div>
</template>

<style>
a {
  color: #000;
}
</style>

<script setup lang="ts">
import { CategoryTree } from '../../models/category'
const props = defineProps({
  tree: {
    type: Object
  }
})
const isOpen = ref(false)
const generateId = (categoryTree: CategoryTree) =>
  `accordion-${categoryTree.id}`
const generateUrl = (categoryTree: CategoryTree) =>
  `/search?category=${categoryTree.id}`
</script>
