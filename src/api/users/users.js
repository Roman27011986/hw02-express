const express = require('express');
const {
  signup,
  login,
  logout,
  currentUser,
  patchAvatar,
  verify,
} = require('../../controllers/users');
const guard = require('../../helpers/guard');
const upload = require('../../helpers/upload');
const { validateCreateUser } = require('../../validation/contacts');
const router = express.Router();

router.get('/verify/:token', verify);
router.post('/signup', validateCreateUser, signup);
router.post('/login', validateCreateUser, login);
router.post('/logout', guard, logout);
router.get('/current', guard, currentUser);
router.patch('/avatars', guard, upload.single('avatar'), patchAvatar);

module.exports = router;
