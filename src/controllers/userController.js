const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const ruta = path.join(__dirname,'..','data','users.json')
let usuariosRegistrados = fs.readFileSync(ruta,'utf-8')
usuariosRegistrados = JSON.parse(usuariosRegistrados)

module.exports = {
    login: (req, res) => {
        res.render('user/login')
      },
    register: (req, res) => {
        res.render('user/register')
      },
      processRegister: (req, res) => {
        const errors = validationResult(req)

        if (errors.isEmpty()) {
        
            const usuario = {
                nombre: req.body.nombre,
                email: req.body.email,
                contraseña: bcrypt.hashSync(req.body.password, 10),
                pais: req.body.pais
            }
        
            usuariosRegistrados.push(usuario)
        
            fs.writeFileSync(ruta, JSON.stringify(usuariosRegistrados, null, 2))
        
            res.redirect('/')
        } else {
            
            res.render('user/register',  {errors: errors.mapped(), old: req.body})
        }
    },
    processLogin: (req, res) => {

        const usuarioALoguear = usuariosRegistrados.find(usuario => usuario.email === req.body.email)

        if (usuarioALoguear && bcrypt.compareSync(req.body.password, usuarioALoguear.contraseña)) {
            req.session.usuarioLogueado = usuarioALoguear
            if (req.body.Recordarme !== undefined) {
                res.cookie('recordarme', usuarioALoguear.email, {maxAge: 20*1000} )
            }
            res.redirect('/')
        } else {
            res.render('user/login', {errors: {msg: 'Email o contraseña incorrecta'}})
        }
    },
    check: (req, res) => {
        if (req.session.usuarioLogueado !== undefined) {
            res.send(`El usuario logueado es ${req.session.usuarioLogueado.email}`)
        } else {
            res.send('Usuario no logueado')
        }
    },
    logout: (req, res) => {

        req.session.destroy()
        if (req.cookies.recordarme !== undefined) {
            res.cookie('recordarme', '', {maxAge: -1})
        }
        res.redirect('/')
    }
}