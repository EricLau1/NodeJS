var UsersController = require('../controllers/users');

module.exports = (app) => {

    const usersController = new UsersController(app.datasource.models.users);

    app.route('/users')
        .all(app.auth.authenticate())
        .get((req, res) => {

            usersController
                .getAll()
                .then(response => res.json(response.data))
                .catch(error => res.json(error));

        })
        .post((req, res) => {

            usersController
                .create(req.body)
                .then(response => {
                    res.status(response.statusCode);
                    res.json(response.data);
                })
                .catch(error => {
                    console.log(error);
                    res.json(error);
                });
        });

    app.route('/users/:id')
        .all(app.auth.authenticate())
        .get((req, res) => {
  
            usersController
                .getById(req.params)
                .then((response) => {
                    res.status(response.statusCode);
                    res.json(response.data);
                })
                .catch(error => res.json(error));
        })
        .put((req, res) => {

            usersController
            .update(req.body, req.params)
            .then((response) => {
                res.status(response.statusCode);
                res.json(response.data);
            })
            .catch(error => res.json(error));
        })
        .delete((req, res) => {

            usersController
                .delete(req.params)
                .then(response => {
                    res.status(response.statusCode);
                    res.json(response);
                })
                .catch(error => res.json(error));
        });
};