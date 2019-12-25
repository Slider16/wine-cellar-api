const mongoose = require('mongoose');

const { Schema } = mongoose;

const vendorModel = new Schema(
    {
        id: {type: String},
        name: {type:String},
        address: {type:String},
        city: {type:String},
        state: {type:String},
        phone: {type:String},
        website: {type:URL}
    }
);

module.exports = mongoose.model('Vendor', vendorModel);