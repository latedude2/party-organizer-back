const express = require('express')
const port = process.env.PORT || 5000
const app = express();
const cors = require('cors')
const { MongoClient } = require("mongodb");
var ObjectId = require('mongodb').ObjectID;


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

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
  getParty(parseInt(req.query.partyID))
  .then(partyData => 
    {res.send(partyData)}
  )
})

app.post('/party', (req, res) => {
  setParty(parseInt(req.body.partyID, req.body.entries))
  .then(res.send('Update success!'))
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
  var database = client.db("partydata");
  var collection = database.collection("parties");

  var partyData = await collection.findOne(
    { "partyID" : partyID}
  )
  return partyData;
}

async function setParty(partyID, entries) {
  var database = client.db("partydata");
  var collection = database.collection("parties");
  console.log(partyID)
  console.log(entries)

  var result = await collection.replaceOne(
    { "partyID" : partyID},
    { "partyID" : partyID,
    "entries": entries},
    true
  )
  return result;
}
