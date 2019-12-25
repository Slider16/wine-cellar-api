const mongoose = require('mongoose');

const { Schema } = mongoose;

const vendorModel = new Schema(
    {
        name: {type:String},
        address: {type:String},
        city: {type:String},
        state: {type:String},
        phone: {type:String},
        website: {type:String}
    }
);

module.exports = mongoose.model('Vendor', vendorModel);