const UsersController = require("../controllers/users");

module.exports = (app) => {

    const usersController = new UsersController(app.datasource.models.users);

    app.route('/users')
        .get((req, res) => {

            usersController
                .getAll()
                .then(data => res.json(data))
                .catch(error => {
                    res.status(400)
                    console.log(error);
                });

        })
        .post((req, res) => {

            usersController
                .create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(422)
                    console.log(error);
                });
        }); 
    

    app.route('/users/:id')
        .get((req, res) => {

            usersController
                .getById(req.params)
                .then(data => res.json(data))
                .catch(error => {
                    res.status(400)
                    console.log(error);
                });
        })
        .put((req, res) => {

            usersController
                .update(req.body, req.params)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(422)
                    console.log(error);
                });
        })
        .delete((req, res) => {

            usersController
                .delete(req.params)
                .then(result => {
                    res.json(result);
                    res.status(204);
                })
                .catch(error => {
                    res.status(422)
                    console.log(error);
                });
        });
};