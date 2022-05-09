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
                <h6 class="mt-2">
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
                  ></b-form-input>
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
                  ></b-form-input>
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
                  ></b-form-input>
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
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-1"
                  label="Zone de livraison *"
                  label-for="input-1"
                >
                  <b-form-select v-model="form.deliveryZoneInfo" @change="zoneSelection" :options="deliveryZoneOptions"></b-form-select>
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
                  ></b-form-textarea>
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
                  ></b-form-input>
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
                      ></b-form-input>
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
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <div v-if="form.delivery_charges != null">
                  <h3><b>Frais de livraison:</b> {{ form.delivery_charges }} €</h3>
                  <h3><b>Total commande:</b> {{totalCommande}} €</h3>
                </div>
                <div v-if="!isInvalid">
                  Ici sera le formulaire de paiement!
                </div>
                <b-button variant="warning" :disabled="isInvalid" class="text-white float-right"
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
import { DeliveryZoneInfo } from "../models/delivery";
import { PaginatedList } from "../models/pagination";
export default Vue.extend({
  name: "PaymentPage",
  middleware: ["auth"],
  data(){
    return {
      form: {
        email: "",
        last_name: "",
        first_name: "",
        phone_number: "",
        address: "",
        postal_code: "",
        country: "",
        town: "" ,
        deliveryZoneInfo: "",
        zone: "",
        delivery_charges: null,
      },
      deliveryZoneOptions: [],
    }
  },
  created: function () {
    this.$axios
      .$get("/api/deliveryZoneInfo/")
      .then((deliveryZoneList: PaginatedList<DeliveryZoneInfo>) => {
        this.deliveryZoneOptions = deliveryZoneList.results.map((deliveryZoneInfo: DeliveryZoneInfo) => {
          return {value: deliveryZoneInfo.id, text: deliveryZoneInfo.zone, delivery_charges: deliveryZoneInfo.delivery_charges};
        });
      });
  },
  computed: {
    ...mapGetters({
      items: "cart/items",
      cartTotalPrice: "cart/cartTotalPrice",
    }),
    totalCommande(){
      return parseFloat(this.cartTotalPrice) + (!!this.form.delivery_charges?parseFloat(this.form.delivery_charges):0);
    },
    isInvalid(){
      return (this.form.email == "" || 
      this.form.last_name == "" || 
      this.form.first_name == "" || 
      this.form.phone_number == "" || 
      this.form.address == "" || 
      this.form.country == "" || 
      this.form.town == "" || 
      this.form.deliveryZoneInfo == null);
    }
  },
  methods: {
    ...mapMutations({
      incrementProductQuantity: "cart/incrementProductQuantity",
      reduceProductQuantity: "cart/reduceProductQuantity",
      removeProduct: "cart/removeProduct",
    }),
    zoneSelection(e){
      let zone = this.deliveryZoneOptions.find((z) => z.value == e);
      this.form.zone = zone.text;
      this.form.delivery_charges = zone.delivery_charges;
    }
  },
});
</script>