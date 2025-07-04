class Cart {
  constructor() {
    this.items = new Map();
  }

  add(product, quantity) {
    if (product.quantity < quantity) {
      throw new Error(`${product.name} does not have enough quantity.`);
    }
    if (product.isExpired()) {
      throw new Error(`${product.name} is expired.`);
    }
    if (this.items.has(product)) {
      this.items.set(product, this.items.get(product) + quantity);
    } else {
      this.items.set(product, quantity);
    }
  }

  isEmpty() {
    return this.items.size === 0;
  }

  getItems() {
    return this.items;
  }

  clear() {
    this.items.clear();
  }
}

export default Cart;
