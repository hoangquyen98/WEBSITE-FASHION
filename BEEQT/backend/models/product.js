
const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
  productId: {type:String, require: true},
  productName: {type:String, require: true},
  productCategory: {type:String, require: true},
  productPrice: {type:Number, require: true},
  productDescription: {type:String, require: true},
  productImageUrl: {type:String, require: true},
  productAdded: {type:Number},
  productQuatity: {type:Number},
  ratings: {type:Number},
  favourite: {type:Boolean},
  productSeller: {type:String},
});
module.exports = mongoose.model('Product', productSchema)
