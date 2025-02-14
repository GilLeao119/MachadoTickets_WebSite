var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');


router.post('/login' ,authController.login );
router.post('/register', authController.register );
router.get('/show/:id', authController.show);
router.get('/tickets/:name', authController.tickets);
router.get('/users' , authController.showAll );
  
module.exports = router;