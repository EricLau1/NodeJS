var express = require("express");
var bodyParser = require('body-parser');
var usersRouter = require('./routes/users');
var config = require('./config/config');
var database = require('./config/database');

const app = express();
app.config = config;
app.set('port', 3000);
app.use(bodyParser.json());
app.database = database(app);

app.route('/')
    .get(function (req, res) {
        res.send("Olá mundo!");
    });


usersRouter(app);

module.exports = app;