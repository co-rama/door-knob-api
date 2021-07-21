const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: false,
  },
  mobile : {
    type: Number,
    required: false,
  },
 
}, {timestamps: true});
module.exports = mongoose.model("Customer", customerSchema);
