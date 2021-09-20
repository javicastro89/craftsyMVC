var express = require('express');
var router = express.Router();
const {list,create,edit} = require('../controllers/adminController')

/* GET users listing. */
router.get('/', list)

router.get('/create', create)
router.get('/edit', edit)

module.exports = router;
