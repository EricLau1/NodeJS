const passport = require("passport");
const Strategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (app) => {

    const Users = app.datasource.models.users;
    const jwtConfig = app.config.jwt;

    const options = {};

    options.secretOrKey = jwtConfig.secret;
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    const strategy = new Strategy(options, (payload, done) => {

        Users
            .findOne({where:  payload.id })
            .then( user => {

                if(user) {
                    return done(null, {
                        id: user.id,
                        email: user.email
                    });
                }

                return done(null ,false);
                
            })
            .catch(e => done(e, null));
    });

    passport.use(strategy);

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', jwtConfig.session)
    }
};