import shop from "@/api/shop"

export default { // actions are the equivalent of methods, which are available anywhere
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

  addProductToCart ({ state, getters, commit }, product) {
    if (getters.productIsInStock(product)) {
      // checks if product already exists inside cart
      const cartItem = state.cart.find(item => item.id === product.id)
      // find cartItem
      if (!cartItem) {
        // pushProductToCart
        commit('pushProductToCart', product.id)
      } else {
        // incrementItemQuantity
        commit('incrementCartItemQuantity', cartItem)
      }

      // decrease item quantity from products
      commit('decrementProductInventory', product)
    }
  },

  checkout ({ state, commit }) {
    shop.buyProducts(state.cart)
      .then(() => {
        commit('emptyCart')
        commit('setCheckoutStatus', 'success')
      })
  }
  // addToCart (context, product) {
  //   if(product.inventory > 0) {
  //     context.commit('pushProductToCart', product)
  //   } else { 
  //     // show product out of stock message from actions
  //   }
  // }
}