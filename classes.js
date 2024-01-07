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

  setExpense(value){
    this.expense = Number(value)
  }

  getExpense(){
    return this.expense
  }

  setBalance(value){
    this.balance = Number(value)
  }

  calculateBalance() {
    this.balance = this.balance - this.expense;
  }

  getBalance() {
    return this.balance;
  }
}

export class Transaction {
  constructor(num, name, cost, date, actions) {
    this.num = num;
    this.name = name;
    this.cost = cost;
    this.date = date;
    this.actions = actions;
    this.id = Math.random() * 1000;
  }
}

export class TransactionManager {
  constructor() {
    this.transactionArr = [];
  }

  add(transaction) {
    this.transactionArr.push(transaction);
  }

  remove(transactionId) {
    this.transactionArr = this.transactionArr.filter(
      (transaction) => transaction.id !== transactionId
    );
  }

  getTransactions() {
    return this.transactionArr;
  }
}


export class UI {
    constructor(){

    }
    reset(el){
        el.value = ''
    }

 
    show(el){
        el.classList.remove('hidden')
    }
    hide(el){
        el.classList.add('hidden')
    }
}