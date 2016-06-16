'use strict';

const debug = require('debug')('familiar:error-response');
const AppError = require('./app-error');

module.exports = function(req, res, next){
  res.sendError = function(err){
    debug('sendError');
    console.error('Error-response', err.message);
    if(AppError.isAppError(err)){
      res.status(err.statusCode).send(err.responseMessage);
      return;
    }
    res.status(500).send('interal server error');
  };
  next();
};'use strict';
