const express = require('express')
var cors = require('cors')
const mysql = require('mysql')
var bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(cors())
var jsonParser = bodyParser.json()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'node',
    password: 'adminpass',
    multipleStatements: true
})

initQuery = `
CREATE DATABASE IF NOT EXISTS ngo;
USE ngo;
CREATE TABLE IF NOT EXISTS events (eventID BINARY(16) PRIMARY KEY, title VARCHAR(255) NOT NULL, subtitle VARCHAR(255) NOT NULL, description VARCHAR(1000) NOT NULL, tags VARCHAR(255) NOT NULL);
`
connection.query(initQuery, function (err, result) {
    if (err) throw err
    console.log("Database Initialized")
})

app.get('/', (req, res) => {
    res.send("Backend Running")
})

app.get("/events", (req, res) => {
    connection.query("SELECT * FROM events", function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    });
})

app.get("/events/:eventID", (req, res) => {
    connection.query(`SELECT * FROM events WHERE eventID = '${req.params['eventID']}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    });
})

app.post("/events", jsonParser, (req, res) => {
  var data = req.body
  var title = data[0].value
  var subtitle = data[1]
  var description = data[2].value
  var tags = data[3].value
  query = `INSERT INTO events VALUES (UUID_TO_BIN(UUID()), '${title}','${subtitle}','${description}, ${tags}')`
  connection.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  })
  res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



