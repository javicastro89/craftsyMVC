const express = require('express');
const router = express.Router();
const { login, register, processRegister } = require('../controllers/userController')
const validate = require('../Middlewares/validateRegister')

/* GET users listing. */

// CREATE USER
router.get('/register', register)
router.post('/register', validate, processRegister)

//LOGIN USER
router.get('/login', login)

module.exports = router;
