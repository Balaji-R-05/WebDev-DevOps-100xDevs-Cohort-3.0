// 1. Write a function that takes a `user` as an input and greets them with their name and age


function greetUser(user) {
    console.log("Hello " + user.name + ", You are " + user.age + " years old.");
}
let user = {
    name: "Bharat",
    age: 21
};
greetUser(user); // Hello Bharat, You are 21 years old.



// 2. Write a function that takes a new object as input which has `name` , `age`  and `gender` and greets the user with their gender (Hi `Mr/Mrs/Others` harkirat, your age is 21)

function greet(user) {
    if (user.gender === "male") {
        console.log("Hi Mr " + user.name + ", your age is " + user.age);
    } else if (user.gender === "female") {
        console.log("Hi Mrs " + user.name + ", your age is " + user.age);
    } else {
        console.log("Hi " + user.name + ", your age is " + user.age);
    }
}
let user1 = {
    name: "B",
    age: 21,
    gender: "male"
}
greet(user1); // Hi Mr Bharat, your age is 21



// 3. Also tell the user if they are legal to vote or not

function greet(user) {
    if (user.gender === "male") {
        if (canVote(user.age)) {
            console.log("Hi Mr " + user.name + ", your age is " + user.age + " and you are eligible to vote");
        } else {
            console.log("Hi Mr " + user.name + ", your age is " + user.age + " and you are not eligible to vote");
        }
    } else if (user.gender == "female") {
        if (canVote(user.age)) {
            console.log("Hi Mrs " + user.name + ", your age is " + user.age + " and you are eligible to vote");
        } else {
            console.log("Hi Mrs " + user.name + ", your age is " + user.age + " and you are not eligible to vote");
        }
    } else {
        if (canVote(user.age)) {
            console.log("Hi " + user.name + ", your age is " + user.age + " and you are eligible to vote");
        } else {
            console.log("Hi " + user.name + ", your age is " + user.age + " and you are not eligible to vote");
        }
    }
}

// function to check if the user is eligible to vote or not
function canVote(age) {
    if (age >= 18) {
        return true;
    } else {
        return false;
    }
}


let user2 = {
    name: "Bharat",
    age: 21,
    gender: "male"
}


greet(user2); // Hi Mr Bharat, your age is 21 and you are eligible to vote