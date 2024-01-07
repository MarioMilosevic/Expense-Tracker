"use strict";

class Budget {
  constructor(budget, balance) {
    this.budget = budget;
    this.balance = balance;
  }
}

class Transaction {
  constructor(expense, num, name, cost, date, actions) {
    this.expense = expense;
    this.num = num;
    this.name = name;
    this.cost = cost;
    this.date = date;
    this.actions = actions;
  }
}

class TransactionManager {
  constructor() {
    this.transactionArr = [];
  }
}
