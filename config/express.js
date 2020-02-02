const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config')
const path = require('path');
const helmet = require('helmet');
const dotenv = require('dotenv');


dotenv.config();


module.exports = function (dbConnectionObject) {

    //initialize express application
    const app = express();

    config.getGlobbedFiles('./app/**/models/**/*.js').forEach(function (modelPath) {
		require(path.resolve(modelPath));
	});

    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '10mb'
    }));
    app.use(bodyParser.json({
        limit: '10mb'
    }));


    // Use helmet to secure Express headers
    app.use(helmet({
        frameguard: {
            action: 'deny'
        }
    }));
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noCache());
    app.disable('x-powered-by');


	
    

    app.use(function (req, res, next) {
        var oneof = false;
        if (req.headers.origin) {
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            oneof = true;
        }
        if (req.headers['access-control-request-method']) {
            res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
            oneof = true;
        }
        if (req.headers['access-control-request-headers']) {
            res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
            oneof = true;
        }
        if (oneof) {
            res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
        }

        if (oneof && req.method == 'OPTIONS') {
            res.sendStatus(200);
        } else {
            next();
        }
    });

    config.getGlobbedFiles('./app/**/routes/**/*.js').forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });


	return app;

}