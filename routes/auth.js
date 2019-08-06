const express = require('express'),
      passport = require('passport'),
      bcrypt = require('bcrypt');

const router = express.Router();

const { User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.post('/join', async (req, res, next) => {
    const { nick, email, pwd } = req.body.data;
    const hash = await bcrypt.hash(pwd, 12);

    await User.findOrCreate({ where: { email }, defaults: { nick, email, password: hash } })
              .spread((user, created) => {
                  if (created) {
                      console.log('created!');
                      res.send({ message: '회원가입되었습니다.' });
                  } else {
                      console.log('already been');
                      res.send({ message: '이미 존재하는 회원입니다.' });
                  }
              })
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user) => {
        if (authError) {
            console.error(authError);
            next(authError);
        }

        if (!user) {
            req.flash('loginError', '존재하지 않는 회원입니다.');
        }

        req.login(user, loginError => {
            if (loginError) {
                console.error(loginError);
                next(loginError);
            }
        });

        res.redirect('http://localhost:3000');
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.post('/isLoggedIn', (req, res) => {
    console.log('req.user');
    console.log(req.user);

    if (req.isAuthenticated()) {
        res.send('user', req.user);
    } else {
        res.send('user', null);
    }
});

module.exports = router;