const express = require('express');
const { signup, login, logout } = require('../../controllers/users');
const guard = require('../../helpers/guard');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', guard, logout);

module.exports = router;
