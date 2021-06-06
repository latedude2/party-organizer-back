const express = require('express')
const port = process.env.PORT || 5000
const app = express();
const cors = require('cors')

app.use(cors())

app.options('*', cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/new-code', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})