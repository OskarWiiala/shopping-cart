<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
      {{ product.title }} - {{ product.price | currency }} - {{ product.quantity }}</li>
    </ul>
    <h1>Total: {{ total | currency }}</h1>
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
  }
}
</script>

<style>

</style>