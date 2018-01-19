const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answersSchema = new Schema({
  content : {
     type : String,
     required : true
  },
  quantity : {
     type : Number,
     default : 0
  }
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_at' }} );


module.exports = answersSchema;
