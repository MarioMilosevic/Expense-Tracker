"use strict";

export const createTransaction = (parent, transaction) => {
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
};

export const getCurrentDate = () => {
  const date = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = date.getMonth();

  const currentDate = date.getDate();
  const year = date.getFullYear();
  const text = `${currentDate < 10 ? "0" + currentDate : currentDate} ${
    months[month]
  } ${year}`;
  return text;
};
