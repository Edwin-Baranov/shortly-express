const parseCookies = (req, res, next) => {
  //console.log('req', req);
  var cookies = {};
  if (req.headers.cookie) {
    var parssedCookiesArr = req.headers.cookie.split('; ');
    parssedCookiesArr.forEach(cookie => {
      var preCookieObj = cookie.split('=');
      cookies[preCookieObj[0]] = preCookieObj[1];
    });
  }
  req.cookies = cookies;
  next();
};

module.exports = parseCookies;


//shortlyid=18ea4fb6ab3178092ce936c591ddbb90c99c9f66

//shortlyid: '18ea4fb6ab3178092ce936c591ddbb90c99c9f66'

// cookies = {
//   shortlyid: '18ea4fb6ab3178092ce936c591ddbb90c99c9f66'
// }