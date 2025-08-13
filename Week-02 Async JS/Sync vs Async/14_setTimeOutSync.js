console.log("Hello World!");

function setTimeoutSync(timeout) {
    let startTime = new Date();
    while (1) {
        let currentTime = new Date()
        if (currentTime.getTime() - startTime.getTime() > timeout) {
            break;
        }
    }
}

setTimeoutSync(5000);

console.log("Sync Timeout completed.");