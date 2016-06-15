// mongo --host mongodb aggregation.js 

var conn = new Mongo('mongodb');
var db = conn.getDB("test"); //creada usando importdb.sh

var result = db.restaurants.aggregate([
    { $match: { cuisine : "Hamburgers" } },
    { $group: { _id : "$address.zipcode" }},
])

result.pretty().shellPrint();