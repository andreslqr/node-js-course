const { MongoClient } = require('mongodb')

let _db

const connection = async callback => {  
    const connection = MongoClient.connect('mongodb+srv://node-js-course:xxxxxxxxxxx.kvoghpg.mongodb.net/?retryWrites=true&w=majority&appName=shop')
    connection.then(async client =>  {
        _db = client.db()
        callback()
        
    })
}
const getDb = () => {
    if(_db) {
        return _db;
    }


    console.log('db not connected')
}
module.exports = {
    connection,
    getDb
}
