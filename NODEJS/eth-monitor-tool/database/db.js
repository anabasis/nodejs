var mongoose = require('mongoose');

var database = {};

var callback;

database.init = function(app, config, cb) {
  console.log("Initialize mongo DB");
  connect(app, config);
  callback = cb;
};

database.getSchema = function(schemaName) {
  return database[schemaName];
};

database.getModel = function(modelName) {
  return database[modelName];
};

function connect(app, config) {
  console.log("Trying to connect MongoDB");

  mongoose.Promise = global.Promise;
  mongoose.connect(config.db_url);
  database.db = mongoose.connection;

  database.db.on('error', console.error.bind(console, 'mongoose connection error!'));
  database.db.on('open', function() {
    console.log('Connection complete : MongoDB (' + config.db_url + ')' );
    createSchema(app, config);

    callback(database);
  });

  database.db.on('disconnected', connect);
}

function createSchema(app, config) {
  var length = config.db_schemas.length;

  for(var i = 0 ;i < length; i++)
  {
    var curItem = config.db_schemas[i];
    var curSchema = require(curItem.file).createSchema(mongoose);

    var curModel = mongoose.model(curItem.collection, curSchema);
    console.log("%s Model defined!", curItem.collection);

    database[curItem.schemaName] = curSchema;
    database[curItem.modelName] = curModel;
    console.log(curModel);
  }
  app.set('database', database);
  //console.log(database);
} // make two schemas and put on db


module.exports = database;
