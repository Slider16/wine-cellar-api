const mongoose = require('mongoose');

const { Schema } = mongoose;

const wineModel = new Schema(
    {
        name: {type:String},
        vineyard: {type:String},
        location: {type:String},
        year: {type:Number},
        bin: {type:Number},
        purchasePrice: {type:Number},
        sellPrice: {type:Number},
        notes: {type:String},        
    }
);

module.exports = mongoose.model('Wine', wineModel);