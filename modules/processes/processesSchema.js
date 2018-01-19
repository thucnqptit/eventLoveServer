const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const processesSchema = new Schema({
  name : {
     type : String
  },
  des : {
     type : String
  },
  start : {
     type : String
  },
  end:{
    type: String
  }
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_at' }} );

module.exports = processesSchema;
