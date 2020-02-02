


var _ = require('lodash');
var mongoose = require('mongoose');
var Category = require('../../../config/dbConnector').getCollectionInstance('Category');
var Product = require('../../../config/dbConnector').getCollectionInstance('Product');
var logger = require('../../../config/logger').log4js.getLogger('product.server.controller');






module.exports.save = (req, res) => {
    _.merge(req.body, {
        categoryId: mongoose.Types.ObjectId().toString()
    })
    var category = new Category(req.body)
    category.save((err, response) => {
        if (err) {
            logger.error('save function has error', err.message || err);
            res.send(err)
        } else {
            logger.info('save function has executed successfully');
            res.json(response)
        }
    });
};//save category

module.exports.getAll = (req, res) => {
    Category.find((err, response) => {
        if (err) {
            logger.error('getAll function has error', err.message || err);
            res.send(err);
        } else {
            logger.info('getAll function has executed successfully');
            res.json(response);
        }
    });
};//get all categories

module.exports.getById = (req, res) => {
    if (!req.params || !req.params.id) {
        logger.error('getById function has error id not found in params');
        return res.status(400).send({ status: 400, message: 'bad request id required in params' });
    }
    Category.find({ _id: req.params.id }, (err, response) => {
        if (err) {
            logger.error('getById function has error', err.message || err);
            res.send(err);
        } else {
            logger.info('getById function has executed successfully');
            res.json(response);
        }
    });
};//get category by id

module.exports.delete = (req, res) => {

    if (!req.params || !req.params.id) {
        logger.error('delete function has error id not found in params');
        return res.status(400).json({ status: 400, message: 'bad request categoryId required in params' });
    }

    let query = {
        "categoryId": req.params.id
    }
    //building query

    //delete the products associated to category
    Product.find(query, (error, products) => {
        if (error) {
            logger.error('delete function has error while getting products based on categoryId', error.message || error);
            res.send(error);
        } else {
            Product.deleteMany(query, (error) => {
                if (error) {
                    logger.error('delete function has error while ', error.message || error);
                    res.send(error);
                } else {
                    //delete the category
                    Category.deleteOne(query, (err) => {
                        if (error) {
                            logger.error('delete function has error', err.message || err);
                            res.send(error);
                        } else {
                            logger.info('delete function has executed successfully');
                            res.send(products);
                        }
                    });
                }
            });
        }

    })

};//delete category





