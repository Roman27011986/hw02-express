const express = require('express');
const { signup, login, logout, currentUser } = require('../../controllers/users');
const guard = require('../../helpers/guard');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', guard, logout);
router.get('/current', guard, currentUser);

module.exports = router;
