var mongoose = require("mongoose");

var Local = require("../models/Local");

var localController = {};

// NÃo presente nos slides
localController.list = function (req, res) {
    Local.find({}).exec((err, local) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log(local);
      res.render("../views/local/list", { local: local });
    }
  });
};

localController.show = function (req, res) {
    Local.findOne({ _id: req.params.id }).exec(function (err, local) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/local/show", { local: local });
    }
  });
};

localController.create = function (req, res) {
  res.render("../views/local/create");
};

localController.save = async function (req, res) {
  var local = new Local(req.body);

  const lat = local.latitude;
  const lon = local.longitude;
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=b7b0da0ee738487183d21372eb3f9685`;


console.log(lat);
console.log(lon);

  try {
    const response = await fetch(url);
    const data = await response.json();


    local.street = data.features[0].properties.address_line1;

    console.log(data.features[0].properties.address_line1);

    local.locationname = data.features[0].properties.name;
    local.country = data.features[0].properties.country;
    local.postcode = data.features[0].properties.postcode;
    local.url = url;


    await local.save();


    console.log("Successfully created a local.");
    res.redirect("/local/show/" + local._id);
  } catch (error) {
    console.log(error);
    res.render("../views/local/create");
  }
};

localController.edit = function (req, res) {
    Local.findOne({ _id: req.params.id }).exec(function (err, local) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/local/edit", { local: local });
    }
  });
};

localController.update = function (req, res) {
    Local.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        address: req.body.address,
      },
    },
    { new: true },
    function (err, local) {
      if (err) {
        console.log(err);
        res.render("../views/local/edit", { local: req.body });
      }
      res.redirect("/local/show/" + local._id);
    }
  );
};

localController.delete = function (req, res) {
  Local.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        longitude:"",
        latitude:"",
        url:"",
        street:"",
        country:"",
        postcode:"",
        locationname:"",
        event:"",
      },
    },
    { new: true },
    function (err, local) {
      if (err) {
        console.log(err);
        res.render("../views/local/edit", { local: req.body });
      }
      res.redirect("/local/list");
    }
  );
};

module.exports = localController;