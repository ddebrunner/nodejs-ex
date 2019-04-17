var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://'
    + process.env['database-user']
    + ':'
    + process.env['database-password']
    + '@'
    + process.env.MONGODB_AUCTIONS_SERVICE_HOST
    + ':'
    + process.env.MONGODB_AUCTIONS_SERVICE_PORT
    + '/auctions';
var str = "";

var methods = {};

methods.pb = function(req, res) {
   MongoClient.connect(url, function(err, client) {
       var db = client.db('auctions');
       var collection = db.collection('events');
       var cursor = collection.find().sort($natural: -1}).limit(1);
       str = "";
       cursor.forEach(function(item) {
           if (item != null) {
                   str = str + JSON.stringify(item) + "</br>";
           }
       }, function(err) {
           res.send(str);
           db.close();
          }
       );
      db.close();
   });
};

exports.data = methods
