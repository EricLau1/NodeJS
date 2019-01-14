const HttpStatus = require("http-status");
const jwt = require("jwt-simple");

module.exports = (app) => {

    const config = app.config;

    const Users = app.datasource.models.users;

    app.route('/token')
        .post((req, res) => {

            if(req.body.email && req.body.password) {

                const email = req.body.email;
                const password = req.body.password;

                // Busca usuário pelo email
                Users
                    .findOne({ where: { email } })
                    .then(data => {
                        
                        const user = data.dataValues;
        
                        // verificando as senhas                         
                        if(Users.verifyPassword(user.password, password)) {
                            
                            const payload = { id: user.id };

                            res.json({
                                token: jwt.encode(payload, config.jwtSecret)
                            });

                        } else {
                            // se as senhas foram diferentes
                            res.sendStatus(HttpStatus.UNAUTHORIZED);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        res.sendStatus(HttpStatus.UNAUTHORIZED);
                    });
            } else {
                res.sendStatus(HttpStatus.UNAUTHORIZED);
            }
        });
};