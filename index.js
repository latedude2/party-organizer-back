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
  getNewCode()
  .then(newCount => 
    {res.send(newCount)}
  )
})

app.get('/party', (req, res) => {
  getParty(req.query.partyID)
  .then(partyData => 
    {res.send(partyData)}
  )
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

async function getNewCode() {
  var database = client.db("partydata");
  var collection = database.collection("parties");

  var newCount = await collection.findOneAndUpdate(
    { "_id": ObjectId("60bc9d0846ecc762fc0e4fcd")},
    { $inc: { "COUNT": 1 } },
    { returnNewDocument: true },
  );

  await collection.insertOne(
    { "partyID" : newCount.value.COUNT}
  )

  return newCount;
}

async function getParty(partyID) {
  console.log(partyID)
  console.log(typeof(partyID))
  var database = client.db("partydata");
  var collection = database.collection("parties");

  var partyData = await collection.findOne(
    { "partyID" : partyID}
  )
  console.log(partyData)
  return partyData;
}
