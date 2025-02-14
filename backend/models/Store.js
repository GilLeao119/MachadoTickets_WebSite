var mongoose = require('mongoose');

var StoreSchema = new mongoose.Schema({
  
  name:String,
  pkid:String,
  padult:String,
  pold:String,
  events:String,
  eventsId:String,
  ptotal:String,
  adm:String,

  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Store', StoreSchema);
