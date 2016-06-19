'use strict';

const Router = require('express').Router;
const debug = require('debug')('familiar:newUserRouter');
const jasonParser = require('body-parser').json();

const userControl = require('../controller/user-controller');

const newUserRouter = module.exports = new Router();

newUserRouter.post('/signup', jasonParser, function(req, res, next){
  debug('POST /api/signup');
  userControl.newUser(req.body)
  .then( (token) => res.send(token))
  .catch(next);
});
