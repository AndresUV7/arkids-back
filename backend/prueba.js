const MongoClient = require('mongodb').MongoClient;

async function beforeRender(req, res) {
    const conn = await MongoClient.connect('mongodb://127.0.0.1:27017');
    Object.assign(req.data, { 
      items: await conn.db('crud').collection('juegos').find().toArray()
    });
}