<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif"/>
    <ul v-else>
      <li v-for="product in products" :key="product.key">{{ product.title }} - {{ product.price }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: false
      }
    },

    computed: {
      products () {
        return this.$store.getters.availableProducts
        // return store.state.products
      }
    },
    // Will run right after the instance is created
    async created () {
      this.loading = true
      // dispatch will call store action method
      // The first argument is the name of the action, the second is opitional, which is the payload
      // .then comes from the promise in the action method
      this.$store.dispatch('fetchProducts').then((message) => {
        console.log(message);
        this.loading = false
      })
    }
  }
</script>

<style></style>