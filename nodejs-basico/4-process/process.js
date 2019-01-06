var help = require('./help');

var options = process.argv.slice(2);

if(options.length < 1) {
    
    help.shwoOptions();
    return

}

switch(options[0]) {
    case '1':
        console.log('pid: ' + process.pid);
        break;
    case '2':
        console.log("título: " + process.title);
        break;
    case '3':
        console.log("arquitetura: " + process.arch);
        break;
    case '4':
        console.log("plataforma: " + process.platform);
        break;
    case '5':
        console.table({ "pid": process.pid, "title": process.title, "arch": process.arch, "platform": process.platform });
        break;
    default:
        help.shwoOptions();
}