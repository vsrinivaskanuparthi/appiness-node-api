'use strict';



var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    config = require('../../../config/config');


var collectionName = 'Product';



var ProductSchema = new Schema({
    productId: {
        type: String,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: config.app.prefix.toUpperCase() + '_CATEGORY'
    }
}, { timestamps: true });

ProductSchema.pre('save', function (next) {
    this._doc._id = mongoose.Types.ObjectId(this._doc.productId);
    next();
});

require('../../../config/dbConnector').initCollection(collectionName, ProductSchema);
