import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)

// Vuex store has 5 options: state, mutations, getters, actions and modules
export default new Vuex.Store({
  state: { // state is the data
    products: [],
    // array of {id, quantity}
    cart: []
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
    },

    addProductToCart (context, product) {
      if (product.inventory > 0) {
        // checks if product already exists inside cart
        const cartItem = context.state.cart.find(item => item.id === product.id)
        // find cartItem
        if (!cartItem) {
          // pushProductToCart
          context.commit('pushProductToCart', product.id)
        } else {
          // incrementItemQuantity
          context.commit('incrementCartItemQuantity', cartItem)
        }

        // decrease item quantity from products
        context.commit('decrementProductInventory', product)
      }
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

    pushProductToCart (state, productId) {
      state.cart.push({id: productId, quantity: 1})
    },

    incrementCartItemQuantity (state, cartItem) {
      // since cartItem is taken from the cart, the ++ calls back to the item in the cart
      cartItem.quantity++
    },

    decrementProductInventory (state, product) {
      // since product is taken from the products array, the -- calls back to the product
      product.inventory--
    },
  }
})