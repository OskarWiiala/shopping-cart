<template>
  <div>
    <h1>Product List</h1>
    <ul>
      <li v-for="product in products" :key="product.key">{{ product.title }} - {{ product.price }}</li>
    </ul>
  </div>
</template>

<script>
  import shop from '@/api/shop'
  import store from '@/store/index'
  export default {
    computed: {
      products () {
        return store.getters.availableProducts
        // return store.state.products
      }
    },
    // Will run right after the instance is created
    async created () {
      const fetchedProducts = await shop.getProducts()

      // Whenever the state is changed (through a mutation, of course) commit() is called
      // First is the name of the mutation (must match!), then the payload
      store.commit('setProducts', fetchedProducts)
      // DO NOT do like this:
      // store.state.products = products
    }
  }
</script>

<style></style>