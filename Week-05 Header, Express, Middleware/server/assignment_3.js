/*
Assignment #1 - Create a map functions that takes 2 inputs an array and a transformation callback/function 
and transform the array into a new one using transformation function
*/

function map(arr, fn) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        res.push(fn(arr[i]));
    }
    return res;
}

const double = (x) => x * 2;
const arr = [1, 2, 3, 4, 5];
const result = map(arr, double);
console.log(result);