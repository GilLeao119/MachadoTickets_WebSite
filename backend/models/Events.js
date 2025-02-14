var mongoose = require('mongoose');

var EventsSchema = new mongoose.Schema({
  
  name:String,
  nif: Number,
  datainicio:String,
  datafim:String,
  horainicio:String,
  horafim:String,
  local:String,
  pkid:String,
  padult:String,
  pold:String,
  maxTick:String,
  filename:String,
  desc:String,
  file:String,

  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Events', EventsSchema);
