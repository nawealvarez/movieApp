const passport = require('passport');
const passportJWT = require('passport-jwt');
const StrategyJwt = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const db = require('../database/models/index');
const config = require('../database/config/index');

module.exports = {
    initPassport() {
        passport.use( new StrategyJwt({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.jwtSecret,
        }, async (jwtPayload, done) => {
            try {
                const user = await db.User.findOne({where: { id: jwtPayload.sub }});
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }))
    },
}