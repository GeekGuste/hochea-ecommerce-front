<template>
  <div class="container">
    <div class="text-center mt-5">
      <h2 v-if="!!items.length"><u>Commande</u></h2>
      <b-alert v-else variant="danger" show>Votre panier est vide</b-alert>
      <br />
      <br />
    </div>
    <div class="cart-container" v-if="!!items.length">
      <b-row>
        <b-col sm="4" md="4" lg="3">
        <div class="card p-2 mb-5">
          <div
            class="bg-light text-center mb-2"
            v-for="item in items"
            :key="item.id"
          >
            <b-row>
              <div class="col-12">
                <b-img
                  class="rounded fluid"
                  style="max-height: 100px"
                  :src="item.image"
                  fluid
                  :alt="item.label"
                ></b-img>
                <h6>
                  {{ item.label }}
                  <span v-if="!!item.variant_value">
                    <div
                      v-if="item.variant_type == 'Couleur'"
                      :style="
                        'width: 40px; height: 20px; display: inline-block; background-color: ' +
                        item.variant_value
                      "
                    ></div>
                    <span v-else>({{ item.variant_value }})</span>
                  </span>
                </h6>
                <p><b>Prix:</b> {{ item.price }}</p>
                <p><b>Quantité:</b> {{ item.quantity }}</p>
                <p><b>Total:</b> {{ item.price * item.quantity }}</p>
              </div>
            </b-row>
          </div>
          <hr />
          <div><b>Total commande: </b>{{ cartTotalPrice }}</div>
        </div>
        </b-col>
        <b-col sm="8" md="8" lg="9">
          <div class="card p-2">
            Formulaire de paiement
            <div>
                <b-button variant="warning" :disabled="true" class="text-white float-right"
                >Commander &gt;</b-button>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default Vue.extend({
  name: "PaymentPage",
  computed: {
    ...mapGetters({
      items: "cart/items",
      cartTotalPrice: "cart/cartTotalPrice",
    }),
  },
  methods: {
    ...mapMutations({
      incrementProductQuantity: "cart/incrementProductQuantity",
      reduceProductQuantity: "cart/reduceProductQuantity",
      removeProduct: "cart/removeProduct",
    }),
  },
});
</script>