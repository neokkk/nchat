const local = require('./localStrategy');

const { User } = require('../models');

module.exports = passport => {
    passport.serializeUser((user, done) => {
        console.log('serial');
        console.log(user.id)
        done(null, user.id); // done(err, success, fail)
    });

    passport.deserializeUser((id, done) => {
        console.log('id')
        console.log(id)

        User
            .findOne({
                where: { id },
            })
            .then(user => {
               
                console.log('user22')
                console.log(user)

                done(null, user);
            })
            .catch(err => {
                console.log('error occured');
                console.log(err)
                done(err)
            });
    });

    local(passport);
}