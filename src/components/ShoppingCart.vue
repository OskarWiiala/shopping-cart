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
      // specify namespace as the first argument for less verbose code
      ...mapGetters('cart', {
        products: 'cartProducts',
        total: 'cartTotal'
        // products: 'cart/cartProducts',
        // total: 'cart/cartTotal'
      }),

      // getters from other namespaces can also be used (works for states, actions and mutations as well)
      // ...mapGetters('products', {
      //   productIsInStock: 'productIsInStock'
      // }),

      ...mapState('cart', {
        checkoutStatus: state => state.checkoutStatus
      })

      // products () {
      //   return this.$store.getters.cartProducts
      // },

      // total () {
      //   return this.$store.getters.cartTotal
      // }
    },

    methods: {
      ...mapActions('cart', {
        checkout: 'checkout'
      })
      // checkout () {
      //   console.log('attempting checkout');
      //   this.$store.dispatch('checkout')
      // }
    }
  }
</script>

<style></style>