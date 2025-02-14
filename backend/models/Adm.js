var mongoose = require('mongoose');

var EmployeeSchema = new mongoose.Schema({
  
  name:String,
  nif:String,
  email:String,
  password:String,
  points:{
    type: Number, 
    default: 0 
  },
  role: { type: String, enum: ['adm', 'employee', 'user'], default: 'user' },

  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
