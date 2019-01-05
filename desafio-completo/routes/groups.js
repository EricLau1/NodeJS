const GroupsController = require('../controllers/groups');
module.exports = (app) => {

    const groupsController = new GroupsController(
        {
            users: app.datasource.models.users,
            themes: app.datasource.models.themes,
            groups: app.datasource.models.groups
        },
        app.datasource.sequelize
    );

    app.route('/groups')
        .get(async (req, res) => {
                
                const response = await groupsController.getAll();
                //console.log(response);
                res.json(response);
            });

    app.route('/groups/:theme')
        .post(async (req, res) => {

            const result = await groupsController.create(req.body, req.params);
            console.log(result);
            res.json(result);

        });
}