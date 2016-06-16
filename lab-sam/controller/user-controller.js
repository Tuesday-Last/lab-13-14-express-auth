'use strict';

const debug = require('debug')('familiar:controller');

const User = require('../model/user');

exports.newUser = function(reqBody){
  debug('newUser');
  return new Promise((resolve, reject) =>{
  var password = reqBody.password;
  delete reqBody.password;
  var user = new User(reqBody);
  user.generateHash(password)
  .then( user => user.save())
  .then( user => user.generateToken())
  .then( token => resolve(token))
  .catch(reject)
});
};
