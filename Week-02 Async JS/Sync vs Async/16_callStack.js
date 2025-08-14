/**
 * Call Stack
 *  - A call stack is a mechanism for an interpreter to keep track of its place in a script that calls multiple functions.
 *  - When a script calls a function, the interpreter adds it to the call stack and then starts executing the function.
 */

function first() {
  console.log("First");
}

function second() {
  first();
  console.log("Second");
}

second();
