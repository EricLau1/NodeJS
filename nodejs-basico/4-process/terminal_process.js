/* 
    Passando valores pela linha de comando

    node terminal_process.js arg1 arg2 arg3 ...argN
*/

// retorna os valores passado na linha de comando
process.argv.forEach((value) => console.log(value));
// O primeiro parâmentro ja é preenchido com o comando "node" que retorna o caminho de instação do mesmo.
// O segundo parâmentro ja é preenchido com o nome do arquivo que será executado e o retorna o caminho onde o mesmo se encontra.

// O Slice retorna um Array a partir da posição indicada no parâmetro
var options = process.argv.slice(2);

console.log(options);

