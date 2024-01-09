"use strict";
import { constants } from "./constants";
import { Budget, TransactionManager, Transaction, UI } from "./classes";
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
  if (budgetInput.value !== "" && !isNaN(Number(budgetInput.value))) {
    budget.setBudget(budgetInput.value);
    budget.setBalance(budget.getBudget());
    totalBudget.textContent = `$${budgetInput.value}`;
    totalBalance.textContent = `$${budget.getBalance()}`;
    userInterface.reset(budgetInput);
  } else {
    alert("Budget not properly set");
  }
});

addTransactionBtn.addEventListener("click", function () {
  if (budget.getBudget() > 0) {
    const expenseNameValue = expenseNameInput.value;
    const expenseCostValue = expenseCostInput.value;

    if (expenseCostValue > 0) {
      budget.setExpense(expenseCostValue);
      // promjenio da je this.expense = expensecost value umjesto da se sabiraju

      if (budget.getBalance() >= budget.getExpense()) {
        budget.addExpense(budget.getExpense())
        // totalExpenses.textContent = `$${budget.getExpense()}`;
        totalExpenses.textContent = `$${budget.totalExpenses()}`;
        const date = getCurrentDate();
        counter++;
        const transaction = new Transaction(
          counter,
          expenseNameValue,
          expenseCostValue,
          date,
          "Remove"
        );

        transactionMan.add(transaction);
        createTransaction(transactionHistory, transaction);

        console.log(transactionMan.getTransactions());
        budget.calculateBalance();
        totalBalance.textContent = `$${budget.getBalance()}`;
        userInterface.show(mainTransactionDescription);
        userInterface.hide(transactionHistoryHeading);
        userInterface.reset(expenseNameInput);
        userInterface.reset(expenseCostInput);
      } else {
        alert("You don't have enough money left");
      }
    } else {
      alert("Transaction must be greater than 0");
    }
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

  const removeBtn = transactionDiv.querySelector(".removeBtn");
  removeBtn.addEventListener("click", function () {
    transactionMan.remove(transaction.id);
    removeBtn.parentElement.remove();
    if (transactionMan.getTransactions().length === 0) {
      userInterface.show(transactionHistoryHeading);
      userInterface.hide(mainTransactionDescription);
    }
  });
};

const array = [15, 16, 17, 18, 19];

function reducer(accumulator, currentValue, index) {
  const returns = accumulator + currentValue;
  console.log(
    `accumulator: ${accumulator}, currentValue: ${currentValue}, index: ${index}, returns: ${returns}`,
  );
  return returns;
}

array.reduce(reducer);
