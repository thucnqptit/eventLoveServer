const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const eventsSchema = new Schema({
  name : {
     type : String,
     required : true
  },
  des : {
     type : String
  },
  end : {
    type: String
  },
  start:{
    type: String
  },
  address:{
    type: String
  },
  process:[{
    type: ObjectId,
    ref: 'processes'
  }],
  polls : [{
    type: ObjectId,
    ref: 'pools'
  }]
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_at' }} );

module.exports = eventsSchema;
