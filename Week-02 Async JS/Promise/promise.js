function setTimeoutPromisified(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const main = () => {
    console.log("I am using Promise");
}

setTimeoutPromisified(3000).then(main);