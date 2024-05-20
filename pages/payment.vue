<template>
  <div class="container">
    <div class="text-center mt-5">
      <div v-if="!!items.length">
        <h2><u>Commande</u></h2>
        <i>Livraison gratuite dès 49 € d'achats</i>
      </div>
      <b-alert v-else variant="danger" show> Votre panier est vide </b-alert>
      <br />
      <br />
    </div>
    <div v-if="!!items.length" class="cart-container">
      <b-row>
        <b-col sm="4" md="4" lg="3">
          <div class="card p-2 mb-5">
            <div
              v-for="item in items"
              :key="item.id"
              class="bg-light text-center mb-2"
            >
              <b-row>
                <div class="col-12">
                  <b-img
                    class="rounded fluid"
                    style="max-height: 100px"
                    :src="item.image"
                    fluid
                    :alt="item.label"
                  />
                  <h6 class="mt-2">
                    {{ item.label }}
                    <span v-if="!!item.variant_value">
                      <div
                        v-if="item.variant_type == 'Couleur'"
                        :style="
                          'width: 40px; height: 20px; display: inline-block; background-color: ' +
                          item.variant_value
                        "
                      />
                      <span v-else>({{ item.variant_value }})</span>
                    </span>
                  </h6>
                  <p><b>Prix:</b> {{ item.price }} €</p>
                  <p><b>Quantité:</b> {{ item.quantity }}</p>
                  <p><b>Total:</b> {{ item.price * item.quantity }} €</p>
                </div>
              </b-row>
            </div>
            <hr />
            <div><b>Total commande: </b>{{ cartTotalPrice }} €</div>
          </div>
        </b-col>
        <b-col sm="8" md="8" lg="9">
          <div class="card p-2">
            <u>Formulaire de paiement</u>
            <div>
              <b-form-group
                id="input-group-1"
                label="Adresse email *:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  placeholder="Enter email"
                  required
                />
              </b-form-group>
              <b-form-group
                id="input-group-1"
                label="Nom *"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.last_name"
                  placeholder="Entrer le nom"
                  required
                />
              </b-form-group>
              <b-form-group
                id="input-group-1"
                label="Prénom(s) *"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.first_name"
                  placeholder="Entrer le prenom"
                  required
                />
              </b-form-group>
              <b-form-group
                id="input-group-1"
                label="Numéro de téléphone *"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.phone_number"
                  type="tel"
                  placeholder="Entrer le numéro de téléphone"
                  required
                />
              </b-form-group>
              <b-form-group
                id="input-group-1"
                label="Zone de livraison *"
                label-for="input-1"
              >
                <b-form-select
                  v-model="form.deliveryZoneInfo"
                  :options="deliveryZoneOptions"
                  @change="zoneSelection"
                />
              </b-form-group>
              <b-form-group
                id="input-group-1"
                label="Adresse complète *"
                label-for="input-1"
              >
                <b-form-textarea
                  id="text-area-1"
                  v-model="form.address"
                  placeholder="Entrer votre adresse"
                  rows="3"
                  max-rows="5"
                  required
                />
              </b-form-group>
              <b-form-group
                id="input-group-1"
                label="Pays *"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.country"
                  type="text"
                  placeholder="France"
                  required
                />
              </b-form-group>
              <b-row>
                <b-col>
                  <b-form-group
                    id="input-group-1"
                    label="Ville *"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      v-model="form.town"
                      type="text"
                      placeholder="Strasbourg"
                      required
                    />
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    id="input-group-1"
                    label="Code postal"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      v-model="form.postal_code"
                      type="text"
                      placeholder="67000"
                      required
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <div v-if="form.delivery_charges != null">
                <h3><b>Frais de livraison:</b> {{ realDeliveryCharges }} €</h3>
                <h3><b>Total commande:</b> {{ totalCommande }} €</h3>
                <i>Livraison gratuite dès 49 € d'achats</i>
                <br />
              </div>
              <div>
                <div>
                  <center><u>Paiement</u></center>
                  <div class="container">
                    <b-form-group label="Mode de paiement">
                      <b-form-radio
                        v-model="form.paymentMode"
                        name="payment-mode"
                        value="card"
                      >
                        <b-img src="~/assets/images/card.png" /> Carte bancaire
                      </b-form-radio>
                      <b-form-radio
                        v-model="form.paymentMode"
                        name="payment-mode"
                        value="paypal"
                      >
                        <b-img src="~/assets/images/paypal.png" /> Paypal
                      </b-form-radio>
                      <!--<b-form-radio v-model="form.paymentMode" name="payment-mode" value="scalapay">
                          <b-img src="~/assets/images/scalapay.png"></b-img> Scalapay
                        </b-form-radio>
                        <b-form-radio v-model="form.paymentMode" name="payment-mode" value="klarna">
                          Klarna
                        </b-form-radio> -->
                    </b-form-group>
                  </div>
                  <div v-if="isInvalid" class="container">
                    <i>Veuillez remplir tous les champs avant de payer</i>
                  </div>
                  <div v-if="form.paymentMode == 'card'" class="container">
                    <stripe-element-card
                      v-if="renderPaymentComponent && !!form.email"
                      ref="paymentRef"
                      :pk="publishableKey"
                      :hide-postal-code="true"
                      :elements-options="elementsOptions"
                      @token="tokenCreated"
                      @error="paymentError"
                    />
                    <br />
                    <b-button
                      variant="warning"
                      :disabled="isInvalid"
                      class="text-white float-right"
                      @click="pay"
                    >
                      Commander &gt;
                    </b-button>
                  </div>
                  <div
                    v-if="form.paymentMode == 'paypal' && !isInvalid"
                    class="container"
                  >
                    <paypal-checkout
                      :amount="totalCommande + ''"
                      currency="EUR"
                      :client="paypal"
                      locale="fr_FR"
                      :button-style="paypalStyle"
                      env="sandbox"
                      @payment-completed="paypalPaymentCompleted"
                    />
                  </div>
                  <div
                    v-if="form.paymentMode == 'klarna' && !isInvalid"
                    class="container"
                  />
                  <div v-if="!!isInvalid" class="container">
                    <b-spinner variant="primary" label="Spinning" />
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { StripeElementCard } from '@vue-stripe/vue-stripe'
import { DeliveryZoneInfo } from '../models/delivery'
import { PaginatedList } from '../models/pagination'
import { useCartStore } from '@/stores/cart'

definePageMeta({
  transition: {
    name: "PaymentPage",
  },
  middleware: ['auth'],
});

const cart = useCartStore()
const form = ref({
  email: '',
  last_name: '',
  first_name: '',
  phone_number: '',
  address: '',
  postal_code: '',
  country: '',
  town: '',
  deliveryZoneInfo: '',
  zone: '',
  delivery_charges: null,
  paymentMode: 'card'
})

const deliveryZoneOptions = ref([])

const publishableKey = ref('pk_test_51Kpr85DP9ndu4EFOVJwmW613vPQLBznGcMK3uCTRb9P3BukYWtvjPLPRE6Ro1UiQUj4iyS48PZKjgGfmP14BBZpA00zasiO8k7')
const elementsOptions = ref({
  appearance: {} // appearance options
})
const paymentIntent = ref(null)

const renderPaymentComponent = ref(true)

const paypal = ref({
  sandbox:
    'AZV0n5-qou-sbYQo1mRQHvMd8UW6_BoY3g9OKj_ltgDV7iMIPRxwWdDu_W7aKJ_8wkXeYSZPQKlT-GRO',
  production:
    'AUGuYYnINwWo5dsE4BjvvDBZpQAGG0CVt3lUDMYG1JcoNP0QWrFQMWrPaWBeOdgUbyFQO9E3U5friPj-'
})

const paypalStyle = ref({
  label: 'checkout',
  size: 'medium',
  shape: 'pill',
  color: 'gold'
})

onMounted(() => {
  useFetch('/api/deliveryZoneInfo/')
    .then((deliveryZoneList: PaginatedList<DeliveryZoneInfo>) => {
      deliveryZoneOptions.value = deliveryZoneList.results.map(
        (deliveryZoneInfo: DeliveryZoneInfo) => {
          return {
            value: deliveryZoneInfo.id,
            text: deliveryZoneInfo.zone,
            delivery_charges: deliveryZoneInfo.delivery_charges
          }
        }
      )
    })
})

const items = computed(() => cart.items);
const cartTotalPrice = computed(() => cart.cartTotalPrice);
const cartTotalWeight = computed(() => cart.cartTotalWeight);

const realDeliveryCharges = computed(() => {
  if (parseFloat(cartTotalPrice.value) > 49) {
    return 0
  } else {
    const kgDeliveryCharge = form.value.delivery_charges
      ? parseFloat(form.value.delivery_charges)
      : 0
    if (cartTotalWeight.value <= 1000) {
      // frais par défaut si inférieur à 1kg
      return kgDeliveryCharge
    } else {
      const nbKg = Math.floor(cartTotalWeight.value / 1000)
      return kgDeliveryCharge + 1 * (nbKg - 1)
    }
  }
})

const totalCommande = computed(() => {
  return parseFloat(cartTotalPrice.value) + realDeliveryCharges.value
})

const isInvalid = computed(() => {
  return (
    form.value.email == '' ||
    form.value.last_name == '' ||
    form.value.first_name == '' ||
    form.value.phone_number == '' ||
    form.value.address == '' ||
    form.value.country == '' ||
    form.value.town == '' ||
    form.value.deliveryZoneInfo == null
  )
})

const clearCart = cart.clearCart()

const zoneSelection(e: any) {
  const zone = deliveryZoneOptions.value.find((z: any) => z.value == e)
  const form.value.zone = zone.text
  const form.value.delivery_charges = zone.delivery_charges
  generatePaymentIntent()
}

const forcePaymentRerender = () => {
  // Remove my-component from the DOM
  renderPaymentComponent = false

  // If you like promises better you can
  // also use nextTick this way
  nextTick().then(() => {
    // Add the component back in
    renderPaymentComponent = true
  })
}

const generatePaymentIntent = () => {
  const paymentIntent = await $fetch('/sales/create-payment/', {
    method: 'POST',
    body: {
      items: items.value,
      ...form.value
    }
  }).then((res: any) => {
    elementsOptions.value.clientSecret =
    paymentIntent.value.payment_intent.client_secret
    forcePaymentRerender()
    paymentIntent = paymentIntent.value.payment_intent
  })
}

const handleSuccessfulPayment = (result: any) => {
  // @ts-ignore
  this.$bvToast.toast('Commande enregistrée avec succès', {
    title: 'Succès',
    variant: 'success'
  })
  const orderId = result.order_id
  // On vide le panier
  clearCart()
  setTimeout(
    () => navigateTo({ path: `/profile/order/${orderId}/details` }),
    3000
  )
}

const tokenCreated = (token) => {
  $fetch('/api/category/', {
    method: 'POST',
    body: {
      intent_id: paymentIntent.value?.id,
      items: items.value,
      ...form.value
    },
  }).then((paymentResult: any) => {
    handleSuccessfulPayment(paymentResult)
  })
}

const paymentError = (event) => {
  // @ts-ignore
  this.$bvToast.toast(event.message, {
    title: 'Erreur',
    variant: 'danger'
  })
}
const paymentRef = ref()
const pay = () => {
  // console.log(this.$refs.paymentRef);
  paymentRef.submit()
}
const paypalPaymentCompleted = (event) => {
  $fetch('/sales/save-paypal-order/', {
    method: 'POST',
    body: {
      items: items.value,
      ...form.value
    },
  }).then((result: any) => {
    handleSuccessfulPayment(result)
  })
}
</script>
