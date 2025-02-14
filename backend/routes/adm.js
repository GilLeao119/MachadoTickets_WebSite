var express = require('express');
var router = express.Router();
var adm = require("../controllers/AdmController.js");

// Get all employees
router.get('/', function(req, res, next) {
    res.render('adm/index', { title: 'Express' });
  });

router.get('/list', function(req, res) {
    adm.list(req, res);
});

// Get single employee by id
router.get('/show/:id', function(req, res) {
    adm.show(req, res);
});

// Create employee
router.get('/create', function(req, res) {
    adm.create(req, res);
});

// Save employee
router.post('/save', function(req, res) {
    adm.save(req, res);
});

// Edit employee
router.get('/edit/:id', function(req, res) {
    adm.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
    adm.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
    adm.delete(req, res);
});

module.exports = router;
