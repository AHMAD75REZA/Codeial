const passport = require('passport');
// const { deleteOne } = require('../models/user');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeil'
}

passport.use(new JWTStrategy(opts, function (err, user) {

    User.findById(jwtpayLoad._id, function (err, user) {
        if (err) {
            console.log('Error in finding user from jwt');
            return;
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);

        }
    })
}));

module.exports = passport;