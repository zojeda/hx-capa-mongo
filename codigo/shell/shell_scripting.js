// DOC: https://docs.mongodb.com/manual/tutorial/write-scripts-for-the-mongo-shell/

var conn = new Mongo('mongodb.mvargas');
var db = conn.getDB("shell_db");

db.getCollectionNames();