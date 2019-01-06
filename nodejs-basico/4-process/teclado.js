process.stdin.on('readable', function () {
    var conteudo = process.stdin.read();
    if (conteudo) {
        // retorna o conteudo digitado em bytes
        console.log(conteudo);
        // retorn o conteudo digitado em String
        console.log(conteudo.toString());
    }
});