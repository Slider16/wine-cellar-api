const mongoose = require("mongoose");

const { Schema } = mongoose;

const VendorModel = new Schema({
  name: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipcode: { type: String },
  country: { type: String },
  phone: { type: String },
  website: { type: String }
});

module.exports = mongoose.model("Vendor", VendorModel);
