const express = require('express')
const path = require('path')
const port = process.env.PORT || 5000
const app = express();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/new-code', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})