var express = require('express');
var router = express.Router();
var store = require("../controllers/StoreController.js");

// Get all employees
router.get('/list', function(req, res, next) {
    store.list(req, res);
  });

  router.get('/listTickets', function(req, res, next) {
    store.listTickets(req, res);
  });

// Get single employee by id
router.get('/show/:id', function(req, res) {
    store.show(req, res);
});

// Create employee
router.get('/create/:id', function(req, res) {
    store.create(req, res);
});

// Create employee
router.get('/createlocal/:id', function(req, res) {
    store.createlocal(req, res);
});

// Save employee
router.post('/save/:id', function(req, res) {
    store.save(req, res);
});

// Save employee
router.post('/savelocal/:id', function(req, res) {
    store.savelocal(req, res);
});

// Edit employee
router.get('/edit/:id', function(req, res) {
    store.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
    store.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
    store.delete(req, res);
});

module.exports = router;
