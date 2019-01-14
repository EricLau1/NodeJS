import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRouter from './routes/book';
import usersRouter from './routes/user';
import authRouter from './routes/auth';
import authorization from './auth';

const app = express();
app.config = config;
app.datasource = datasource(app);

app.set('port', 7000);

const auth = authorization(app);

app.use(bodyParser.json());

// agora o express irá usar o midleware de autenticação
app.use(auth.initialize());

app.auth = auth;

booksRouter(app);
usersRouter(app);
authRouter(app);


export default app;
