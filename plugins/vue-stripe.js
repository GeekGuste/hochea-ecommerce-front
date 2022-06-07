import Vue from 'vue';
import { StripeCheckout, StripePlugin } from '@vue-stripe/vue-stripe';

export default () => {
    const options = {
        pk: process.env.STRIPE_PK,
        /*stripeAccount: process.env.STRIPE_ACCOUNT,
        apiVersion: process.env.API_VERSION,*/
        locale: process.env.LOCALE,
    };
    /*Vue.component('StripeCheckout', StripeCheckout);*/
    Vue.component('StripePlugin', options);
};