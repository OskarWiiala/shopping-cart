/**
 * Mocking client-server processing
 */
const _products = [
  { 'id': 1, 'title': 'iPad 4 Mini', 'price': 500.01, 'inventory': 2 },
  { 'id': 2, 'title': 'H&M T-Shirt White', 'price': 10.99, 'inventory': 10 },
  { 'id': 3, 'title': 'Charli XCX - Sucker CD', 'price': 19.99, 'inventory': 5 },
  { 'id': 4, 'title': 'American History X - CD', 'price': 15.99, 'inventory': 0 }
]

export default {
  async getProducts () {
    await wait(800)
    return _products
  },

  async buyProducts (products) {
    await wait(100)
    if (
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.webdriver)
    ) {
      return
    } else {
      throw new Error('Checkout error')
    }
  }
}

function wait (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}