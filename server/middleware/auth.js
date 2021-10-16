const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  var session = {};
  models.Sessions.
    req.sessions = session;
  next();
};




//1. access our parsed cookies
//2. looks up the user data related to THAT session
//3.

// createSession(requestWithoutCookies, response, function() {
//   var session = requestWithoutCookies.session;
//   expect(session).to.exist;
//   expect(session).to.be.an('object');
//   expect(session.hash).to.exist;
//   done();
// });

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

