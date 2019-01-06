var a = setInterval(function (){
    console.log(new Date());
}, 1000);

setTimeout(function (){
    // cancela o setInterval após 5 segundos ou 5000 milissegundos
    clearInterval(a);
}, 5000);