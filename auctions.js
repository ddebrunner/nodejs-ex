var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://userY51:xFnUjEfxHM8DuCEc@localhost:27777/auctions';
var str = "";

ge = function(req, res) {
   MongoClient.connect(url, function(err, client) {
       var db = client.db('auctions');
       var collection = db.collection('events');
       var cursor = collection.find({});
       str = "";
       cursor.forEach(function(item) {
           if (item != null) {
                   str = str + item + "</br>";
           }
       }, function(err) {
           res.send(str);
           db.close();
          }
       );
   });
};
