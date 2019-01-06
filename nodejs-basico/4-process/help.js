var options = [
    'a) pid',
    'b) titulo',
    'c) arquitetura',
    'd) plataforma',
    'e) vars. ambiente',
    'm) memória ocupada',
    'u) uptime',
    'v) versões',
    't) data table',
    'q) quit',
    '\n'
];

module.exports.shwoOptions = function () {
    options.forEach((value) => console.log(value));
}