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
  var entries = req.body.entries;
  var participants = req.body.participants;
  var coorX = req.body.coorX;
  var coorY = req.body.coorY;
  var startTime = req.body.startTime;
  var endTime = req.body.endTime;
  setParty(parseInt(req.body.partyID), entries, participants, coorX, coorY, startTime, endTime)
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

async function setParty(partyID, entries, participants, coorX, coorY, startTime, endTime) {
  var database = client.db("partydata");
  var collection = database.collection("parties");
  var result = await collection.replaceOne(
    { "partyID" : partyID},
    { "partyID" : partyID,
    "entries": entries,
    "participants": participants,
    "coorX" : coorX,
    "coorY": coorY,
    "startTime": startTime,
    "endTime": endTime},
    true
  )
  return result;
}
