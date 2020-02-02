


module.exports = function (app) {

    var categoryController = require('../controllers/category.server.controller');

    app.route('/api/categories').post(categoryController.save);
    app.route('/api/categories/:id').delete(categoryController.delete);
    app.route('/api/categories').get(categoryController.getAll);
    app.route('/api/categories/:id').get(categoryController.getById);
};