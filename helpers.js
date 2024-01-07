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
