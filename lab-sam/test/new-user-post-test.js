'use strict';

//env variables
process.env.APP_SECRET = process.env.APP_SECRET || 'SHHH I is a secret';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/db';

//npm
const expect = require('chai').expect;
const request = require('superagent-use');
const superPromise = require('superagent-promise-plugin');
const debug = require('debug')('familiar:new-user-POST-test');

//app
const userController = require('../controller/user-controller');

//constants
const port = process.env.PORT || 3000;
const baseURL = `localhost:${port}/api`;
const server = require ('../server');
request.use(superPromise);

describe('testing newUser POST route', function(){
  before((done) => {
    debug('before block new-user-POST-test');
    if (! server.isRunning) {
      server.listen(port, () => {
        server.isRunning = true
        debug(`server is up and running on > ${port}`);
        done()
      })
      return;
    }
    done();
  })

  after((done) => {
    debug('after block new-user-POST-test');
    if (!server.isRunning) {
      server.close(() =>{
        server.isRunning = false;
        debug('server is down!');
        done();
      })
      return;
    }
    done();
  })

  describe('testing POST /api/signup w/ valid request', function(){
    after((done) => {
      debug('after POST api/signup');
      userController.removeAllUsers()
      .then(() => done())
      .catch(done)
    })

    it('should return a token', function(done){
      debug('test POST /api/signup w/ valid data')
      request.post(`${baseURL}/signup`)
      .send({
        username: 'DungeonMaster',
        password: 'opensaysme'
      })
      .then(res =>{
        expect(res.status).to.equal(200)
        expect(res.text.length).to.equal(205)
        done()
      })
      .catch(done)
    })
  })
  describe('testing POST /api/signup w/ invalid request', function(){
    after((done) => {
      debug('after POST api/signup');
      userController.removeAllUsers()
      .then(() => done())
      .catch(done)
    })

    it('should return an error 400', function(done){
      debug('test POST /api/signup errors w/ invalid data')
      request.post(`${baseURL}/signup`)
      .send({
        password: 'opensaysme'
      })
      .then(res =>{
        expect(res.status).to.equal(400)
        done()
      })
      .catch(done)
    })
  })
})
