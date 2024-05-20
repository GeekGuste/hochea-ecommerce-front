<template>
  <div>
    <center>
      <h3><u>Commandes</u></h3>
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
          <tr v-for="order in orders" :key="order.id">
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
              <span v-if="order.is_delivered" class="badge badge-success"
                >Livré</span
              >
              <span v-else class="badge badge-danger">Non livré</span>
            </td>
            <td>
              <nuxt-link
                :to="'/admin/order/' + order.id + '/details'"
                class="btn btn-primary"
                >Détails</nuxt-link
              >
              <button
                v-if="!order.is_delivered"
                @click="showModal(order.id)"
                class="btn btn-success"
              >
                Confirmer la livraison
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <b-modal id="order-modal" hide-footer title="Confirmation de livraison">
        <div class="d-block text-center">
          <b-form-textarea
            id="textarea"
            v-model="confirmationText"
            placeholder="Informations de livraison"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </div>
        <b-button
          class="mt-3"
          variant="btn btn-success"
          block
          @click="confirmDelivery(confirmationOrderId)"
          >Confirmer</b-button
        >
      </b-modal>
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
  layout: 'admin',
  transition: {
    name: 'UserOrderPage'
  }
})

const router = useRouter()
const route = useRoute()
const orderList = ref(null)
const id = ref(null)
const currentPage = ref(1)
const confirmationOrderId = ref(0)
const confirmationText = ref('')
const orders = computed(() => orderList.value?.results)

onMounted(() => {
  currentPage.value = route.query.page || 1
  loadOrders()
})

watch(
  () => route.query,
  () => {
    currentPage.value = route.query.page || 1
  }
)

const showModal = (confirmId: string) => {
  confirmationOrderId.value = confirmId
  this.$bvModal.show('order-modal')
}
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('fr-FR')
}
const linkGen = (pageNum: Number) => {
  const query = route.query
  query.page = pageNum
  return router.history.current.path + '?' + toQueryString(query)
}
const loadOrders = () => {
  useFetch('/api/order/all/?page=' + currentPage.value).then(
    (orderListToLoad: PaginatedList<Order>) => {
      orderList.value = orderListToLoad
    }
  )
}
const confirmDelivery = (id: number) => {
  if (confirm('Êtes vous sûr de déclarer la livraison?')) {
    $fetch(`/api/order/${id}/`, {
      method: 'PATCH',
      body: {
        is_delivered: true,
        delivery_details: this.confirmationText
      }
    }).then((order) => {
      confirmationText.value = ''
      //@ts-ignore
      this.$bvToast.toast('Commande enregistrée comme livrée', {
        title: 'Succès',
        variant: 'success'
      })
      loadOrders()
      setTimeout(() => {
        window.location.reload()
      }, 500)
    })
  }
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
