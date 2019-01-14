import jwt from 'jwt-simple';

describe('Rotas para Usuários', () => {
  const User = app.datasource.models.Users;

  const { jwtSecret } = { jwtSecret: app.config.jwtSecret };

  const defaultUser = {
    id: 1,
    name: 'default name',
    email: 'default@email.com',
    password: 'default123',
  };

  let token = null;

  // antes de cada um dos Testes
  beforeEach((done) => {
    // se não existir nada no banco, a tabela é limpada
    User
      .destroy({ where: {} })
      .then(() => User.create({
        name: 'Jane doe',
        email: 'janedoe@email.com',
        password: 'qwert',
      }))
      .then((user) => {
        // se não existir nada no banco, a tabela é limpada
        User
          .destroy({ where: {} })
          .then(() => User.create(defaultUser)) // cria um user default
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });

  // Rota GET /users
  describe('Rota GET /users', () => {
    it('retorna uma lista de usuários', (done) => {
      // {request} é uma variável global definida no 'helpers.js'
      request
        .get('/users')
        .set('Authorization', `bearer ${token}`) // Header Aunteticado
        .end((err, res) => {
          // {expect} é uma variável global definida no 'helpers.js'
          // irá verificar se a propriedade enviada e igual ao objeto definido
          expect(res.body[0].id).to.be.eql(defaultUser.id);
          expect(res.body[0].name).to.be.eql(defaultUser.name);
          expect(res.body[0].email).to.be.eql(defaultUser.email);

          done(err);
        });
    });
  });
  // End Rota

  // Rota GET /users/{id}
  describe('Rota GET /users/{id}', () => {
    it('retorna um usuário pelo id', (done) => {
      // {request} é uma variável global definida no 'helpers.js'
      request
        .get('/users/1')
        .set('Authorization', `bearer ${token}`) // Header Aunteticado
        .end((err, res) => {
          // {expect} é uma variável global definida no 'helpers.js'
          // irá verificar se a propriedade enviada e igual ao objeto definido
          expect(res.body.id).to.be.eql(defaultUser.id);
          expect(res.body.name).to.be.eql(defaultUser.name);
          expect(res.body.email).to.be.eql(defaultUser.email);

          done(err);
        });
    });
  });
  // End Rota

  // Rota POST /users
  describe('Rota POST /users', () => {
    it('Cria um novo usuário', (done) => {
      const newUser = {
        id: 2,
        name: 'new user',
        email: 'new@email.com',
        password: 'password123',
      };

      // {request} é uma variável global definida no 'helpers.js'
      request
        .post('/users')
        .set('Authorization', `bearer ${token}`) // Header Aunteticado
        .send(newUser)
        .end((err, res) => {
          // {expect} é uma variável global definida no 'helpers.js'
          // irá verificar se a propriedade enviada e igual ao objeto definido
          expect(res.body.id).to.be.eql(newUser.id);
          expect(res.body.name).to.be.eql(newUser.name);
          expect(res.body.email).to.be.eql(newUser.email);


          done(err);
        });
    });
  });
  // End Rota

  // Rota PUT /users
  describe('Rota PUT /users/{id}', () => {
    it('Atualiza um usuário', (done) => {
      const user = {
        id: 1,
        name: 'updated user',
        email: 'updated@email.com',
        password: 'updated123',
      };

      // {request} é uma variável global definida no 'helpers.js'
      request
        .put('/users/1')
        .set('Authorization', `bearer ${token}`) // Header Aunteticado
        .send(user)
        .end((err, res) => {
          // {expect} é uma variável global definida no 'helpers.js'
          // No Update retorna o numero de updates realizados com sucesso
          expect(res.body).to.be.eql([1]);

          done(err);
        });
    });
  });
  // End Rota

  // Rota DELETE /users/:id
  describe('Rota DELETE /users/{id}', () => {
    it('Deleta um usuário', (done) => {
      // {request} é uma variável global definida no 'helpers.js'
      request
        .delete('/users/1')
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
