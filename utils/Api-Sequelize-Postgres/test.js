var fs = require('fs');
var path = require('path');

const dir = path.join(__dirname, 'models');
//console.log(dir);

fs.readdirSync(dir).forEach(function (file) {
    console.log(file);
});

