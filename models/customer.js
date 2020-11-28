const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 55,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports.customerSchema = customerSchema;
module.exports.Customer = Customer;
