const express = require('express'),
      passport = require('passport');

const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            next(authError);
        }

        if (!user) {
            req.flash('loginError', info.message);
            res.redirect('/');
        }

        req.login(user, loginError => {
            if (loginError) {
                console.error(loginError);
                next(loginError);
            }

            res.redirect('/');
        });
    })
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});