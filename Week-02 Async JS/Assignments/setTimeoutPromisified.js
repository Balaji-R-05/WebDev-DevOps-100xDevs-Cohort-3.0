function setTimeoutPromisified(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

setTimeoutPromisified(5000).then(() => {
    console.log("Hello, World!");
});