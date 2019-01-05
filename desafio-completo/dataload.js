const app = require('./app');
const data = require('./data/users');

data.initUsers(app.datasource.models.users, app.datasource.sequelize); 

