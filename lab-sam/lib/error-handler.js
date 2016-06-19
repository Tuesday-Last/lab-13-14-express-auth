'use strict';

const debug = require('debug')('familiar:error-response');
const AppError = require('./app-error');
const httpErrors = require('http-errors');

module.exports = function(err, req, res, next){
  console.error(err.message);
  if (err.status && err.name){
    debug('http-error');
    res.status(err.status).send(err.name);
    next()
    return;
  }

  debug('server error');
  err = httpErrors(500, err.message);
  res.status(err.status).send(err.name)
};
