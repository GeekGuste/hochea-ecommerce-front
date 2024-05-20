<template>
  <div>
    <Navbar />
    <div class="m-5">
      <b-row>
        <b-col class="mb-5" md="4" lg="3" sm="5">
          <b-list-group>
            <b-list-group-item to="/admin/">Accueil</b-list-group-item>
            <b-list-group-item to="/admin/categories/"
              >Catégories</b-list-group-item
            >
            <b-list-group-item to="/admin/products/"
              >Produits</b-list-group-item
            >
            <b-list-group-item to="/admin/delivery/zone/"
              >Zone de livraison</b-list-group-item
            >
            <b-list-group-item to="/admin/order/">Commandes</b-list-group-item>
            <b-list-group-item to="/admin/variants/"
              >Types de variants</b-list-group-item
            >
          </b-list-group>
        </b-col>
        <b-col md="8" lg="9" sm="7">
          <div class="container">
            <slot />
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  transition: {
    name: 'page'
  }
})
</script>
