const express = require('express')
const app = express()

// Koneksi Database
const dbConnection = require('../db_config/db_connection')
let dataGuru;

const checkDataGuru = (email, pass) => {
    return new Promise((resolve, reject) => {
        dbConnection.con.query("SELECT * FROM dataGuru WHERE email = ? AND password = ?", [email, pass], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

app.get('/', (req, res) => {
    res.render('guru/index')
})

app.post('/login', async (req, res) => {
    const checkHasilDataGuru = await checkDataGuru(req.body.email, req.body.password)

    if (checkHasilDataGuru.length === 0) {
        let error_msg = "Username dan Password Salah!"
        req.flash('error', error_msg)
        res.render('guru/index', {
            email: '',
            password: ''
        })
    } else {
        dataGuru = checkHasilDataGuru[0].id
        res.redirect('dashboard')
    }
})

app.get('/dashboard', (req, res) => {
    console.log(dataGuru)
    res.render('guru/dashboard')
})

module.exports = app