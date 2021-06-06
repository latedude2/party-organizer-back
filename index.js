const express = require('express')
const port = process.env.PORT || 5000
const app = express();
const cors = require('cors')
const qs = require('querystring');
const { MongoClient } = require("mongodb");


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
  database.parties.findAndModify({
    query: { _id: "UNIQUE COUNT DOCUMENT IDENTIFIER" },
    update: {
        $inc: { COUNT: 1 },
    },
    writeConcern: 'majority'
})
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})