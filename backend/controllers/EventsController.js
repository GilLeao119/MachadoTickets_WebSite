var mongoose = require("mongoose");

var Events = require("../models/Events");
var store = require("../models/Store");
var local = require("../models/Local");
var fs = require("fs");

var eventsController = {};

// NÃo presente nos slides
eventsController.list = function (req, res) {
  Events.find({}).exec((err, events) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log(events);
      res.render("../views/events/list", { events: events });
    }
  });
};

eventsController.show = function (req, res) {
  Events.findOne({ _id: req.params.id }).exec(function (err, events) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/events/show", { events: events });
    }
  });
};

eventsController.create = function (req, res) {
  local
    .find({})
    .then((local) => {
      res.render("../views/events/create", { local: local });
    })
    .catch((err) => {
      console.log(err);
    });
};

eventsController.save = function (req, res) {
  var events = new Events({
    name: req.body.name,
    nif: req.body.nif,
    pkid: req.body.pkid,
    padult: req.body.padult,
    pold: req.body.pold,
    maxTick: req.body.maxTick,
    eventsId: req.body.eventsId,
    datainicio: req.body.datainicio,
    datafim: req.body.datafim,
    horainicio: req.body.horainicio,
    horafim: req.body.horafim,
    local: req.body.local,
    desc: req.body.desc,
    file: req.file.filename, // save the file name in fileName field
  });
  events.save(function (err) {
    if (err) {
      console.log(err);
      res.render("../views/events/create");
    } else {
      console.log("Successfully created an events.");
      res.redirect("/events/show/" + events._id);
    }
  });
};

eventsController.edit = function (req, res) {
  Events.findOne({ _id: req.params.id }).exec(function (err, events) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/events/edit", { events: events });
    }
  });
};

eventsController.update = function (req, res) {
  Events.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        nif: req.body.nif,
        pkid: req.body.pkid,
        padult: req.body.padult,
        pold: req.body.pold,
        maxTick: req.body.maxTick,
        datainicio: req.body.datainicio,
        datafim: req.body.datafim,
        horainicio: req.body.horainicio,
        horafim: req.body.horafim,
        local: req.body.local,
        desc: req.body.desc,
      },
    },
    { new: true },
    function (err, events) {
      if (err) {
        console.log(err);
        res.render("../views/events/edit", { events: req.body });
      }
      res.redirect("/events/show/" + events._id);
    }
  );
};

eventsController.delete = async function(req, res){
  try {
    const ticket = await store.findOne({eventsId: req.params.id})
    console.log(store.eventsId)
    console.log(req.params.id)
    if(ticket && ticket.name != ""){
      Events.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: "",
            nif: "",
            pkid: "",
            padult: "",
            pold: "",
            maxTick: "",
            img: "",
            datainicio: "",
            datafim: "",
            horainicio: "",
            horafim:"",
            local: "",
            desc: "Evento removido",
          },
        },
        { new: true },
        function (err, events) {
          if (err) {
            console.log(err);
            res.render("../views/events/edit", { events: req.body });
          }
          res.redirect("/events/list");
        }
      );
    }else{
      Events.remove({ _id: req.params.id }, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Ticket deleted");
          res.redirect("/events/list");
        }
      });
    }
  } catch (error) {

  }
}

module.exports = eventsController;