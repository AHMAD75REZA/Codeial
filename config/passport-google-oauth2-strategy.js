const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "78475496245-p58n1rtvd3nif509v3df1he9vdvunrpg.apps.googleusercontent.com",  //'<YOUR_GOOGLE_CLIENT_ID>', // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
    clientSecret: "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",  //'<YOUR_GOOGLE_CLIENT_SECRET>', // e.g. _ASDFA%KFJWIASDFASD#FAD-
    callbackURL: "http://localhost:8001/users/auth/google/callback",
},

    function (accessToken, refreshToken, profile, done) {
        // find a user
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) { console.log('error in google strategy-passport', err); return; }
            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user) {
                // if found, set this user as req.user
                return done(null, user);
            } else {
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) { console.log('error in creating user google strategy-passport', err); return; }

                    return done(null, user);
                });
            }

        });
    }


));


module.exports = passport;
