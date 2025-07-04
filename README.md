# 🛒 Fawry Quantum Internship Challenge 3 – E-Commerce

This project is a **CLI-based e-commerce system** built with **Node.js (ES6 syntax)**.

It allows a customer to:
- ✅ Add products to a cart
- ✅ Proceed to checkout
- ✅ Handle shippable and expirable items
- ✅ Receive receipt and shipping summary

---

## Requirements
- Node.js v14 or higher
- A terminal or command prompt

---

## Folder Structure

```
fawry/
├── index.js
├── models/
│   ├── Product.js
│   ├── Cart.js
│   ├── Customer.js
├── services/
│   └── ShippingService.js
├── package.json
├── README.md
```

---

## 🚀 Setup & Run Instructions

### 1. Clone the Project (or Download ZIP)
```bash
git clone https://github.com/yourusername/fawry-ecommerce.git
cd fawry
```

### 2. Add `"type": "module"` to `package.json`
This enables ECMAScript 6 modules in Node.js.

```json
{
  "name": "fawry",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  }
}
```

### 3. Run the Application
```bash
npm start
```

---

## How It Works

The program starts by asking for:
- Your **name**
- Your **starting balance**

It then lists available products with:
- Name, price, quantity
- Shipping info
- Expiry info (if any)

You choose which products to add to your cart.

When you're ready, choose the **"Checkout"** option.

---

## Sample Input/Output

```
Enter customer name: Karim
Enter your starting balance: 1000

Available Products:
1. Cheese - 100 EGP - Qty: 10 - Shippable - Exp: 2025-12-31
2. Biscuits - 150 EGP - Qty: 5 - Shippable - Exp: 2025-08-01
3. TV - 5000 EGP - Qty: 3 - Shippable
4. Scratch Card - 50 EGP - Qty: 50 - Non-Shippable
5. Checkout

Choose a product number to add to cart or select checkout: 1
How many of Cheese do you want to add? 2
2 x Cheese added to cart.

...

** Shipment notice **
2x Cheese      400g
1x Biscuits    700g
Total package weight 1.1kg

** Checkout receipt **
2x Cheese        200
1x Biscuits      150
1x Scratch Card  50
----------------------
Subtotal         400
Shipping         30
Amount           430
Remaining Balance 570
```

---

## To Reset

To rerun the program from the beginning, simply run:

```bash
npm start
```
