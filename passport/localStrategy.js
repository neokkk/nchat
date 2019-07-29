const LocalStrategy = require('passport-local').Strategy,
      bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = passport => {
    passport.use(new LocalStrategy({
        usernameField: 'loginEmail',
        passwordField: 'loginPwd'
    }, async (email, password, done) => {
        try {
            const exUser = User.findOne({ where: { email } });

            if (exUser) { // 이미 유저가 있는 경우
                const result = await bcrypt.compare(password, exUser.password);

                if (result) { // 비밀번호가 맞으면
                    done(null, exUser);
                } else { // 비밀번호가 틀리면
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            } else { // 유저가 없는 경우
                done(null, false, { message: '가입되지 않은 회원입니다.' });
            }
        } catch (err) {
            console.error(err);
            done(err);
        }
    }));
}