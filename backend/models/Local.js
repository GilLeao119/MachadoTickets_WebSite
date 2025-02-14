var mongoose = require('mongoose');

var LocalSchema = new mongoose.Schema({
  
  longitude:String,
  latitude:String,
  url:String,
  street:String,
  country:String,
  postcode:String,
  locationname:String,
  event:String,
  pkid:String,
  padult:String,
  pold:String,


  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Local', LocalSchema);
