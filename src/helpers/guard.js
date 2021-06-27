const passport = require('passport');
require('../config/passport');

const guard = (req, res, next) => {
  //колбек это done из конфига
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return next({
        status: '401',
        message: 'Not authorized',
      });
    }
    //положили юзера что бы получить к нему доступ в контактах
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
