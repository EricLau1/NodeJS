import BookController from '../../../controllers/book';

describe('Controllers: Book', () => {
  describe('Me dê todos os livros: getAll()', () => {
    it('retorna uma lista de livros', () => {
      const Book = {
        findAll: td.function(),
      };

      const respostaEsperada = [
        {
          id: 1,
          title: 'Test Book',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      td.when(Book.findAll({})).thenResolve(respostaEsperada);

      const bookController = new BookController(Book);

      return bookController.getAll()
        .then(response => expect(response.data).to.be.eql(respostaEsperada));
    });
  });

  describe('Me dê um livro: getById()', () => {
    it('retorna um livro pelo id', () => {
      const Book = {
        findOne: td.function(),
      };

      const respostaEsperada = {
        id: 1,
        title: 'Test Book',
        created_at: new Date(),
        updated_at: new Date(),
      };

      td.when(Book.findOne({ where: { id: 1 } })).thenResolve(respostaEsperada);

      const bookController = new BookController(Book);

      return bookController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(respostaEsperada));
    });
  });

  describe('Cria um livro: create()', () => {
    it('novo livro criado', () => {
      const Book = {
        create: td.function(),
      };

      const requestBody = {
        title: 'Novo Livro',
      };

      const respostaEsperada = {
        id: 1,
        title: 'Novo Livro',
        created_at: new Date(),
        updated_at: new Date(),
      };

      td.when(Book.create(requestBody)).thenResolve(respostaEsperada);

      const bookController = new BookController(Book);

      return bookController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(respostaEsperada);
        });
    });
  });

  describe('Atualiza um livro: update()', () => {
    it('livro atualizado', () => {
      const Book = {
        update: td.function(),
      };

      const requestBody = {
        id: 1,
        title: 'Livro Atualizado',
      };

      const respostaEsperada = {
        id: 1,
        title: 'Livro Atualizado',
        created_at: new Date(),
        updated_at: new Date(),
      };

      td.when(Book.update(requestBody, { where: { id: 1 } })).thenResolve(respostaEsperada);

      const bookController = new BookController(Book);

      return bookController.update(requestBody, { id: 1 })
        .then((response) => { expect(response.statusCode).to.be.eql(200); });
    });
  });

  describe('Deleta um livro: delete()', () => {
    it('um livro será deletado', () => {
      const Book = {
        destroy: td.function(),
      };

      td.when(Book.destroy({ where: { id: 1 } })).thenResolve({});

      const bookController = new BookController(Book);

      return bookController.delete({ id: 1 })
        .then((response) => { expect(response.statusCode).to.be.eql(204); });
    });
  });
});
