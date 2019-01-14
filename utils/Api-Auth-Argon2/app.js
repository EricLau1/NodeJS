const express = require("express");
const bodyParser = require("body-parser");

const config = require("./config/config");
const datasource = require("./config/datasource");
const Email = require('./utils/email');

const indexRouter =  require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require('./routes/auth');

const authorization = require('./auth');

const app = express();
const port = 3000;
app.set('port', port);

app.config = config;
app.datasource = datasource(app);

app.email = new Email(app.config);

const auth = authorization(app);

app.use(bodyParser.json({
    limit:'5mb'
}));

app.use(auth.initialize());
app.auth = auth;

indexRouter(app);
usersRouter(app);
authRouter(app);


module.exports = app;
