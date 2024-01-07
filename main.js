"use strict";
import { constants } from "./constants";
import { Budget, Transaction, TransactionManager, UI } from "./classes";
import { createTransaction, getCurrentDate } from "./helpers";
const {
  budgetInput,
  setBudgetBtn,
  expenseNameInput,
  expenseCostInput,
  addTransactionBtn,
  totalBudget,
  totalExpenses,
  totalBalance,
  transactionHistory,
  transactionHistoryHeading,
  mainTransactionDescription,
} = constants();

let counter = 0;
const budget = new Budget();
const transactionMan = new TransactionManager();
const userInterface = new UI();

setBudgetBtn.addEventListener("click", function () {
  if(budgetInput.value !== '' && budgetInput.length >= 1){
    budget.setBudget(budgetInput.value);
    budget.setBalance();
    totalBudget.textContent = `$${budgetInput.value}`;
    totalBalance.textContent = `$${budget.getBalance()}`;
    console.log(expenseCostInput);
    userInterface.reset(budgetInput);
  } else {
    alert('ne')
  }
});

addTransactionBtn.addEventListener("click", function () {
  counter++;
  const expenseNameValue = expenseNameInput.value;
  const expenseCostValue = expenseCostInput.value;
  totalExpenses.textContent = `$${expenseCostValue}`
  const date = getCurrentDate();
  const transaction = new Transaction(
    counter,
    expenseNameValue,
    expenseCostValue,
    date,
    "Remove"
  );
  createTransaction(transactionHistory, transaction);
  transactionMan.add(transaction);
  userInterface.show(mainTransactionDescription)
  userInterface.hide(transactionHistoryHeading)
});
