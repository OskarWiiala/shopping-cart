<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} - {{ product.quantity }}</li>
    </ul>
    <h1>Total: {{ total | currency }}</h1>
    <button @click="checkout">Checkout</button>
    <p v-if="checkoutStatus">Checkout status: {{ checkoutStatus }}</p>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  export default {
    computed: {
      ...mapGetters({
        products: 'cartProducts',
        total: 'cartTotal'
      }),

      ...mapState({
        checkoutStatus: state => state.cart.checkoutStatus
      })

      // products () {
      //   return this.$store.getters.cartProducts
      // },

      // total () {
      //   return this.$store.getters.cartTotal
      // }
    },

    methods: {
      ...mapActions({
        checkout: 'checkout'
      })
      // checkout () {
      //   console.log('atempting checkout');
      //   this.$store.dispatch('checkout')
      // }
    }
  }
</script>

<style></style>