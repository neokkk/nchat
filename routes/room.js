const express = require('express');

const { Room } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/list', isLoggedIn, async (req, res, next) => {
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

module.exports = router;