import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)

// Vuex store has 5 options: state, mutations, getters, actions and modules
export default new Vuex.Store({
  state: { // state is the data
    products: []
  },

  getters: { // getters are the equivalent of computed properties
    // vuex automatically passes the state as the first parameter
    // second parameter is the getter
    availableProducts (state) {
      // filter available products based on inventory size
      return state.products.filter(product => product.inventory > 0)
    }
  },

  actions: { // actions are the equivalent of methods, which are available anywhere
    // vuex automatically passes context as the first parameter to all actions
    // ES6 argument structuring can be called to get just the commit method, so context does not have to be used
    fetchProducts ({ commit }) {
      // make the call with AJAX
      // then run setProducts mutation

      // context.commi() <- commits a mutation
      // context.state <- access the state
      // ... and so on

      return new Promise((resolve, reject) => {
        try {
          shop.getProducts().then((fetchedProducts) => {
            // Whenever the state is changed (through a mutation, of course) commit() is called
            // First is the name of the mutation (must match!), then the payload
            commit('setProducts', fetchedProducts)
            // DO NOT do like this:
            // store.state.products = products
            resolve('shop.getProducts() operation resolved')
          })
        } catch (e) {
          reject()
        }
      })
    }
    // addToCart (context, product) {
    //   if(product.inventory > 0) {
    //     context.commit('pushProductToCart', product)
    //   } else { 
    //     // show product out of stock message from actions
    //   }
    // }
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
    },
  }
})