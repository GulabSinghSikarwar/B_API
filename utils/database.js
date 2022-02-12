const { MongoClient } = require('mongodb')

let db;
const uri = "mongodb://127.0.0.1:27017/"
const mongoConnect = () => {

    return MongoClient.connect(uri).then((client) => {

        db = client.db("BAAZ_USER");
        return client;

    })

}
const getdb = () => {
    if (db)
        return db;
    else {
        throw " No DB found "
    }


}
exports.mongoConnect = mongoConnect;
exports.getdb = getdb;