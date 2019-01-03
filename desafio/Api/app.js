const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config/config');
const datasource = require('./config/datasource');
const email = require('./email/email');
const usersRouter = require('./routes/users'); 
const authRouter = require('./routes/auth');
const authorization = require('./auth');

const themesRouter = require('./routes/themes');
const groupsRouter = require('./routes/groups');

const app = express();

app.config = config;
app.datasource = datasource(app);
app.email = email(app);

app.set('port', 3000);
app.set('limit', '5mb');

const auth = authorization(app);

app.use(bodyParser.urlencoded({
	limit: app.get('limit'),
	parameterLimit: 100000,
	extended: true
}));

app.use(bodyParser.json({
	limit: app.get('limit')
}));

app.use(cors());
app.use(auth.initialize());
app.auth = auth;

app.route('/')
	.get((req, res) => {

		res.json({
			description: "Desafio Sassmart",
			dev: {
				name: "Eric lau de Oliveira",
				email: "ericlau.oliveira@gmail.com",
				github: "https://github.com/EricLau1?tab=repositories"
			},
			os: "Ubuntu",
			platform: "Linux",
			arch: "x86_64"
		});
	});

usersRouter(app);
authRouter(app);
themesRouter(app);
groupsRouter(app);

module.exports = app;