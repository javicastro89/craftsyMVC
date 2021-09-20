const express = require('express');
const router = express.Router();
const {login, register} = require('../controllers/userController')
const fs = require('fs')
const path = require('path')

/* GET users listing. */

// CREATE USER
router.get('/register', register)
router.post('/register', (req, res) => {
    const ruta = path.join(__dirname,'..','data','users.json')

    const usuariosRegistrados = fs.readFileSync(ruta,'utf-8')
    let usuarios

    if (usuariosRegistrados === '') {
        usuarios = []
    } else {
        usuarios = JSON.parse(usuariosRegistrados)
    }

    const usuario = {
        nombre: req.body.nombre,
        email: req.body.email
    }

    usuarios.push(usuario)

    fs.writeFileSync(ruta, JSON.stringify(usuarios, null, 2))

    res.redirect('/users/register')

} )

//LOGIN USER
router.get('/login', login)

module.exports = router;
