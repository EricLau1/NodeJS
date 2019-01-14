import express from 'express';

const app = express();

app.set('port', 3000);

app.get('/', (req, res) => {
    res.send("NodeJs com Babel!");
});

app.listen(app.get('port'), () => {
    console.log(`listening port ${app.get('port')}`);
});