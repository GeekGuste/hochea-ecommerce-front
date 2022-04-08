<template>
  <div class="d-flex justify-content-center">
    <b-button-group>
      <b-button to="/admin">Dashboard</b-button>
      <b-dropdown right text="Catégories">
        <b-dropdown-item to="/admin/categories/new">Ajouter</b-dropdown-item>
        <b-dropdown-item to="/admin/categories">Liste</b-dropdown-item>
      </b-dropdown>
      <b-dropdown right text="Produit">
        <b-dropdown-item to="/admin/products/new">Ajouter</b-dropdown-item>
        <b-dropdown-item>Liste</b-dropdown-item>
      </b-dropdown>
    </b-button-group>
  </div>
</template>