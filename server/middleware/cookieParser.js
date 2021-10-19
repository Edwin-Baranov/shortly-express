const parseCookies = (req, res, next) => {
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