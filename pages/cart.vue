<template>
    <div class="container">
        <div class="text-center mt-5">
            <h2 v-if="!!items.length"><u>Votre panier</u></h2>
            <b-alert v-else variant="danger" show>Votre panier est vide</b-alert>
            <br/>
            <br/>
        </div>
        <div class="cart-container">
            <div v-for="item in items" :key="item.id">
                <b-row>
                    <div class="col-sm-4">
                        <b-img class="rounded" style="max-height: 200px" :src="item.image" fluid :alt="item.label"></b-img>
                    </div>
                    <div class="col-sm-4">
                        <h3>{{item.label}} 
                            <span v-if="!!item.variant_value">
                                <div v-if="item.variant_type == 'Couleur'" :style="'width: 40px; height: 20px; display: inline-block; background-color: ' + item.variant_value"></div>
                                <span v-else>({{ item.variant_value }})</span>
                            </span>
                        </h3>
                        <p><b>Prix:</b> {{item.price}}</p>
                        <b-input-group class="mt-3">
                            <template #prepend>
                                <b-button :disabled="item.quantity <= 1" @click="reduceProductQuantity({id: item.id, quantity: 1})" variant="warning" >-</b-button>
                            </template>
                            <b-form-input class="text-center" v-model="item.quantity" disabled></b-form-input>
                            <template #append>
                                <b-button :disabled="item.quantity == item.qteStock" @click="incrementProductQuantity({id: item.id, quantity: 1})" variant="success">+</b-button>
                            </template>
                        </b-input-group>
                    </div>
                    <div class="col-sm-4">
                        <b-button class="mt-5" @click="removeProduct(item.id)" variant="danger">Supprimer</b-button>
                    </div>
                </b-row>
                <hr/>
            </div>
            <div>
                <h3><b>Total commande: {{ cartTotalPrice }} €</b></h3>
            </div>
            <div v-if="!!items.length">
                <b-button variant="warning" to="/payment" class="text-white float-right">Commander &gt;</b-button>
                <br/>
                <br/>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default Vue.extend({
    computed: {
        ...mapGetters({
        items: 'cart/items',
        cartTotalPrice: 'cart/cartTotalPrice'
        }),
    },
    methods: {
        ...mapMutations({
            incrementProductQuantity: 'cart/incrementProductQuantity',
            reduceProductQuantity: 'cart/reduceProductQuantity',
            removeProduct: 'cart/removeProduct'
        }),
    }
    })
</script>