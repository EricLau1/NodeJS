var net = require('net');

var client = net.connect({
    host: '127.0.0.1',
    port: 3000
});

client.on('connect', function () {
    // envia uma mensagem para o servidor
    client.write('entrou.');
});

// recebe uma mensagem do servidor
client.on('data', function (message) {
    console.log(message.toString());
});

// dectecta quando o servidor é encerrado
client.on('end', function () {
    // encerra a conexão do cliente
    console.log("server is down...");
    process.exit(0);
});

// espera uma entrada do teclado
process.stdin.on('readable', function () {

    // pega a mensagem digitada no teclado
    var message = process.stdin.read();
    
    // se não existir uma mensagem 
    if(!message) return;

    // o replace remove o \n que é colocado na mensagem quando se aperta o ENTER.
    message = message.toString().replace(/\n/, '');

    // mensagem enviada para o servidor
    client.write(message);

});