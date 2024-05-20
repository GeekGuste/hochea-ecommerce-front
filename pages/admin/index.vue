<template>
  <div class="text-center"><b>Bienvenue dans le back office</b></div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  transition: {
    name: 'AdminIndexPage'
  },
  middleware: ['auth']
})
</script>
