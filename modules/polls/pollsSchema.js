const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const pollsSchema = new Schema({
  answers : [{
    type: ObjectId,
    ref: 'answers'
  }],
  question : [String]
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_at' }} );


module.exports = pollsSchema;
