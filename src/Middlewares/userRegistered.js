const users = require('../data/users.json')

module.exports = (req, res, next) => {
    
    const user = users.find(user => user.nombre.toLowerCase().trim() === req.query.name.toLowerCase().trim())

    if (user) {
        next()
    } else {
        res.render('user/login')
    }
}