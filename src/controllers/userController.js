const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')


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
                email: req.body.email,
                contraseña: req.body.password,
                pais: req.body.pais
            }
        
            usuarios.push(usuario)
        
            fs.writeFileSync(ruta, JSON.stringify(usuarios, null, 2))
        
            res.redirect('/')
        } else {
            // res.send(errors.mapped())
            res.render('user/register',  {errors: errors.mapped(), old: req.body})
        }

       
    
    }
}