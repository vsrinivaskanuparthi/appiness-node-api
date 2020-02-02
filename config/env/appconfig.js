module.exports = {
    db: {
        core: {
            connectionString: process.env.CORE_DB_URL || process.env.DB_URL || "mongodb://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@" + process.env.MONGODB_HOST + ":" + (process.env.MONGODB_PORT || '27017') + "/" + process.env.MONGODB_APP_DB + "?authSource=" + (process.env.MONGODB_AUTH_SOURCE || 'admin') + "&w=1",
            url: process.env.CORE_DB_URL || "mongodb://" + process.env.MONGODB_HOST + ":" + process.env.MONGODB_PORT + "/" + process.env.MONGODB_APP_DB,
            options: {
                useNewUrlParser: true,
                useCreateIndex: true,
                appname: 'appiness-',
                authSource: "admin",
                auth: {
                    user: process.env.CORE_DB_USERNAME || process.env.DB_USERNAME || process.env.MONGODB_USERNAME,
                    password: process.env.CORE_DB_PASSWORD || process.env.DB_PASSWORD || process.env.MONGODB_PASSWORD,
                }
            },
            auto_reconnect: true
        },
        ops: {
            connectionString: process.env.CORE_DB_URL || process.env.OPS_DB_URL || "mongodb://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@" + process.env.MONGODB_HOST + ":" + (process.env.MONGODB_PORT || '27017') + "/" + process.env.MONGODB_APP_DB + "?authSource=" + (process.env.MONGODB_AUTH_SOURCE || 'admin') + "&w=1",
            url: process.env.OPS_DB_URL || "mongodb://" + process.env.MONGODB_HOST + ":" + process.env.MONGODB_PORT + "/" + (process.env.MONGODB_APP_OPS_DB || (process.env.MONGODB_APP_DB + "-ops")),
            options: {
                useNewUrlParser: true,
                useCreateIndex: true,
                appname: 'appiness-',
                authSource: "admin",
                auth: {
                    user: process.env.OPS_DB_USERNAME || process.env.DB_USERNAME || process.env.MONGODB_USERNAME,
                    password: process.env.OPS_DB_PASSWORD || process.env.DB_PASSWORD || process.env.MONGODB_PASSWORD
                }
            },
            auto_reconnect: true

        }
    },
    app: {
        title: process.env.APP_TITLE || 'appiness',
        prefix: process.env.APP_PREFIX || 'Appiness'
    }
}