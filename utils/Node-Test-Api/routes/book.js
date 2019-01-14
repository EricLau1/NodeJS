import BookController from '../controllers/book';

export default (app) => {
  const bookController = new BookController(app.datasource.models.Books);

  app.route('/books') // requer autenticação para acessar o recurso
    .all(app.auth.authenticate())
    .get((req, res) => {
      bookController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    }) // aproveitando a mesma rota para enviar POST
    .post((req, res) => {
      bookController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        })
        .catch(() => res.status(412));
    });

  // requer autenticação para acessar o recurso
  app.route('/books/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      bookController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      bookController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        })
        .catch(() => res.status(412));
    })
    .delete((req, res) => {
      bookController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
