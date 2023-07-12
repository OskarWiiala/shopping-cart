import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

// Vuex store has 5 options: state, mutations, getters, actions and modules
export default new Vuex.Store({
  state: { // state is the data
    products: []
  },

  getters: { // getters are the equivalent of computed properties
    productsCount () {
      // ...
    }
  },

  actions: { // actions are the equivalent of methods
    fetchProducts () {
      // make the call with AJAX
      // then run setProducts mutation
    }
  },

  mutations: { // mutations are something new, they are responsible for setting and updating the state
    // if we want to set the products array, we have to call a mutation, for example setProducts
    // mutations are responsible for single state changes, such as update the products array in our store

    // vuex will automatically pass he state as the FIRST parameter in every mutation
    // an additional parameter can be passed, which will be considered the payload
    setProducts (state, products) {
      // update products
      // v old product  v new product
      state.products = products
    }
  }
})