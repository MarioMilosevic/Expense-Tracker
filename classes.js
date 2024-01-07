"use strict";

export class Budget {
  constructor() {
    this.budget = 0;
    this.expense = 0;
    this.balance = 0;
  }

  setBudget(value) {
    this.budget = Number(value);
  }

  getBudget() {
    return this.budget;
  }

  setBalance(){
    this.balance = this.budget - this.expense
  }

  getBalance(){
    return this.balance
  }
}

export class Transaction {
  constructor(num, name, cost, date, actions) {
    this.num = num;
    this.name = name;
    this.cost = cost;
    this.date = date;
    this.actions = actions;
  }
}

export class TransactionManager {
  constructor() {
    this.transactionArr = [];
  }
}
