
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

        // Creating tblJobs
        const strQuery = "CREATE TABLE IF NOT EXISTS tblJobs (intJobID INTEGER PRIMARY KEY AUTOINCREMENT, strCompany TEXT, strTitle TEXT, strStartDate TEXT, strEndDate TEXT)"
        cryptodb.run(strQuery, (err) => {
            if (err) {
                console.error("Error creating tblJobs:", err.message)
            } else {
                console.log("tblJobs created")
            }
        })

        // Creating tblResponsibilities
        const strResponsibilitiesQuery = "CREATE TABLE IF NOT EXISTS tblResponsibilities (intRespID INTEGER PRIMARY KEY AUTOINCREMENT, intJobID INTEGER, strDescription TEXT)"
        cryptodb.run(strResponsibilitiesQuery, (err) => {
            if (err) {
                console.error("Error creating tblResponsibilities:", err.message)
            } else {
                console.log("tblResponsibilities created")
            }
        })

        // Creating tblSkills
        const strSkillsQuery = "CREATE TABLE IF NOT EXISTS tblSkills (intSkillID INTEGER PRIMARY KEY AUTOINCREMENT, strCategory TEXT, strSkillName TEXT)"
        cryptodb.run(strSkillsQuery, (err) => {
            if (err) {
                console.error("Error creating tblSkills:", err.message)
            } else {
                console.log("tblSkills created")
            }
        })

        // Creating tblCertifications
        const strCertsQuery = "CREATE TABLE IF NOT EXISTS tblCertifications (intCertID INTEGER PRIMARY KEY AUTOINCREMENT, strName TEXT, strIssuer TEXT, strDateEarned TEXT)"
        cryptodb.run(strCertsQuery, (err) => {
            if (err) {
                console.error("Error creating tblCertifications:", err.message)
            } else {
                console.log("tblCertifications created")
            }
        })

        // Creating tblAwards
        const strAwardsQuery = "CREATE TABLE IF NOT EXISTS tblAwards (intAwardID INTEGER PRIMARY KEY AUTOINCREMENT, strTitle TEXT, strDateReceived TEXT, strDescription TEXT)"
        cryptodb.run(strAwardsQuery, (err) => {
            if (err) {
                console.error("Error creating tblAwards:", err.message)
            } else {
                console.log("tblAwards created")
            }
        })
    }
})



// Jobs Routes
app.get('/api/jobs', (req, res) => {
    const strQuery = "SELECT * FROM tblJobs"
    cryptodb.all(strQuery, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ outcome: "error", message: err.message })
        }
        else {
            res.status(200).json({ outcome: "success", message: rows })
        }
    })
})

app.post('/api/jobs', (req, res) => {
    const strCompany = req.body.strCompany
    const strTitle = req.body.strTitle
    const strStartDate = req.body.strStartDate
    const strEndDate = req.body.strEndDate

    // I would not normally name the columns in a query like this, but AI suggested that i add it so that we 
    // are adding the right rows to the right columns since we never actually pass in a ID.
    const strInsertQuery = "INSERT INTO tblJobs (strCompany, strTitle, strStartDate, strEndDate) VALUES (?,?,?,?)"
    cryptodb.run(strInsertQuery, [strCompany, strTitle, strStartDate, strEndDate], (err) => {
        if (err) {
            return res.status(500).json({ outcome: "error", message: "Couldnt save the job." })
        }
        else {
            res.status(201).json({ outcome: "success", message: "Job saved." })
        }
    })
})

// Responsibilities Routes
app.get('/api/responsibilities', (req, res) => {
    const strQuery = "SELECT * FROM tblResponsibilities"
    cryptodb.all(strQuery, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ outcome: "error", message: err.message })
        }
        else {
            res.status(200).json({ outcome: "success", message: rows })
        }
    })
})

app.post('/api/responsibilities', (req, res) => {
    const intJobID = req.body.intJobID
    const strDescription = req.body.strDescription

    const strInsertQuery = "INSERT INTO tblResponsibilities (intJobID, strDescription) VALUES (?,?)"
    cryptodb.run(strInsertQuery, [intJobID, strDescription], (err) => {
        if (err) {
            return res.status(500).json({ outcome: "error", message: "Couldnt save the responsibility." })
        }
        else {
            res.status(201).json({ outcome: "success", message: "Responsibility saved." })
        }
    })
})

// Skills Routes
app.get('/api/skills', (req, res) => {
    const strQuery = "SELECT * FROM tblSkills"
    cryptodb.all(strQuery, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ outcome: "error", message: err.message })
        }
        else {
            res.status(200).json({ outcome: "success", message: rows })
        }
    })
})

app.post('/api/skills', (req, res) => {
    const strCategory = req.body.strCategory
    const strSkillName = req.body.strSkillName

    const strInsertQuery = "INSERT INTO tblSkills (strCategory, strSkillName) VALUES (?,?)"
    cryptodb.run(strInsertQuery, [strCategory, strSkillName], (err) => {
        if (err) {
            return res.status(500).json({ outcome: "error", message: "Couldnt save the skill." })
        }
        else {
            res.status(201).json({ outcome: "success", message: "Skill saved." })
        }
    })
})

// Certifications Routes
app.get('/api/certifications', (req, res) => {
    const strQuery = "SELECT * FROM tblCertifications"
    cryptodb.all(strQuery, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ outcome: "error", message: err.message })
        }
        else {
            res.status(200).json({ outcome: "success", message: rows })
        }
    })
})

app.post('/api/certifications', (req, res) => {
    const strName = req.body.strName
    const strIssuer = req.body.strIssuer
    const strDateEarned = req.body.strDateEarned

    const strInsertQuery = "INSERT INTO tblCertifications (strName, strIssuer, strDateEarned) VALUES (?,?,?)"
    cryptodb.run(strInsertQuery, [strName, strIssuer, strDateEarned], (err) => {
        if (err) {
            return res.status(500).json({ outcome: "error", message: "Couldnt save the certification." })
        }
        else {
            res.status(201).json({ outcome: "success", message: "Certification saved." })
        }
    })
})


// Awards Routes
app.get('/api/awards', (req, res) => {
    const strQuery = "SELECT * FROM tblAwards"
    cryptodb.all(strQuery, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ outcome: "error", message: err.message })
        }
        else {
            res.status(200).json({ outcome: "success", message: rows })
        }
    })
})

app.post('/api/awards', (req, res) => {
    const strTitle = req.body.strTitle
    const strDateReceived = req.body.strDateReceived
    const strDescription = req.body.strDescription

    const strInsertQuery = "INSERT INTO tblAwards (strTitle, strDateReceived, strDescription) VALUES (?,?,?)"
    cryptodb.run(strInsertQuery, [strTitle, strDateReceived, strDescription], (err) => {
        if (err) {
            return res.status(500).json({ outcome: "error", message: "Couldnt save the award." })
        }
        else {
            res.status(201).json({ outcome: "success", message: "Award saved." })
        }
    })
})

app.listen(HTTP_PORT, () => {
    console.log('Listening on port', HTTP_PORT)
})