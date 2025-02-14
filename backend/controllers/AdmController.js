var mongoose = require("mongoose");

var Employee = require("../models/Adm");

var employeeController = {};

// NÃo presente nos slides
employeeController.list = function (req, res) {
  Employee.find({}).exec((err, employees) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log(employees);
      res.render("../views/adm/list", { employees: employees });
    }
  });
};

employeeController.show = function (req, res) {
  Employee.findOne({ _id: req.params.id }).exec(function (err, employee) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/adm/show", { employee: employee });
    }
  });
};

employeeController.create = function (req, res) {
  res.render("../views/adm/create");
};

employeeController.save = function (req, res) {
  var employee = new Employee(req.body);

  employee.save(function (err) {
    if (err) {
      console.log(err);
      res.render("../views/adm/create");
    } else {
      console.log("Successfully created an adm.");
      res.redirect("/adm/show/" + employee._id);
    }
  });
};

employeeController.edit = function (req, res) {
  Employee.findOne({ _id: req.params.id }).exec(function (err, employee) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/adm/edit", { employee: employee });
    }
  });
};

employeeController.update = function (req, res) {
  Employee.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        nif: req.body.nif,
        email: req.body.email,
        password: req.body.password,
      },
    },
    { new: true },
    function (err, employee) {
      if (err) {
        console.log(err);
        res.render("../views/adm/edit", { employee: req.body });
      }
      res.redirect("/adm/show/" + employee._id);
    }
  );
};

employeeController.delete = function (req, res) {
  Employee.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: "",
        nif: "",
        email: "",
        password:"",
      },
    },
    { new: true },
    function (err, employee) {
      if (err) {
        console.log(err);
      }
      res.redirect("/adm/list");
    }
  );
};

module.exports = employeeController;