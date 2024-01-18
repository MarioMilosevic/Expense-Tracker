"use strict";
import { initQuerySelectors } from "./initQuerySelectors";
import { Budget, TransactionManager, Transaction, UI } from "./classes";
import { getCurrentDate, createDiv } from "./helpers";
import Swal from "sweetalert2";
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
} = initQuerySelectors();

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
    Swal.fire({
      title: "Budget ?",
      text: "Budget not properly set",
      icon: "error"
    });
  }
});

addTransactionBtn.addEventListener("click", function () {
  if (budget.getBudget() > 0) {
    const expenseNameValue = expenseNameInput.value;
    const expenseCostValue = expenseCostInput.value;

    if (expenseCostValue > 0) {
      budget.setExpense(expenseCostValue);
      if (budget.getBalance() >= budget.getExpense()) {
        budget.addExpense(budget.getExpense());
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
        createTransaction(transactionHistory);

        budget.calculateBalance();
        totalBalance.textContent = `$${budget.getBalance()}`;
        userInterface.show(mainTransactionDescription);
        userInterface.hide(transactionHistoryHeading);
        userInterface.reset(expenseNameInput);
        userInterface.reset(expenseCostInput);
      } else {
        Swal.fire({
          title: "Money ?",
          text: "You don't have enough money left",
          icon: "error"
        });
      }
    } else {
      Swal.fire({
        text: "Transaction must be greater than 0",
        icon: "error"
      });
    }
  } else {
    Swal.fire({
      text:"Please type in budget value",
      icon:"error"
    })
  }
});

const createTransaction = (parent) => {
  parent.innerHTML = "";
  transactionMan.getTransactions().forEach((el, i) => {
    const transactionDiv = document.createElement("div");
    transactionDiv.classList.add("transactionDescription");
    transactionDiv.innerHTML = `
        <div>${i + 1}.</div>
        <div>${el.name}</div>
        <div>$${el.cost}</div>
        <div>${el.date}</div>
        <div>${el.actions}</div>
        <button data-expenseid=${el.id} class="removeBtn">X</button>
      `;

    parent.appendChild(transactionDiv);
  });
};

transactionHistory.addEventListener("click", function (e) {
  transactionMan.remove(e.target.dataset.expenseid);
  transactionHistory.innerHTML = "";
  createTransaction(transactionHistory);
  if (transactionMan.getTransactions().length === 0) {
    transactionHistory.appendChild(transactionHistoryHeading);
    userInterface.hide(mainTransactionDescription);
    userInterface.show(transactionHistoryHeading);
  }
});
