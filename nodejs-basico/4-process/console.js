
var meuConsole = {
    log: function (text) {
        // Utilizando process para imprimir mensagens
        process.stdout.write(text + '\n');
    },
    error: function (e) {
        // Utilizando process para imprimir mensagens de erro
        process.stderr.write(e + '\n');
    } 
};

meuConsole.log("A");
meuConsole.log("Z");
meuConsole.log("X");
meuConsole.error("B");