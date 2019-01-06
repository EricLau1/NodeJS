// retorna o inicio da execução
/*
console.time('T');
setTimeout(function() {
    // retorna o final da execução
    console.timeEnd('T');
}, 0);
*/
console.time('T');
setImmediate(function() {
    // retorna o final da execução
    console.timeEnd('T');
}, 0);