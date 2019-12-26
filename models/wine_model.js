const mongoose = require('mongoose');

const { Schema } = mongoose;

const winePurchaseModel = new Schema(
    {
        vendorId: {type:String},
        purchaseDate: {type:Date},
        purchasePrice: {type:Number}
    }
);

const wineModel = new Schema(
    {
        name: {type:String},
        vineyard: {type:String},
        location: {type:String},
        year: {type:Number},
        bin: {type:Number},
        purchase: [winePurchaseModel],
        sellPrice: {type:Number},
        notes: {type:String},        
    }
);

module.exports = mongoose.model('Wine', wineModel);