var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  Name: {type: String, required: true},
  Animal: String,
  Age: Number,
  Image: String
}); //end userSchema

var User = mongoose.model('newPet', userSchema);

module.exports= User;
