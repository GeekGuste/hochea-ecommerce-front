<template>
  <div v-if="!tree.parent" class="m-auto">
    <hr/>
    <NuxtLink :to="generateUrl(tree)">{{ tree.label }}</NuxtLink>
    <button v-if="!!tree.enfants.length && tree.enfants.length>0" class="btn" v-show="!isOpen" @click="isOpen = !isOpen">+</button>
    <button v-if="!!tree.enfants.length && tree.enfants.length>0" class="btn" v-show="isOpen" @click="isOpen = !isOpen">-</button>
    <div class="ml-3" v-if="!!tree.enfants.length && tree.enfants.length>0" v-show="isOpen">
      <SideBar v-for="t in tree.enfants" :key="t.id" :tree="t" />
    </div>
  </div>
</template>

<style>
a{
  color: #000;
}
</style>

<script lang="ts">
import Vue from "vue";
import { CategoryTree } from "../../models/category";
export default Vue.extend({
  name: "SideBar",
  props: {
    tree: {
      type: Object,
    },
  },
  data(){
    return {
      isOpen: false,
    }
  },
  methods: {
    generateId(categoryTree: CategoryTree) {
      return `accordion-${categoryTree.id}`;
    },
    generateUrl(categoryTree: CategoryTree) {
      return `/search?category=${categoryTree.id}`;
    },
  },
});
</script>