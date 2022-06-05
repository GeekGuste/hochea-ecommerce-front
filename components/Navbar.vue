<template>
  <div>
    <b-navbar toggleable="sm">
      <b-navbar-brand to="/">
        <img src="~/assets/LOGO_ALPHA.png" width="100px" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="m-auto">
          <b-nav-form class="my-0">
            <b-input-group>
              <b-form-input v-model="searchText" @keydown.enter="search" placeholder="Rechercher ici"></b-form-input>
              <b-input-group-append @click="search">
                <b-button class="text-white" variant="warning"
                  ><b-icon icon="search"></b-icon></b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-nav-form>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav>
          <!--b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown-->
          <b-nav-item to="/cart"><span class="badge badge-primary">{{cartNumberOfProducts}}</span> <b-icon icon="cart"></b-icon></b-nav-item>
          <b-nav-item-dropdown text="Compte" right>
            <!-- Using 'button-content' slot -->
            <template v-if="this.$auth.loggedIn">
              <b-dropdown-item
                v-if="
                  this.$auth.user.role == 'ADMIN' ||
                  this.$auth.user.role == 'SUPERADMIN'
                "
                to="/admin/">Administration</b-dropdown-item>
              <b-dropdown-item to="/profile/">Mes informations</b-dropdown-item>
              <b-dropdown-item @click="logout()">Déconnexion</b-dropdown-item>
            </template>
            <template v-else>
              <b-dropdown-item to="/login/">Se connecter</b-dropdown-item>
              <b-dropdown-item to="/register/">S'inscrire</b-dropdown-item>
            </template>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="bg-warning">
      <b-nav align="center">
        <b-dropdown-item class="text-white menu-item"><NuxtLink to="/">Accueil</NuxtLink></b-dropdown-item>
        <b-dropdown-item class="text-white menu-item"><NuxtLink to="/search">Boutique</NuxtLink></b-dropdown-item>
        <MenuDropdown
          v-for="category in categoryTree"
          :key="category.id"
          :tree="category"
        />
      </b-nav>
    </div>
  </div>
</template>
<style scoped>
  .menu-item a{
    color: #ffffff;
  }
  .menu-item:hover{
    background-color: #007bff;
    text-decoration: underline;
  }
</style>
<script lang="ts">
import Vue from "vue";
import { CategoryTree } from "../models/category";
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: "Navbar",
  data() {
    return {
      categoryTree: [],
      searchText: "",
    };
  },
  mounted: function () {
    this.$axios
      .$get("/api/category/tree/")
      .then((categoryTree: CategoryTree[]) => {
        this.categoryTree = categoryTree;
      });
      this.searchText = this.$route.query?.search_text;
  },
  computed: {
    ...mapGetters({
      cartNumberOfProducts: 'cart/cartNumberOfProducts'
    }),
  },
  methods: {
    async logout() {
      this.$auth.logout().then(() => {
        window.location.reload();
      });
    },
    search(){
      this.$router.push({path:'/search/', query: { search_text: this.searchText}});
    }
  },
});
</script>