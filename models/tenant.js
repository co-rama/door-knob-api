const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tenantSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  mobile : {
    type: Number,
    required: false,
  },
  duration : {
    type: String,
    required: true
  },
  endDuration : {
    type: String,
    required: true
  }
 
}, {timestamps: true});
module.exports = mongoose.model("Tenant", tenantSchema);
