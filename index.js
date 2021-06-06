const express = require('express')
const port = process.env.PORT || 5000
const app = express();
const cors = require('cors')
const qs = require('querystring');
const { MongoClient } = require("mongodb");
var ObjectId = require('mongodb').ObjectID;


const uri = "mongodb+srv://admin:temp@cluster0.z7ins.mongodb.net/partydata?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect();
app.use(cors());

app.options('*', cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/new-code', (req, res) => {
  var database = client.db("partydata");
  var collection = database.collection("parties");
  collection.findAndModify({
    query: {_id : ObjectId("60bc9d0846ecc762fc0e4fcd")},
    update: {
        $inc: { COUNT: 1 },
    },
    writeConcern: 'majority'
  }).then(res.send('Hello World!'))
  .error()

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})