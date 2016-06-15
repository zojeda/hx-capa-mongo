// DOC: https://docs.mongodb.com/manual/tutorial/write-scripts-for-the-mongo-shell/

var conn = new Mongo('mongodb');
var db = conn.getDB("test"); //creada usando importdb.sh

printjson(db.restaurants.findOne({}));