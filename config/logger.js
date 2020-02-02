'use strict'
/**
 * Module dependencies.
 */

const log4js = require('log4js')

log4js.configure({
  "appenders": {
    "out": {
      "type": "stdout"
    },
    "app": {
      "type": "file",
      "filename": "./logs/appiness-app.log",
      "maxLogSize": 10485760,
      "backups": 3
    }
  },
  "categories": {
    "default": {
      "appenders": [
        "out",
        "app",
      ],
      "level": "debug"
    }
  }
})

module.exports.log4js = log4js
