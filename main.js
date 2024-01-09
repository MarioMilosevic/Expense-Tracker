"use strict";
import { constants } from "./constants";
import { Budget, TransactionManager, Transaction, UI } from "./classes";
import { getCurrentDate, createDiv } from "./helpers";
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
        createTransaction2(transactionHistory);

        // console.log(transactionMan.getTransactions());
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


const createTransaction2 = (parent) => {
  console.log("array prije", transactionMan.getTransactions());
  parent.innerHTML = "";
  transactionMan.getTransactions().forEach((el, i) => {
    //  createDiv(el, i)
    console.log(el);
    const transactionDiv = document.createElement("div");
    transactionDiv.classList.add("transactionDescription");
    transactionDiv.innerHTML = `
        <div>${i + 1}.</div>
        <div>${el.name}</div>
        <div>$${el.cost}</div>
        <div>${el.date}</div>
        <div>${el.actions}</div>
        <button class="removeBtn">X</button>
      `;

    const removeBtn = transactionDiv.querySelector(".removeBtn");
    removeBtn.addEventListener("click", function () {
// ///////////////////////////////////////////
      transactionMan.remove(el.id);
      console.log("array posle", transactionMan.getTransactions());
    });

    /* removeBtn.addEventListener("click", function () {

      parent.innerHTML = ''
      transactionMan.getTransactions().forEach((el, i) => {
      const transactionDiv = document.createElement("div");
    transactionDiv.classList.add("transactionDescription");
    transactionDiv.innerHTML = `
        <div>${i + 1}.</div>
        <div>${el.name}</div>
        <div>$${el.cost}</div>
        <div>${el.date}</div>
        <div>${el.actions}</div>
        <button class="removeBtn">X</button>
      `;
      // createDiv(el,i)
      parent.appendChild(transactionDiv);
    })

      // removeBtn.parentElement.remove();
      if (transactionMan.getTransactions().length === 0) {
        userInterface.show(transactionHistoryHeading);
        userInterface.hide(mainTransactionDescription);
      }
    }
    );*/
    parent.appendChild(transactionDiv);
  });
  // iznad se petlja zavrsava
};

// sve da ispzanim pa sve napravim sa stanjem u arrayu
// kada brisem isto uklonim, i napravim sve nakon praznjenja




// const createTransaction2 = (parent, transaction) => {
//   budget.getExpenseArr().forEach((el,i) => {
//     const transactionDiv = document.createElement("div");
//     transactionDiv.classList.add("transactionDescription");
//     transactionDiv.innerHTML = "";
//     transactionDiv.innerHTML = `
//     <div>${transaction.num}.</div>
//     <div>${transaction.name}</div>
//     <div>$${transaction.cost}</div>
//     <div>${transaction.date}</div>
//     <div>${transaction.actions}</div>
//     <button class="removeBtn">X</button>
//   })`;
//   parent.appendChild(transactionDiv))