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
  export default {
    data () {
      return {
        products: []
      }
    },

    // Will run right after the instance is created
    async created () {
      // shop.getProducts(products => {
      //   this.products = products
      // })
      this.products = await shop.getProducts()
    }
  }
</script>

<style></style>