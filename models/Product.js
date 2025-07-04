class Product {
  constructor(
    name,
    price,
    quantity,
    {
      expires = false,
      expirationDate = null,
      shippable = false,
      weight = 0,
    } = {}
  ) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.expires = expires;
    this.expirationDate = expirationDate;
    this.shippable = shippable;
    this.weight = weight;
  }

  isExpired() {
    if (!this.expires || !this.expirationDate) {
      return false;
    } else {
      return new Date() > new Date(this.expirationDate);
    }
  }
}
export default Product;
