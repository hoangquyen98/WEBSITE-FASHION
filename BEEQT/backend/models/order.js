
const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
  date: {type:String, require: true},
  product: {type: String, require: true},
  creator: {type:String, require: true},
  state : {type: Boolean, require: true}
});
module.exports = mongoose.model('Order', orderSchema)
