const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

const db = require('./src/js/queries')
const cors = require('cors')

require('dotenv').config({path: __dirname + '/.env'})

app.use(cors())
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
app.post('/users', db.getUserCredentials)