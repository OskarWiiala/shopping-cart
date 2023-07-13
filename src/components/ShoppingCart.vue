<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
      {{ product.title }} - {{ product.price | currency }} - {{ product.quantity }}</li>
    </ul>
    <h1>Total: {{ total | currency }}</h1>
    <button @click="checkout">Checkout</button>
    <p>Checkout status: {{ $store.state.checkoutStatus }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    products () {
      return this.$store.getters.cartProducts
    },

    total () {
      return this.$store.getters.cartTotal
    }
  },

  methods: {
    checkout () {
      console.log('atempting checkout');
      this.$store.dispatch('checkout')
    }
  }
}
</script>

<style>

</style>