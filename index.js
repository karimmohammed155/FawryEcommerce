import readline from "readline";
import Product from "./models/Product.js";
import Customer from "./models/Customer.js";
import Cart from "./models/Cart.js";
import ShippingService from "./services/ShippingService.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const products = [
  new Product("Cheese", 100, 10, {
    expires: true,
    expirationDate: "2025-12-31",
    shippable: true,
    weight: 200,
  }),
  new Product("Biscuits", 150, 5, {
    expires: true,
    expirationDate: "2025-08-01",
    shippable: true,
    weight: 700,
  }),
  new Product("TV", 5000, 3, {
    expires: false,
    shippable: true,
    weight: 10000,
  }),
  new Product("Scratch Card", 50, 50, {
    expires: false,
    shippable: false,
  }),
];

const cart = new Cart();

let customer;

function askBalance() {
  rl.question("Enter customer name: ", (name) => {
    rl.question("Enter your starting balance: ", (balance) => {
      customer = new Customer(name, parseFloat(balance));
      askProduct();
    });
  });
}

function listProducts() {
  console.log("\nAvailable Products:");
  products.forEach((p, index) => {
    console.log(
      `${index + 1}. ${p.name} - ${p.price} EGP - Qty: ${p.quantity} - ${
        p.shippable ? "Shippable" : "Non-Shippable"
      }${p.expires ? " - Exp: " + p.expirationDate : ""}`
    );
  });
  console.log(`${products.length + 1}. Checkout`);
}

function askProduct() {
  listProducts();
  rl.question(
    "\nChoose a product number to add to cart or select checkout: ",
    (choice) => {
      const index = parseInt(choice) - 1;

      if (index === products.length) {
        return handleCheckout();
      }

      if (index < 0 || index >= products.length) {
        console.log("Invalid choice. Try again.");
        return askProduct();
      }

      const product = products[index];

      rl.question(`How many of ${product.name} do you want to add? `, (qty) => {
        try {
          cart.add(product, parseInt(qty));
          console.log(`${qty} x ${product.name} added to cart.`);
        } catch (err) {
          console.log(err.message);
        }
        askProduct();
      });
    }
  );
}

function handleCheckout() {
  try {
    if (cart.isEmpty()) {
      throw new Error("Cart is empty.");
    }

    let subtotal = 0;
    let shippingFee = 0;
    let shippables = [];

    for (const [product, quantity] of cart.getItems()) {
      if (product.quantity < quantity) {
        throw new Error(`${product.name} is out of stock.`);
      }
      if (product.isExpired()) {
        throw new Error(`${product.name} is expired.`);
      }

      subtotal += product.price * quantity;
      product.quantity -= quantity;

      if (product.shippable) {
        shippables.push({
          name: product.name,
          weight: product.weight,
          quantity,
        });
        shippingFee += 15;
      }
    }

    const total = subtotal + shippingFee;
    customer.insBalance(total);

    if (shippables.length > 0) {
      ShippingService.ship(shippables);
    }

    console.log("** Checkout receipt **");
    for (const [product, quantity] of cart.getItems()) {
      console.log(
        `${quantity}x ${product.name}        ${product.price * quantity}`
      );
    }

    console.log("----------------------");
    console.log(`Subtotal         ${subtotal}`);
    console.log(`Shipping         ${shippingFee}`);
    console.log(`Amount           ${total}`);
    console.log(`Remaining Balance ${customer.balance}`);
    cart.clear();
    rl.close();
  } catch (err) {
    console.error("Checkout Error:", err.message);
    rl.close();
  }
}

askBalance();
