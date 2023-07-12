import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

// Vuex store has 5 options: state, mutations, getters, actions and modules
new Vuex.Store({
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
      // make the call
    }
  },

  mutations: { // mutations are something new, they are responsible for setting and updating the state
    // if we want to set the products array, we have to call a mutation, for example setProducts
    setProducts () {
      // update products
    }
  }
})