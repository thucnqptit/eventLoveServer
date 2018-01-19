const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const eventOwnersSchema = new Schema({
  name : {
     type : String,
     required : true
  },
  username : {
     type : String,
     required : true,
     unique : true
  },
  password : {
     type : String,
     required : true
  },
  access_token:{
    type: String
  },
  events : [{
    type: ObjectId,
    ref: 'events'
  }]
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_at' }} );

// generating a hash
eventOwnersSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
eventOwnersSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = eventOwnersSchema;
