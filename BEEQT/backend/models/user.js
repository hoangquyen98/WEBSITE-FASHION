
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {type:String, require: true, unique: true},
  password: {type:String, require: true},
  userName: {type:String},
  phoneNumber: {type:String},
  isAdmin: {type:Boolean},
  avatar: {type:String},
  createdOn: {type:String},
  firstName: {type:String},
  lastName: {type:String},
  address1:{type:String},
  address2: {type:String},
  country: {type:String},
  state: {type:String},
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)
