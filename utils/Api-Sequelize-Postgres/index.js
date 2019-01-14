var app = require('./app');

app.listen(app.get('port'), function() {
    console.log(`Api rodando na porta ${app.get('port')}`);
});


