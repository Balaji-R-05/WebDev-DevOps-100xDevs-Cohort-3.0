setTimeout(function () {
    console.log("Hello 1");
    setTimeout(function () {
        console.log("Hello 2");
        setTimeout(function () {
            console.log("Hello 3");
        }, 5000)
    }, 3000)
}, 1000)