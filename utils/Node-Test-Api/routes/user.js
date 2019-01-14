import UserController from '../controllers/user';

export default (app) => {
  const userController = new UserController(app.datasource.models.Users);

  app.route('/users')
    .all(app.auth.authenticate()) // requer autenticação para acessar o recurso
    .get((req, res) => {
      userController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    }) // aproveitando a mesma rota para enviar POST
    .post((req, res) => {
      userController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        })
        .catch(() => res.status(412));
    });


  app.route('/users/:id')
    .all(app.auth.authenticate()) // requer autenticação para acessar o recurso
    .get((req, res) => {
      userController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      userController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        })
        .catch(() => res.status(412));
    })
    .delete((req, res) => {
      userController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
