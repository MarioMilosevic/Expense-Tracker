"use strict";
import { constants } from "./constants";
import { Budget, Transaction, TransactionManager, UI } from "./classes";
import { createTransaction, getCurrentDate } from "./helpers";
// import Toastify from 'toastify-js'
// import "toastify-js/src/toastify.css"


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
  if (budgetInput.value !== "") {
    budget.setBudget(budgetInput.value);
    budget.setBalance(budget.getBudget());
    totalBudget.textContent = `$${budgetInput.value}`;
    totalBalance.textContent = `$${budget.getBalance()}`;
    userInterface.reset(budgetInput);
  } else {
    alert("ne");
  }
});

addTransactionBtn.addEventListener("click", function () {
  if(budget.getBudget() > 0){
    
    counter++;
    const expenseNameValue = expenseNameInput.value;
    const expenseCostValue = expenseCostInput.value;
    
    budget.setExpense(expenseCostValue);
    totalExpenses.textContent = `$${expenseCostValue}`;
    
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
      budget.calculateBalance();
      totalBalance.textContent = `$${budget.getBalance()}`;
      userInterface.show(mainTransactionDescription);
      userInterface.hide(transactionHistoryHeading);
      userInterface.reset(expenseNameInput);
      userInterface.reset(expenseCostInput);
    }
    });
    