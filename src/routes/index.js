var express = require('express');
var router = express.Router();
const { index } = require('../controllers/indexController')

const userRegistered = require('../Middlewares/userRegistered')

/* GET home page. */
router.get('/', index);

router.get('/form', (req, res) => {
    res.render('user/form')
})

router.get('/products', userRegistered, (req, res) => {
    res.render('products/products')
})



module.exports = router;
