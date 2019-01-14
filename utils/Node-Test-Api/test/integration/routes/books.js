import jwt from 'jwt-simple';

describe('Rotas para Livros', () => {
  const Book = app.datasource.models.Books;
  const User = app.datasource.models.Users;

  const { jwtSecret } = { jwtSecret: app.config.jwtSecret };

  const defaultBook = {
    id: 1,
    title: 'default book',
    description: 'default description',
  };

  let token = null;

  // antes de cada um dos Testes
  beforeEach((done) => {
    // Autenticando um usuário defulat para testar as rotas
    User
      .destroy({ where: {} })
      .then(() => User.create({
        name: 'Jane doe',
        email: 'janedoe@email.com',
        password: 'qwert',
      }))
      .then((user) => {
        // se não existir nada no banco, a tabela é limpada
        Book
          .destroy({ where: {} })
          .then(() => Book.create(defaultBook)) // cria um livro default
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });

  // Rota GET /books
  describe('Rota GET /books', () => {
    it('retorna uma lista de livros', (done) => {
      // {request} é uma variável global definida no 'helpers.js'
      request
        .get('/books')
        .set('Authorization', `bearer ${token}`) // Header Aunteticado
        .end((err, res) => {
          // {expect} é uma variável global definida no 'helpers.js'
          // irá verificar se a propriedade enviada e igual ao objeto definido
          expect(res.body[0].id).to.be.eql(defaultBook.id);
          expect(res.body[0].title).to.be.eql(defaultBook.title);
          expect(res.body[0].description).to.be.eql(defaultBook.description);

          done(err);
        });
    });
  });
  // End Rota

  // Rota GET /books/{id}
  describe('Rota GET /books/{id}', () => {
    it('retorna um livro pelo id', (done) => {
      // {request} é uma variável global definida no 'helpers.js'
      request
        .get('/books/1')
        .set('Authorization', `bearer ${token}`) // Header Aunteticado
        .end((err, res) => {
          // {expect} é uma variável global definida no 'helpers.js'
          // irá verificar se a propriedade enviada e igual ao objeto definido
          expect(res.body.id).to.be.eql(defaultBook.id);
          expect(res.body.title).to.be.eql(defaultBook.title);
          expect(res.body.description).to.be.eql(defaultBook.description);

          done(err);
        });
    });
  });
  // End Rota

  // Rota POST /books
  describe('Rota POST /books', () => {
    it('Cria um novo Livro', (done) => {
      const book = {
        id: 2,
        title: 'new book',
        description: 'new description',
      };

      // {request} é uma variável global definida no 'helpers.js'
      request
        .post('/books')
        .set('Authorization', `bearer ${token}`) // Header Aunteticado
        .send(book)
        .end((err, res) => {
          // {expect} é uma variável global definida no 'helpers.js'
          // irá verificar se a propriedade enviada e igual ao objeto definido
          expect(res.body.id).to.be.eql(book.id);
          expect(res.body.title).to.be.eql(book.title);
          expect(res.body.description).to.be.eql(book.description);

          done(err);
        });
    });
  });
  // End Rota

  // Rota PUT /books
  describe('Rota PUT /books/{id}', () => {
    it('Atualiza um Livro', (done) => {
      const book = {
        id: 1,
        title: 'updated book',
      };

      // {request} é uma variável global definida no 'helpers.js'
      request
        .put('/books/1')
        .set('Authorization', `bearer ${token}`) // Header Aunteticado
        .send(book)
        .end((err, res) => {
          // {expect} é uma variável global definida no 'helpers.js'
          // No Update retorna o numero de updates realizados com sucesso
          expect(res.body).to.be.eql([1]);

          done(err);
        });
    });
  });
  // End Rota

  // Rota DELETE /books
  describe('Rota DELETE /books/{id}', () => {
    it('Deleta um Livro', (done) => {
      // {request} é uma variável global definida no 'helpers.js'
      request
        .delete('/books/1')
        .set('Authorization', `bearer ${token}`) // Header Aunteticado
        .end((err, res) => {
          // {expect} é uma variável global definida no 'helpers.js'
          // No Delete é esperado o status da requisição
          expect(res.statusCode).to.be.eql(204);
          // 204 é o status para 'No Content'

          done(err);
        });
    });
  });
  // End Rota
});
