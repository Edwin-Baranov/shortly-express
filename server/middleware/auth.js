const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  // console.log('req.cookies.shortlyid:', req.cookies.shortlyid);
  Promise.resolve(req.cookies.shortlyid)
    .then(hash => {
      // console.log('first then:', hash);
      if (!hash) {
        throw hash;
      }
      return models.Sessions.get({ hash });
    })
    .tap(session => {
      // console.log('first tap:', session);
      if (!session) {
        throw session;
      }
    })
    // initializes a new session
    .catch(() => {
      // console.log('CATCH');
      return models.Sessions.create()
        .then(results => {
          return models.Sessions.get({ id: results.insertId });
        })
        .tap(session => {
          res.cookie('shortlyid', session.hash);
        });
    })
    .then(session => {
      req.session = session;
      next();
    });
};

/*Generate Session to database
    Result of the inclution of the database is returned
    use inclustion data to GET the session data from database
    set req.session to the data object from get request from database
  */



















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

