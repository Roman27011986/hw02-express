const passport = require('passport');
require('../config/passport');

const guard = (req, res, next) => {
  //колбек это done из конфига
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return next({
        status: '403',
        message: 'Forbbiden',
      });
    }
    //положили юзера что бы получить к нему доступ в когтактах
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
