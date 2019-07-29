const express = require('express'),
      flash = require('connect-flash'),
      morgan = require('morgan'),
      cookieParser = require('cookie-parser'),
      session = require('express-session');

require('dotenv').config();

const db = require('./schemas'),
      webSocket = require('./socket');

const authRouter = require('./routes/auth'),
      roomRouter = require('./routes/room'),
      userRouter = require('./routes/user');

const app = express();
const sessionMiddleware = session({
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
});

db.connect();

app.set('port', process.env.PORT || 8020);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);
app.use(flash());

app.use('/auth', authRouter);
app.use('/room', roomRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
});

const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});

webSocket(server, app, sessionMiddleware);