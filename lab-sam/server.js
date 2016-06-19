'use strict';
//npm stuff
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const httpErrors = require('http-errors');
const debug = require('debug')('familiar:server');

//my stuff
const handleError = require('./lib/error-handler');
const newUserRouter = require('./route/new-user-router');
//in app stuff
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost/familiar';

// setup mongoose-mongo connection
mongoose.connect(mongoURI);

app.use(morgan('dev'));

app.use('/api', newUserRouter);
app.all('*', function(req, res, next){
  debug('404 ALL route');
  next(httpErrors(404, 'route has not been writen yet'))
});

app.use(handleError);

//pull cord to start server
const server = app.listen(port, function(){
  debug('|------ server is running on', port);
});

server.isRunning = true;
module.exports = server;
