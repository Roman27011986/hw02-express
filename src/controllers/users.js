const { AuthService, UsersService } = require('../services');
const serviceUser = new UsersService();
const serviceAuth = new AuthService();
const signup = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  //перед созданием пользователя необходимо убедится что мыло незанято!!!
  const user = await serviceUser.findByEmail(email);
  if (user) {
    return next({
      status: '409',
      data: 'Conflict',
      message: 'Email in use',
    });
  }
  try {
    const newUser = await serviceUser.createUser({ email, password, subscription });
    return res.status(201).json({
      status: 'success',
      code: '201',
      user: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await serviceAuth.login({
      email,
      password,
    });
    if (token) {
      return res.status(200).json({
        status: 'success',
        code: '200',
        data: {
          token,
        },
      });
    }
    next({
      status: '401',
      message: 'Email or password is wrong',
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  const id = req.user.id;
  await serviceAuth.logout(id);
  return res.status(204).json({ status: 'success', code: '204' });
};

module.exports = {
  signup,
  login,
  logout,
};
