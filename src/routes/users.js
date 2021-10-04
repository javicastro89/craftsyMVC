const express = require('express');
const router = express.Router();
const { login, register, processRegister, processLogin, check, logout } = require('../controllers/userController')
const validate = require('../Middlewares/validateRegister')
const guestUser = require('../Middlewares/guestUser')

/* GET users listing. */

// CREATE USER
router.get('/register', guestUser, register)
router.post('/register', validate, processRegister)

//LOGIN USER
router.get('/login', guestUser, login)
router.post('/login', processLogin)

// Chekear si un usuario está logueado
router.get('/logueado', check)

// Cerrar sesión
router.get('/logout', logout)

module.exports = router;
