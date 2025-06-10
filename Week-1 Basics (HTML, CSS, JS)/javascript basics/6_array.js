// 1. Write a function that takes an array of numbers as input, and returns a new array with only even values. Read about `filter` in JS

function getEvenNumbers(numbers) {
    let evenNumbers = numbers.filter((number) => number % 2 === 0);
    return evenNumbers;
}


function getOddNumbers(numbers) {
    let oddNumbers = numbers.filter((number) => number % 2 !== 0);
    return oddNumbers;
}

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(getEvenNumbers(numbers)); // [2, 4, 6, 8,10]
console.log(getOddNumbers(numbers)); // [1, 3, 5, 7, 9]