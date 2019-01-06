var net = require('net');

// array que irá guardar as conexões de todos os clientes
var connections = [];

var broadcast = function (message, origin) {

    connections.forEach(function (connection) {
    
        // não envia a mensagem de volta para o mesmo cliente que a enviou
        if(connection === origin) return;
        
        connection.write(message);

    });


}

net.createServer(function (connection) {

    // adiciona a conexao ao array de conexões
    connections.push(connection);

    // envia uma mensagem para os client's
    connection.write('Server online!');


    // imprime uma mensagem vinda dos client's
    connection.on('data', function (message) {

        var command = message.toString();

        if (command.indexOf('/nickname') === 0) {

            // indexOf retorna a posição do primeiro elemento 
            // da substring encontrada na string,
            // ou seja a primeira palavra do da string
            // deve começar com /nickname, para que ela retorne a posição 0

            nickname = command.replace('/nickname ', '');

            broadcast(`${connection.nickname || 'anônimo'} agora é ${nickname}`);

            connection.nickname = nickname;   
        
            return;

        } 
        
        broadcast(`${connection.nickname || 'anônimo'} > ${message}`, connection);
    });

    // detecta quando um cliente é encerrado
    connection.on('end', function () {
        
        broadcast(`${connection.nickname || 'anônimo'} saiu.`, connection);

        // remove a conexão do array de conexões
        connections.splice(connections.indexOf(connection), 1);

    });

}).listen(3000);