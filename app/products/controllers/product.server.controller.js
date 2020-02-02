


var _ = require('lodash');
var mongoose = require('mongoose');
var Product = require('../../../config/dbConnector').getCollectionInstance('Product');
var logger = require('../../../config/logger').log4js.getLogger('product.server.controller');




module.exports.save = (req, res) => {
    _.merge(req.body, {
        productId: mongoose.Types.ObjectId().toString()
    });
    var product = new Product(req.body)
    product.save((err, response) => {
        if (err) {
            logger.error('save function has error', err.message || err);
            res.send(err);
        } else {
            logger.info('save function has executed successfully');
            res.json(response);
        }
    });
};//save product

module.exports.getAll = (req, res) => {
    Product.find((err, response) => {
        if (err) {
            logger.error('getAll function has error', err.message || err);
            res.send(err);
        } else {
            logger.info('getAll function has executed successfully');
            res.json(response);
        }
    });
};//get all products

module.exports.getById = (req, res) => {
    if (!req.params || !req.params.id) {
        return res.status(400).send({ status: 400, message: 'bad request id required in params' });
    }
    Product.find({ _id: req.params.id }, (err, response) => {
        if (err) {
            logger.error('getById function has error', err.message || err);
            res.send(err);
        } else {
            logger.info('getById function has executed successfully');
            res.json(response);
        }
    });
};//get product by product id





