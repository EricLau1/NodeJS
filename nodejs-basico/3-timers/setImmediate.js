console.log("A " + new Date());
setImmediate(function () {
    console.log("I " + new Date());
}, 0);
console.log("B " + new Date());