var express = require('express');
var bodyParser = require('body-parser')
var config = require('./config/config');
var datasource = require('./config/datasource');
var usersRouter = require('./routes/users'); 
var authRouter = require('./routes/auth');
var authorization = require('./auth');

const app = express();
app.config = config;
app.datasource = datasource(app);

app.set('port', 3000);

const auth = authorization(app);

app.use(bodyParser.json());

app.use(auth.initialize());

app.auth = auth;

usersRouter(app);
authRouter(app);

app.get('/', (req, res) => {
    res.send("My Api! :)");
});

app.listen( app.get('port'), () => {
    console.log(`Api listening on port ${ app.get('port') }`);
});