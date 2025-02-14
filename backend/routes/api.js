var express = require('express');
var router = express.Router();
var StoreAPI = require('../controllers/StoreAPI');


router.get('/list', StoreAPI.list );
router.get('/listTickets', StoreAPI.listTickets );
router.get('/show/:id', StoreAPI.show );
router.post('/create', StoreAPI.create);
router.get('/image/:eventId', StoreAPI.getImageLocal);
router.post('/checkout', StoreAPI.checkout);~


router.param("id", StoreAPI.getByIdEvent);
  
module.exports = router;
