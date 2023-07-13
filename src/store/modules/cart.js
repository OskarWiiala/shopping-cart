import shop from '@/api/shop'
// modules just export an object with their state, getters, mutations ...
export default {
  state: {
    // array of {id, quantity}
    items: [],
    checkoutStatus: null
  },

  getters: {
    cartProducts (state, getters, rootState) {
      return state.items.map(cartItem => {
        const product = rootState.products.all.find(product => product.id === cartItem.id)
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
  },

  actions: {
    addProductToCart ({ state, getters, commit, rootState }, product) {
      if (getters.productIsInStock(product)) {
        // checks if product already exists inside cart
        const cartItem = state.items.find(item => item.id === product.id)
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
      shop.buyProducts(state.items)
        .then(() => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        })
    }
  },

  mutations: {
    pushProductToCart (state, productId) {
      state.items.push({ id: productId, quantity: 1 })
    },

    incrementCartItemQuantity (state, cartItem) {
      // since cartItem is taken from the cart, the ++ calls back to the item in the cart
      cartItem.quantity++
    },

    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    },

    emptyCart (state) {
      state.items = []
    }
  },
}