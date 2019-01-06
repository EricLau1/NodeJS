var help = require('./help');
var teclado = require('./input_module');
    
teclado.leia( function (option) {

    switch(option) {
        case 'a':
            console.log('pid: ' + process.pid);
            break;
        case 'b':
            console.log("título: " + process.title);
            break;
        case 'c':
            console.log("arquitetura: " + process.arch);
            break;
        case 'd':
            console.log("plataforma: " + process.platform);
            break;
        case 'e':
            console.dir(process.env);
            break;
        case 'm':
            console.log(process.memoryUsage());
            break;
        case 'u':
            console.log("uptime: " + process.uptime());
            break;
        case 'v':
            console.dir(process.versions);
            break;
        case 't':
            console.table({ 
                "pid": process.pid, 
                "title": process.title, 
                "arch": process.arch, 
                "platform": process.platform,
            });
            break;
        case 'q':
            process.exit(0);
            break;
        default:
            help.shwoOptions();
    }
});

// será executado apenas quando ocorrer um process.exit
process.on('exit', function () {
    console.log('Bye');
});

// executa em caso de erros que não foram tratados
process.on('uncaughtException', function () {
    console.log('error');
});

// Forçando um erro
a.b(); // está irá cair no 'uncaughtException', mas o programa continuará executando.