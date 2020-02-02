'use strict';



var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var collectionName = 'Category';



var CategorySchema = new Schema({
    categoryId: {
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
}, { timestamps: true });

CategorySchema.pre('save', function (next) {
    this._doc._id = mongoose.Types.ObjectId(this._doc.categoryId);
    next();
});

require('../../../config/dbConnector').initCollection(collectionName, CategorySchema);
