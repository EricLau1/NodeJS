module.exports = function (app) {

    const Users = app.database.models.users;

    var defaultUser = {
        name: "default user"
    };
  
    app.route('/users')
        .get(function (req, res) {
        
            Users
                .findAll({})
                .then(result => {
                    res.json(result);
                })
                .catch(error => res.status(400));

        })
        .post(function (req, res) {

            Users
                .create(req.body)
                .then(result => {
                    res.json(result);
                })
                .catch(error => res.status(412));

        });

    app.route('/users/:id')
        .get(function (req, res) {

            Users
                .findOne( { where: req.params } )
                .then((result) => {
                    res.json(result);
                })
                .catch(error => res.status(400));

        })
        .put(function (req, res) {

            Users  
                .update(req.body, { where: req.params } )
                .then((result) => res.json(result))
                .catch((error) => res.status(412));
        })
        .delete(function (req, res) {

            Users
                .destroy({ where: req.params })
                .then(result => res.json(result))
                .catch(error => res.status(412));

        });
  
}


