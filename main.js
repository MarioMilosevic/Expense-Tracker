"use strict";
import { constants } from "./constants";
import { Budget, Transaction, TransactionManager } from "./classes";
import { createTransaction,getCurrentDate } from "./helpers";
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
} = constants();
let counter = 0;
const budget = new Budget();

setBudgetBtn.addEventListener("click", function () {
  budget.setBudget(budgetInput.value);
  budget.setBalance();
  totalBudget.textContent = `$${budgetInput.value}`;
  totalBalance.textContent = `$${budget.getBalance()}`;
  console.log(expenseCostInput);
  budgetInput.value = "";
});

addTransactionBtn.addEventListener("click", function () {
  counter++;
  const expenseNameValue = expenseNameInput.value;
  const expenseCostValue = expenseCostInput.value;
 const date = getCurrentDate()
  const transaction = new Transaction(
    counter,
    expenseNameValue,
    expenseCostValue,
    date,
    "Remove"
  );
  createTransaction(transactionHistory, transaction);
});


