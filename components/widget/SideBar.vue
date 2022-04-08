<template>
  <div class="card" v-if="!tree.parent">
    <div class="card-header"  :id="'headingOne'+tree.id">
      <NuxtLink :to="generateUrl(tree)">{{ tree.label }}</NuxtLink>
      <button v-if="!!tree.enfants.length && tree.enfants.length>0" class="btn btn-link" data-toggle="collapse" :data-target="'#collapse'+tree.id" aria-expanded="false" :aria-controls="'collapse'+tree.id">&gt;</button>
    </div>
    <div :id="'collapse'+tree.id" v-if="!!tree.enfants.length && tree.enfants.length>0" class="collapse" :aria-labelledby="'headingOne'+tree.id" role="tabpanel">
      <div class="card-body">
        <!-- second collapse -->
        <div role="tablist">
          <SideBar v-for="t in tree.enfants" :key="t.id" :tree="t" />
        </div>
        <!-- second collapse end -->
      </div>
    </div>
  </div>
  <div class="card-text" v-else><NuxtLink :to="generateUrl(tree)">{{ tree.label }}</NuxtLink></div>
</template>

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