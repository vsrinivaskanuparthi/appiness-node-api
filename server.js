
const dbConnector = require('./config/dbConnector');





var dbConnectionObject = dbConnector.initDBConnections();

var app = require('./config/express')(dbConnectionObject)


app.listen(3005, () => {
  console.log('server listening on port 3005')
});



module.exports = app;
