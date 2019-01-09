var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/qdfw', function (err, client) {
    if (err) throw err
    console.log("连接成功")
    var db = client.db('qdfw')
    db.collection('member').find().toArray(function (err, result) {
        if (err) throw err
        console.log(result)
    })
})