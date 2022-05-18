<template>
  <div>
    <h2><center>Liste des catégories</center></h2>
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Libellé</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{category.id}}</td>
            <td>{{category.label}}</td>
            <td>
              <NuxtLink :to="'/admin/categories/' + category.id + '/edit'" class="btn btn-success">Modifier</NuxtLink>
              <!--button @click="confirm('Do you want to delete this?');" class="btn btn-danger">Supprimer</button-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Category } from "../../../models/category";
import { PaginatedList } from "../../../models/pagination";

export default Vue.extend({
  name: "AdminCategorieListPage",
  layout: "admin",
  data() {
    return {
      categories: [],
    };
  },
  created: function () {
    this.$axios
      .$get("/api/category/")
      .then((categoryList: PaginatedList<Category>) => {
        this.categories = categoryList.results;
      });
  },
});
</script>