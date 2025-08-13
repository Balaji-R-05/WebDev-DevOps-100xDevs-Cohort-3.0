// A Promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation
//  and its resulting value. 

// Defining a promise is hard
// Usinf a promise is easy

function setTimeoutPromisified(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function callback() {
	console.log("5 seconds have passed");
}

// setTimeoutPromisified(5000).then(callback)

let p = setTimeoutPromisified(3000).then(callback);
console.log(p);