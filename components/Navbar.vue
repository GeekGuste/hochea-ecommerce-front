<template>
  <div>
    <b-navbar toggleable="sm">
      <b-navbar-brand to="/">
        <img src="~/assets/LOGO_ALPHA.png" width="100px" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="m-auto">
          <b-nav-form v-on:submit.prevent="disableForm" class="my-0">
            <b-input-group>
              <b-form-input
                v-model="searchText"
                @keydown.enter="search"
                placeholder="Rechercher ici"
              ></b-form-input>
              <b-input-group-append @click="search">
                <b-button class="text-white" variant="warning"
                  ><b-icon icon="search"></b-icon
                ></b-button>
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
          <b-nav-item to="/cart"
            ><span class="badge badge-primary">{{ cartNumberOfProducts }}</span>
            <b-icon icon="cart"></b-icon
          ></b-nav-item>
          <b-nav-item-dropdown text="Compte" right>
            <!-- Using 'button-content' slot -->
            <template v-if="$auth.loggedIn">
              <b-dropdown-item
                v-if="
                  $auth.user.role == 'ADMIN' ||
                  $auth.user.role == 'SUPERADMIN'
                "
                to="/admin/"
                >Administration</b-dropdown-item
              >
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
        <b-dropdown-item class="text-white menu-item"
          ><NuxtLink to="/">Accueil</NuxtLink></b-dropdown-item
        >
        <b-dropdown-item class="text-white menu-item"
          ><NuxtLink to="/search">Boutique</NuxtLink></b-dropdown-item
        >
        <MenuDropdown
          v-for="category in categoryTree"
          :key="category.id"
          :tree="category"
        />
        <b-dropdown-item class="text-white menu-item"
          ><NuxtLink to="/contact">Contact</NuxtLink></b-dropdown-item
        >
      </b-nav>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from '#imports'
import MenuDropdown from './MenuDropdown.vue'
import { CategoryTree } from '../models/category'

const store = useStore()
const router = useRouter()
const route = useRoute()

const categoryTree = ref<CategoryTree[]>([])
const searchText = ref('')

onMounted(async () => {
  const { data } = await useFetch<CategoryTree[]>('/api/category/tree/')
  if (data.value) categoryTree.value = data.value
  searchText.value = (route.query.search_text as string) || ''
})

const cartNumberOfProducts = computed(() =>
  store.getters['cart/cartNumberOfProducts']
)

function logout() {
  const nuxtApp = useNuxtApp()
  nuxtApp.$auth.logout().then(() => {
    window.location.reload()
  })
}

function search() {
  router.push({ path: '/search/', query: { search_text: searchText.value } })
}

function disableForm(e: Event) {
  e.preventDefault()
}
</script>
<style>
.menu-item a {
  color: #ffffff;
}
.menu-item:hover {
  background-color: #007bff;
}
</style>
