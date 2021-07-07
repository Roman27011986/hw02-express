const { AuthService, UsersService } = require('../services');
const serviceUser = new UsersService();
const serviceAuth = new AuthService();
const jimp = require('jimp');
const fs = require('fs').promises;
const path = require('path');
// require('dotenv').config();
const IMG_DIR = path.join('public', 'avatars');

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
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await serviceAuth.login({
      email,
      password,
    });
    if (token) {
      return res.status(200).json({
        status: 'success',
        code: '200',
        data: {
          token,
          user: {
            email,
            subscription: user.subscription,
          },
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

const currentUser = async (req, res, next) => {
  return res.status(200).json({
    status: 'success',
    code: '200',
    data: {
      email: req.user.email,
      subscription: req.user.subscription,
    },
  });
};

const patchAvatar = async (req, res, next) => {
  if (req.file) {
    const img = await jimp.read(req.file.path);
    await img
      .autocrop()
      .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
      .writeAsync(req.file.path);
    console.log(req.file);
    await fs.rename(req.file.path, path.join(IMG_DIR, req.file.filename));
    const newUrl = `http://${req.headers.host}/avatars/${req.file.filename}`;

    await serviceUser.patchAvatar(req.user.id, newUrl);
    return res.status(200).json({ statuss: 'success', code: '200', url: newUrl });
  }
  res.redirect('/');
};

const verify = async (req, res, next) => {
  try {
    //передаем токен верификации
    const result = await serviceUser.verify(req.params);
    if (result) {
      return res.status(200).json({
        code: '200',
        message: 'Verification successful',
      });
    } else {
      return next({
        status: '404 Not Found',
        message: 'User not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  currentUser,
  patchAvatar,
  verify,
};
