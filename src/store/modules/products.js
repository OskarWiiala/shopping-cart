import shop from "@/api/shop"

export default {
  state: {
    all: []
  },

  getters: {
    availableProducts (state) {
      // filter available products based on inventory size
      return state.all.filter(product => product.inventory > 0)
    },

    productIsInStock (state) {
      return (product) => {
        return product.inventory > 0
      }
    }
  },

  actions: {
    async fetchProducts ({ commit }) {
      const fetchedProducts = await shop.getProducts()
      commit('setProducts', fetchedProducts)
    }
  },

  mutations: {
    // vuex will automatically pass he state as the FIRST parameter in every mutation
    // an additional parameter can be passed, which will be considered the payload
    setProducts (state, products) {
      // update products
      // v old product  v new product
      state.all = products
    },

    decrementProductInventory (state, product) {
      // since product is taken from the products array, the -- calls back to the product
      product.inventory--
    }
  },
}