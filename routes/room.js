const express = require('express');

const { Room } = require('../models');
// const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const { roomName, roomLimit, roomPwd } = req.body.data;

    await Room.create({
        name: roomName,
        host: 'null',
        limit: roomLimit,
        password: roomPwd === '' ? null : roomPwd
    })
              .then(result => {
                  console.log('result');
                  console.log(result);
                  res.send(result);
              })
              .catch(err => {
                  console.error(err);
                  next(err);
              });
});

router.get('/list', async (req, res, next) => {
    await Room.findAll()
              .then(rooms => { 
                  console.log('rooms');
                  console.log(rooms);
                  res.send(rooms);
              })
              .catch(err => {
                  console.error(err);
                  next(err);
              });
});

router.post('/:id/chat', async (req, res, next) => {

});

module.exports = router;