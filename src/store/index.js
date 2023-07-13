import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'

Vue.use(Vuex)

// Vuex store has 5 options: state, mutations, getters, actions and modules
export default new Vuex.Store({
  state: { // state is the data
    products: [],
    // array of {id, quantity}
    cart: [],
    checkoutStatus: null
  },

  getters: { // getters are the equivalent of computed properties
    // vuex automatically passes the state as the first parameter
    // second parameter is the getter
    availableProducts (state) {
      // filter available products based on inventory size
      return state.products.filter(product => product.inventory > 0)
    },

    cartProducts (state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },

    cartTotal (state, getters) {
      // let total = 0
      // getters.cartProducts.forEach(product => {
      //   total += product.price * product.quantity
      // })
      // return total

      // calculate total price of all items in the cart
      return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
    },

    productIsInStock (state) {
      return (product) => {
        return product.inventory > 0
      }
    }
  },

  actions: actions,

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

    pushProductToCart (state, productId) {
      state.cart.push({ id: productId, quantity: 1 })
    },

    incrementCartItemQuantity (state, cartItem) {
      // since cartItem is taken from the cart, the ++ calls back to the item in the cart
      cartItem.quantity++
    },

    decrementProductInventory (state, product) {
      // since product is taken from the products array, the -- calls back to the product
      product.inventory--
    },

    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    },

    emptyCart (state) {
      state.cart = []
    }
  }
})