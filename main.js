"use strict";
import { constants } from "./constants";
import { Budget, TransactionManager,Transaction, UI } from "./classes";
import { getCurrentDate } from "./helpers";
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
  if (budget.getBudget() > 0) {
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
    console.log(transactionMan.getTransactions());
    budget.calculateBalance();
    totalBalance.textContent = `$${budget.getBalance()}`;
    userInterface.show(mainTransactionDescription);
    userInterface.hide(transactionHistoryHeading);
    userInterface.reset(expenseNameInput);
    userInterface.reset(expenseCostInput);
  } else {
    alert("Please type in budget value");
  }
});

const createTransaction = (parent, transaction) => {
  const transactionDiv = document.createElement("div");
  transactionDiv.classList.add("transactionDescription");
  transactionDiv.innerHTML = "";
  transactionDiv.innerHTML = `
        <div>${transaction.num}.</div>
        <div>${transaction.name}</div>
        <div>$${transaction.cost}</div>
        <div>${transaction.date}</div>
        <div>${transaction.actions}</div>
        <button class="removeBtn">X</button>
    `;
  parent.appendChild(transactionDiv);
  console.log(transactionMan.getTransactions());

  const removeBtn = transactionDiv.querySelector(".removeBtn");
  removeBtn.addEventListener("click", function () {
    transactionMan.remove(transaction.id);
    removeBtn.parentElement.remove()
    if(transactionMan.getTransactions().length === 0){
      userInterface.show(transactionHistoryHeading)
      userInterface.hide(mainTransactionDescription)
    }
  });
};
