'use strict'
import { constants } from "./constants"
import { Budget, Transaction, TransactionManager } from "./classes"
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
} = constants()

const budget = new Budget()

setBudgetBtn.addEventListener('click', function(){
    budget.setBudget(budgetInput.value)
    console.log(budget.getBudget());
    totalBudget.textContent = `$${budgetInput.value}`
    budgetInput.value = ''     
})

addTransactionBtn.addEventListener('click', function(){
    const expenseNameValue = expenseNameInput.value
    console.log(expenseNameValue); 
    const expenseCostValue = expenseCostInput.value
    console.log(expenseCostValue);
    const transaction = new Transaction(1, expenseNameValue, expenseCostValue, 25, 'remove')
    console.log(transaction);
})

const getCurrentDate = () => {
    const date = new Date()

}

getCurrentDate()