


module.exports = function (app) {

    var productController = require('../controllers/product.server.controller');

    app.route('/api/products').post(productController.save);
    app.route('/api/products').get(productController.getAll);
    app.route('/api/products/:id').get(productController.getById);

};