
var Mongoose = require('mongoose').Mongoose;
var config = require('../config/config');



var dbConnectionObject = undefined;


var dbConnectOptions = {
    useNewUrlParser: true,
    keepAlive: 300000,
    connectTimeoutMS: 30000
};

var collections = {
    Category: {
        collectionName: 'CATEGORY',
        name: 'Category'
    },
    Product: {
        collectionName: 'PRODUCT',
        name: 'Product'
    }
};

function getDBInstance(collectionName) {
    if (collections[collectionName].dbName) {
        return dbConnectionObject[collections[collectionName].dbName];
    } else {
        return dbConnectionObject['core'];
    }

}

module.exports.initDBConnections = function () {
    if (!dbConnectionObject) {
        dbConnectionObject = {};
        Object.keys(config.db).forEach(function (dbKey) {
            dbConnectionObject[dbKey] = new Mongoose();
            if (config.db[dbKey].url && (config.db[dbKey].options && config.db[dbKey].options.auth.password && config.db[dbKey].options.auth.user)) {
                dbConnectionObject[dbKey]
                    .connect(config.db[dbKey].url, config.db[dbKey].options, function (err) {
                        if (err) {
                            throw (err);
                        }
                    });
            } else {
                dbConnectionObject[dbKey].connect(config.db[dbKey].connectionString, dbConnectOptions, function (err) {
                    if (err) {
                        throw (err);
                    }
                });
            }
        });
    }
    return dbConnectionObject;
}


module.exports.initCollection = function (collectionName, schema) {
    var db = undefined;
    var collection = undefined;

    if (collections[collectionName]) {
        collection = config.app.prefix.toUpperCase() + "_" + collections[collectionName].collectionName;
        if (collections[collectionName].dbName) {
            db = dbConnectionObject[collections[collectionName].dbName];
            logger.info("Connection Info:" + collections[collectionName].collectionName, collections[collectionName].dbName)
        } else {
            db = dbConnectionObject['core'];
        }
        return db.model(collection, schema);
    } else {
        throw new Error("Collection not configured for " + collectionName);
    }
}


module.exports.getCollectionInstance = function (collectionName) {
    if (collections[collectionName]) {
        return getDBInstance(collectionName).model(config.app.prefix.toUpperCase() + "_" + collections[collectionName].collectionName);
    } else {
        throw new Error("Collection not configured for " + collectionName);
    }
};