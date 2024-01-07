"use strict";

export function constants() {
  const budgetInput = document.querySelector("#budget");
  const setBudgetBtn = document.querySelector("#setBtn");
  const expenseNameInput = document.querySelector("#expenseName");
  const expenseCostInput = document.querySelector("#expenseCost");
  const addTransactionBtn = document.querySelector(".addBtn");
  const totalBudget = document.querySelector("#totalBudget");
  const totalExpenses = document.querySelector("#totalExpenses");
  const totalBalance = document.querySelector("#totalBalance");
  const transactionHistory = document.querySelector(".transactionHistory");
const transactionHistoryHeading = document.querySelector('.transactionHistoryHeading')
const mainTransactionDescription = document.querySelector('#mainTransactionDescription')
  return {
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
    mainTransactionDescription
};
}
