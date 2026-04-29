
import express from 'express'
import sqlite3 from 'sqlite3'

sqlite3.verbose()

const HTTP_PORT = 8000

var app = express()
app.use(express.json())

// Used this to prevent cors issues
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept')
    next()
})

app.use(express.static('public'))

// Connecting to the database
const cryptodb = new sqlite3.Database('resume.db', (err) => {
    if (err) {
        console.error("Error opening database:", err.message)
    } else {
        console.log("Connected to resume.db")

        const strQuery = "CREATE TABLE IF NOT EXISTS tblJobs (intJobID INTEGER PRIMARY KEY AUTOINCREMENT, strCompany TEXT, strTitle TEXT, strStartDate TEXT, strEndDate TEXT)"

        cryptodb.run(strQuery, (err) => {
            if (err) {
                console.error("Error creating table:", err.message)
            } else {
                console.log("Database initialized")
            }
        })
    }
})

app.listen(HTTP_PORT, () => {
    console.log('Listening on port', HTTP_PORT)
})