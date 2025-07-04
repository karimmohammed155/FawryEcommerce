class Customer {
  constructor(name, balance) {
    this.name = name;
    this.balance = balance;
  }

  insBalance(amount) {
    if (this.balance < amount) {
      throw new Error("Insufficient balance.");
    }
    this.balance -= amount;
  }
}

export default Customer;
