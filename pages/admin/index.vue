<template>
  <div class="text-center"><b>Bienvenue dans le back office</b></div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})
</script>
