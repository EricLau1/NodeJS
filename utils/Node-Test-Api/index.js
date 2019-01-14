import app from './app';

app.listen(app.get('port'), () => {
  console.log(`api rodando na porta ${app.get('port')}`);
});
