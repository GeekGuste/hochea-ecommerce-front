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
            <td>#{{ order.id }}</td>
            <td>
              {{ order.total }}
            </td>
            <td>
              <span v-if="order.is_paid" class="badge badge-success">Payé</span>
              <span v-else class="badge badge-danger">Paiment échoué</span>
            </td>
            <td>
              <nuxt-link
                :to="'/profile/order/' + order.id + '/details'"
                class="btn btn-primary"
                >Détails</nuxt-link
              >
            </td>
          </tr>
        </tbody>
      </table>
      <b-row
        class="d-flex justify-content-center"
        v-if="!!orderList.next || !!orderList.previous"
      >
        <div>
          <b-pagination-nav
            :link-gen="linkGen"
            v-model="currentPage"
            v-bind:number-of-pages="orderList.count / 12"
          ></b-pagination-nav>
        </div>
      </b-row>
    </div>
    <div v-else class="alert alert-danger">Aucune commande enregistrée</div>
  </div>
</template>
<script setup lang="ts">
import { PaginatedList } from '../../../models/pagination'
import { Order } from '../../../models/product'

definePageMeta({
  layout: 'profile',
  transition: {
    name: 'UserOrderPage'
  },
  middleware: ['auth']
})
const orderList = ref(null)
const id = ref(null)
const currentPage = ref(1)

const route = useRoute()
const router = useRouter()

onMounted(() => {
  currentPage.value = route.query.page || 1
  loadOrders()
})
watch(
  () => route.query,
  () => {
    currentPage.value = route.query.page || 1
    loadOrders()
  }
)
const loadOrders = () => {
  useFetch(`/api/order/?page=${currentPage.value}`).then(
    (loadedOrderList: PaginatedList<Order>) => {
      orderList.value = loadedOrderList
    }
  )
}
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('fr-FR')
}
const linkGen = (pageNum: Number) => {
  const query = route.query
  query.page = pageNum
  return router.history.current.path + '?' + toQueryString(query)
}
const toQueryString = (obj: Object) => {
  const str = []
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  return str.join('&')
}
</script>
