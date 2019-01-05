const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config/config');
const datasource = require('./config/datasource');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const themesRouter = require('./routes/themes');
const groupsRouter = require('./routes/groups');

const app = express();

app.config = config;
app.datasource = datasource(app);

app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: true
}));

app.use(bodyParser.json({
    limit: '5mb'
}));

indexRouter(app);
usersRouter(app);
themesRouter(app);
groupsRouter(app);

module.exports = app;