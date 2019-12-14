const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
  firstName: {type:String, require: true},
  lastName: {type:String, require: true},
  emailId: {type:String, require: true},
  address1: {type:String, require: true},
  address2: {type:String, require: true},
  country: {type:String, require: true},
  state: {type:String, require: true},
  
});
module.exports = mongoose.model('Billing', postSchema)
