import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)

// Vuex store has 5 options: state, mutations, getters, actions and modules
export default new Vuex.Store({
  // use this when using modules for state, getters ...
  modules: {
    cart,
    products
  },
  
  state: { // state is the data
    
  },

  getters: { // getters are the equivalent of computed properties
    // vuex automatically passes the state as the first parameter
    // second parameter is the getter
    
  },

  actions: actions,

  mutations: { // mutations are something new, they are responsible for setting and updating the state
    // if we want to set the products array, we have to call a mutation, for example setProducts
    // mutations are responsible for single state changes, such as update the products array in our store

  }
})