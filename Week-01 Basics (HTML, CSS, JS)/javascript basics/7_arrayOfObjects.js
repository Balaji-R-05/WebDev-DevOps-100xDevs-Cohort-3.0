// 1. Write a function that takes an array of users as inputs and returns only the users who are more than 18 years old

function getUsers(users) {
  let adultUsers = users.filter((user) => user.age > 18);
  return adultUsers;
}


let users1 = [
  { name: "Bharat", age: 21 },
  { name: "Deepak", age: 17 },
  { name: "Harkirat", age: 27 },
  { name: "Raj", age: 15 },
  { name: "Niraj", age: 20 },
];


console.log(getUsers(users1)); // [ { name: 'Bharat', age: 21 }, { name: 'Harkirat', age: 27 }, { name: 'Niraj', age: 20 } ]



// 1. Create a function that takes an array of objects as input, and returns the users whose age > 18 and are male

let users2 = [
  {
    name: "Bharat",
    age: 21,
    gender: "male",
  },
  {
    name: "Priya",
    age: 22,
    gender: "female",
  },
  {
    name: "Rani",
    age: 15,
    gender: "female",
  },
  {
    name: "Deepak",
    age: 24,
    gender: "male",
  },
  {
    name: "Rahul",
    age: 17,
    gender: "male",
  },
];

let allUsers = getUsers(users2);

console.log(allUsers);