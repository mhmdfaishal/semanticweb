var express = require('express');
var router = express.Router();

/* Controllers */
const indexcontroller = require('../controllers/index');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get('/', indexcontroller.index);
router.get('/getprofile/:npm', indexcontroller.getProfile);

module.exports = router;
