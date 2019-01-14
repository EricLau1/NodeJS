import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export default (app) => {
  const User = app.datasource.models.Users;

  const options = {};

  // definições para passport-jwt
  options.secretOrKey = app.config.jwtSecret;
  // extrai o token o Header da Request
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  const strategy = new Strategy(options, (payload, done) => {
    // busca um usuário no banco pelo Id
    User.findOne({ where: payload.id })
      .then((user) => {
        // se o usuário for encotrado
        if (user) {
          // retorna o Id e o Email
          return done(null, {
            id: user.id,
            email: user.email,
          });
        }

        // senão
        return done(null, false);
      })
      .catch(error => done(error, null));
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', app.config.jwtSession),
  };
};
