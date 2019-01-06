var a = setTimeout(function () {
    console.log("D-1: " + new Date());
}, 3000);
var b = setTimeout(function () {
    console.log('D-2: ' + new Date());
}, 3000);

// cancela a execução de um setTimeout
clearTimeout(a);