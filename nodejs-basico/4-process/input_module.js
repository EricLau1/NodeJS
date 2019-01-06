module.exports.leia = function (callback) {
    process.stdin.on('readable', function () {
        
        process.stdin.resume();
        
        var chunk = process.stdin.read();
        // replace substitui o enter/quebra de linha ou \n por caractere vazio
        if (chunk) callback(chunk.toString().replace(/\n/, ''));
    });

}