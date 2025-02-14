var express = require("express");
var router = express.Router();
var events = require("../controllers/EventsController.js");
// Adicionado para submissão de ficheiros
var fs = require("fs");
var bodyParser = require("body-parser"); // npm install body-parser --save
var multer = require("multer"); // npm install multer --save
// -----------------------------------------------------------------------

// Adicionado ----------------------------------------

// Multer storage option
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/"); // cb(null, "tmp/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //  + "-" + Date.now() + ".pdf"
  },
});

var upload = multer({ storage: storage });

router.use(express.static("public"));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(upload.single("file")); // upload.single("image")



// Get all employees
router.get("/list", function (req, res, next) {
  events.list(req, res);
});

// Get single employee by id
router.get("/show/:id", function (req, res) {
  events.show(req, res);
});

// Create employee
router.get("/create", function (req, res) {
  events.create(req, res);
});

// Save employee
router.post("/save", function (req, res) {
  events.save(req, res);
});

// Save employee
router.post("/saveTickets", function (req, res) {
  events.saveTickets(req, res);
});

// Edit employee
router.get("/edit/:id", function (req, res) {
  events.edit(req, res);
});

// Edit update
router.post("/update/:id", function (req, res) {
  events.update(req, res);
});

// Edit update
router.post("/delete/:id", function (req, res, next) {
  events.delete(req, res);
});

module.exports = router;
