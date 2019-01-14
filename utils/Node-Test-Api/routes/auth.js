import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

export default (app) => {
  const { config } = { config: app.config };

  const User = app.datasource.models.Users;

  app
    .route('/token')
    .post((req, res) => {
      // verifica se no corpo da requisição existe um email e um password
      if (req.body.email && req.body.password) {
        const { email } = { email: req.body.email };
        const { password } = { password: req.body.password };

        User
          .findOne({ where: { email } })
          .then((user) => {
            // Se o usuário for encontrado
            // Compara o Hash da password do banco com a senha enviada na requisição
            if (User.isPassword(user.password, password)) {
              const payload = { id: user.id };

              // return o token de autenticação criptografado.
              res.json({
                token: jwt.encode(payload, config.jwtSecret),
              });
            } else {
              // senão
              // usuário não está autorizado
              res.sendStatus(HttpStatus.UNAUTHORIZED); // 401
            }
          })
          .catch(() => {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
          });
      } else {
        res.sendStatus(HttpStatus.UNAUTHORIZED); // 401
      }
    });
};
