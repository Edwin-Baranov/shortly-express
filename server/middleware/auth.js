const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  // console.log('req.cookies.shortlyid:', req.cookies.shortlyid);
  Promise.resolve(req.cookies.shortlyid)
    .then(hash => {
      // console.log('first then:', hash);
      if (!hash) {
        throw Error('No cookie found');
      }
      return models.Sessions.get({ hash });
    })
    .tap(session => {
      // console.log('first tap:', session);
      if (!session) {
        throw Error('No session found');
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

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.verifySession = (req, res, next) => {
  if (!moduels.Session.isLoggedIn(req.session)) {
    res.redirect('/login');
  } else {
    next();
  }
};