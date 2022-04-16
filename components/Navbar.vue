<template>
  <div>
    <b-navbar toggleable="md">
      <b-navbar-brand to="/">
        <img src="~/assets/LOGO_ALPHA.png" width="50" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="m-auto">
          <b-nav-form class="my-0">
            <b-input-group>
              <b-form-input placeholder="Rechercher"></b-form-input>
              <b-input-group-append>
                <b-button class="text-white" variant="warning"
                  >Recherche</b-button
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
        <MenuDropdown
          v-for="category in categoryTree"
          :key="category.id"
          :tree="category"
        />
      </b-nav>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { CategoryTree } from "../models/category";
export default Vue.extend({
  name: "Navbar",
  data() {
    return {
      categoryTree: [],
    };
  },
  created: function () {
    this.$axios
      .$get("/api/category/tree/")
      .then((categoryTree: CategoryTree[]) => {
        this.categoryTree = categoryTree;
      });
  },
  methods: {
    async logout() {
      this.$auth.logout().then(() => {
        window.location.reload();
      });
    },
  },
});
</script>