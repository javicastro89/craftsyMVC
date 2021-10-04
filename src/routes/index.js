var express = require('express');
var router = express.Router();
const { index } = require('../controllers/indexController')
const authUser = require('../Middlewares/authUser')

// const userRegistered = require('../Middlewares/userRegistered')

/* GET home page. */
router.get('/', index);

// router.get('/form', (req, res) => {
//     res.render('user/form')
// })

router.get('/products', authUser, (req, res) => {
    res.render('products/products')
})



module.exports = router;
