const express = require('express')
const app = express()

let adminCredential = {
    username: 'admin',
    password: 'admin'
}

const generateStudentId = () => {
    let uniqueId, currentDate, day;
    uniqueId = Math.floor(Math.random() * 1000);
    currentDate = new Date();
    day = currentDate.getDate()
    return 'S' + day + uniqueId;
}

app.get('/', (req, res) => {
    res.render('panel/index')
})

app.post('/login', (req, res) => {
    let username = req.body.userName;
    let pass = req.body.userPass;
    if (username === adminCredential.username && pass === adminCredential.password) {
        res.redirect('/panel/dashboard')
    } else {
        let error_msg = "Username dan Password Salah!"
        req.flash('error', error_msg)
        res.render('panel/index', {
            userName: '',
            userPass: ''
        })
    }
})

app.get('/dashboard', (req, res) => {
    res.render('panel/dashboard')
})

// Siswa
app.get('/tambahDataSiswa', (req, res) => {
    res.render('panel/tambahDataSiswa', {
        idSiswa: generateStudentId()
    })
})

app.get('/kelolaDataSiswa', (req, res) => {
    res.render('panel/kelolaDataSiswa')
})

// Guru
app.get('/tambahDataGuru', (req, res) => {
    res.render('panel/tambahDataGuru')
})

app.get('/kelolaDataGuru', (req, res) => {
    res.render('panel/kelolaDataGuru')
})

module.exports = app