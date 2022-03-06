<template>
  <div>
    <Navbar/>
    <div class="container-fluid">
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "IndexLayout",
});
</script>