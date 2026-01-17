setTimeout(() => {
    console.log("Hello 1");
    setTimeout(() => {
        console.log("Hello 2");
        setTimeout(() => {
            console.log("Hello 3");
        }, 5000)
    }, 3000)
}, 1000)