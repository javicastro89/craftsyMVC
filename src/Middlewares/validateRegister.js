const { check } = require('express-validator')

// Validator
module.exports = [
    check('nombre')
        .notEmpty().withMessage('El campo nombre es requerido').bail()
        .isLength({min: 3}).withMessage('El nombre tiene que tener al menos 3 caracteres'),
    check('email')
        .notEmpty().withMessage('El campo email es requerido').bail()
        .isEmail().withMessage('Email inválido'),
    check('password')
        .notEmpty().withMessage('El campo contraseña es requerido').bail()
        .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    check('pais')
        .notEmpty().withMessage('El campo pais es requerido')
]