const express = require('express');
const { signup, login, logout, currentUser } = require('../../controllers/users');
const guard = require('../../helpers/guard');
const { validateCreateUser } = require('../../validation/contacts');
const router = express.Router();

router.post('/signup', validateCreateUser, signup);
router.post('/login', validateCreateUser, login);
router.post('/logout', guard, logout);
router.get('/current', guard, currentUser);

module.exports = router;
