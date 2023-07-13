<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" />
    <ul v-else>
      <li v-for="product in products" :key="product.key">
        {{ product.title }} - {{ product.price | currency }} - {{ product.inventory }}
        <button :disabled="!productIsInStock(product)" @click="addProductToCart(product)">Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        loading: false,
        productIndex: 1
      }
    },

    // mapState accepts an array with the state properties to map, or an object
    // when using an array, component's computed properties will have the same names as the state properties
    // if you want the name to be different, pass an object
    // when passing an object to mapState, functions can also be used as values instead of just using strings
    // computed: mapState({
    //   products: state => state.products, // where does state come from?
    //   // firstProduct: state => state.products[0], // arrow function required
    //   // specificProduct (state) {
    //   //   return state.products[this.productIndex]
    //   // }
    // }),

    computed: {
      ...mapState('products', { //           v module name v state name
        products: state => state.all
      }),

      ...mapGetters('products', {
        productIsInStock: 'productIsInStock'
      })
    },

    // computed: {
    //   products () {
    //     // return this.$store.getters.availableProducts
    //     // return store.state.products

    //     return this.$store.state.products
    //   },

    //   productIsInStock () {
    //     return this.$store.getters.productIsInStock
    //   }
    // },

    methods: {
      ...mapActions({
        fetchProducts: 'products/fetchProducts',
        addProductToCart: 'cart/addProductToCart'
      }),

      // addProductToCart (product) {
      //   this.$store.dispatch('addProductToCart', product)
      // }
    },

    // Will run right after the instance is created
    created () {
      this.loading = true
      // dispatch will call store action method
      // The first argument is the name of the action, the second is opitional, which is the payload
      // .then comes from the promise in the action method
      // this.fetchProducts().then((message) => {
      //   console.log(message);
      //   this.loading = false
      // })

      this.$store.dispatch('products/fetchProducts').then(() => this.loading = false)
    }
  }
</script>

<style></style>