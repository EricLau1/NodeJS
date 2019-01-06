var readline = require('readline');
var resp = "";

var leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

leitor.question("Qual o seu nome? ", function(answer) {
    var resp = answer;
    console.log("\nOlá, " + resp + "! :)" );
    leitor.close();
});