const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

const db = require('./src/js/queries')

require('dotenv').config({path: __dirname + '/.env'})

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API'})
})

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}.`)
})

app.get('/actions', db.getAction)