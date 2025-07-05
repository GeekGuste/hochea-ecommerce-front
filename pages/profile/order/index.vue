<template>
  <div>
    <center>
      <h3><u>Mes commandes</u></h3>
    </center>
    <div v-if="!!orderList">
        <table class="table table-stripped">
            <thead>
                <tr>
                    <th scope="col">Date commande</th>
                    <th scope="col">Numéro</th>
                    <th scope="col">Total</th>
                    <th scope="col">Statut</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orderList.results" :key="order.id">
                    <td>
                        {{ formatDate(order.order_date) }}
                    </td>
                    <td>
                        #{{ order.id }}
                    </td>
                    <td>
                        {{ order.total }}
                    </td>
                    <td>
                        <span v-if="order.is_paid" class="badge badge-success">Payé</span>
                        <span v-else class="badge badge-danger">Paiment échoué</span>
                    </td>
                    <td>
                        <nuxt-link :to="'/profile/order/'+order.id+'/details'" class="btn btn-primary">Détails</nuxt-link>
                    </td>
                </tr>
            </tbody>
            </table>
            <b-row class="d-flex justify-content-center" v-if="!!orderList.next || !!orderList.previous">
                <div>
                    <b-pagination-nav :link-gen="linkGen" v-model="currentPage" v-bind:number-of-pages="orderList.count/12"></b-pagination-nav>
                </div>
            </b-row>
    </div>
    <div v-else class="alert alert-danger">
        Aucune commande enregistrée
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from '#imports'
import { PaginatedList } from '../../../models/pagination'
import { Order } from '../../../models/product'

definePageMeta({ layout: 'profile', middleware: ['auth'] })

const route = useRoute()
const router = useRouter()

const orderList = ref<PaginatedList<Order> | null>(null)
const currentPage = ref(1)

async function loadOrders() {
  const { data } = await useFetch<PaginatedList<Order>>(`/api/order/?page=${currentPage.value}`)
  if (data.value) orderList.value = data.value
}

watch(
  () => route.query.page,
  () => {
    currentPage.value = Number(route.query.page || 1)
    loadOrders()
  }
)

onMounted(() => {
  currentPage.value = Number(route.query.page || 1)
  loadOrders()
})

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('fr-FR')
}

function linkGen(pageNum: number) {
  const query = { ...route.query, page: pageNum }
  return router.currentRoute.value.path + '?' + toQueryString(query)
}

function toQueryString(obj: Record<string, any>) {
  return Object.keys(obj)
    .map(p => encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    .join('&')
}
</script>