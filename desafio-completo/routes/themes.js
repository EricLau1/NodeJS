const ThemesController = require("../controllers/themes");

module.exports = (app) => {

    const themesController = new ThemesController(app.datasource.models.themes);

    app.route('/themes')
        .get((req, res) => {

            themesController
                .getAll()
                .then(data => res.json(data))
                .catch(error => {
                    res.status(400)
                    console.log(error);
                });

        })
        .post((req, res) => {

            themesController
                .create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(422)
                    console.log(error);
                });
        }); 
    

    app.route('/themes/:id')
        .get((req, res) => {

            themesController
                .getById(req.params)
                .then(data => res.json(data))
                .catch(error => {
                    res.status(400)
                    console.log(error);
                });
        })
        .put((req, res) => {

            themesController
                .update(req.body, req.params)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(422)
                    console.log(error);
                });
        })
        .delete((req, res) => {

            themesController
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