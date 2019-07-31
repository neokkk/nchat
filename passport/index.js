const local = require('./localStrategy');

const { User } = require('../models');

module.exports = passport => {
    console.log(9);
    passport.serializeUser((user, done) => {
        console.log(10);
        done(null, user.id); // done(err, success, fail)
    });

    console.log(11);
    passport.deserializeUser((id, done) => {
        console.log(12);
        User
            .findOne({
                where: { id },
            })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local(passport);
}