function sum(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function doOperation(a, b, op) {
  // return op(a, b);
  let val = op(a, b);
  return val;
}

let ans1 = doOperation(1, 2, sum);

console.log(ans1); // 3

let ans2 = doOperation(1, 2, divide);

console.log(ans2); // 0.5
