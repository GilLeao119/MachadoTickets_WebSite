var mongoose = require("mongoose");

var Store = require("../models/Store");
var events = require("../models/Events");
var adm = require("../models/Adm");
var local = require("../models/Local");

var storeController = {};

// NÃo presente nos slides
storeController.list = function (req, res) {

events.find({}).then(eventos => {
  Store.find({}).then(store => {
    local.find({}).exec((err, local) => {
      if (err) {
        console.log("Error: ", err);
      } else {
        console.log(store);
        res.render("../views/store/list", { events: eventos,store: store, local: local });
      }
    });
}).catch(err => {
console.log(err);
})
}).catch(err => {
  console.log(err);
})
};

storeController.listTickets = function (req, res) {

  events.find({}).then(eventos => {
      Store.find({}).exec((err, store) => {
          
      if (err) {
        console.log("Error: ", err);
      } else {
        console.log(store);
        res.render("../views/store/listTickets", { events: eventos,store: store });
      }
    });
  }).catch(err => {
    console.log(err);
  })
  };

storeController.show = function (req, res) {
    Store.findOne({ _id: req.params.id }).exec(function (err, store) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/store/show", { store: store });
    }
  });
};


storeController.create = function (req, res) {
    /* events.find({}).exec((eventos) => {
      console.log(eventos);
    //    adm.find({}).exec((adm) => {
                res.render("../views/store/create",{ events: eventos,adm:adm});
    //    });
    }); */

    events.findOne({_id: req.params.id}).exec(function (err, events) {
      adm.find({}).then(adm => {
      res.render("../views/store/create",{ events: events,adm:adm});
    }).catch(err => {
      console.log(err);
    })
  });
};

storeController.createlocal = function (req, res) {
  /* local.find({}).exec((eventos) => {
    console.log(eventos);
  //    adm.find({}).exec((adm) => {
              res.render("../views/store/create",{ events: eventos,adm:adm});
  //    });
  }); */

  local.findOne({_id: req.params.id}).exec(function (err, local) {
    adm.find({}).then(adm => {
    res.render("../views/store/createlocal",{ local: local,adm:adm});
  }).catch(err => {
    console.log(err);
  })
});
};

storeController.savelocal = function (req, res) {
  var store = new Store(req.body);
  console.log(req.params.id)
  local.findOne({_id: req.params.id}).exec(function (err, local) {
    console.log(local);
    store.ptotal = store.pkid * local.pkid + store.padult * local.padult + store.pold * local.pold ;
    store.save(function (err) {
      if (err) {
        console.log(err);
        res.render("../views/store/create");
      } else {
        console.log("Successfully created an local.");
        res.redirect("/store/show/" + store._id);
      }
    });
});
  
};

storeController.save = function (req, res) {
  var store = new Store(req.body);
  console.log(req.params.id)
  events.findOne({_id: req.params.id}).exec(function (err, events) {
    console.log(events);
    store.ptotal = store.pkid * events.pkid + store.padult * events.padult + store.pold * events.pold ;
    store.save(function (err) {
      if (err) {
        console.log(err);
        res.render("../views/store/create");
      } else {
        console.log("Successfully created an events.");
        res.redirect("/store/show/" + store._id);
      }
    });
});
  
};

storeController.edit = function (req, res) {
    Store.findOne({ _id: req.params.id }).exec(function (err, store) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/store/edit", { store: store });
    }
  });
};

storeController.update = function (req, res) {
    Store.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        event: req.body.event,
        adm: req.body.adm,
      },
    },
    { new: true },
    function (err, store) {
      if (err) {
        console.log(err);
        res.render("../views/store/edit", { store: req.body });
      }
      res.redirect("/store/show/" + store._id);
    }
  );
};

storeController.delete = function (req, res) {
  Store.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: "",
        events:"",
        adm:"",
      },
    },
    { new: true },
    function (err, events) {
      if (err) {
        console.log(err);
      }
      res.redirect("/store/listTickets");
    }
  );
};

module.exports = storeController;