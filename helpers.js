"use strict";
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

export const createDiv = (obj, index) => {
  const transactionDiv = document.createElement("div");
  transactionDiv.classList.add("transactionDescription");
  transactionDiv.innerHTML = `
      <div>${index + 1}.</div>
      <div>${obj.name}</div>
      <div>$${obj.cost}</div>
      <div>${obj.date}</div>
      <div>${obj.actions}</div>
      <button class="removeBtn">X</button>
    `;
}