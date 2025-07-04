class ShippingService {
  static ship(items) {
    console.log("** Shipment notice **");
    let totalWeight = 0;
    for (const item of items) {
      const line = `${item.quantity}x ${item.name}      ${
        item.weight * item.quantity
      }g`;
      console.log(line);
      totalWeight += item.weight * item.quantity;
    }
    console.log(`Total package weight ${(totalWeight / 1000).toFixed(1)}kg\n`);
  }
}

export default ShippingService;
