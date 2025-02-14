var express = require('express');
var router = express.Router();
var local = require("../controllers/LocalController.js");

// Get all employees
router.get('/list', function(req, res, next) {
    local.list(req, res);
  });

// Get single employee by id
router.get('/show/:id', function(req, res) {
    local.show(req, res);
});

// Create employee
router.get('/create', function(req, res) {
    local.create(req, res);
});

// Save employee
router.post('/save', function(req, res) {
    local.save(req, res);
});

// Edit employee
router.get('/edit/:id', function(req, res) {
    local.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
    local.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
    local.delete(req, res);
});

module.exports = router;
