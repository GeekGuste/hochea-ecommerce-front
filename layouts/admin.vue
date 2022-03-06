<template>
  <div>
    <Navbar />
    <div class="m-5">
      <AdminMenuBar />
    </div>
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AdminLayout",
});
</script>
