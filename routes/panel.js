const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.render('panel/index', {
        userName: '',
        userPass: ''
    })
})

app.post('/login', (req, res) => {
    let username = req.body.userName;
    let pass = req.body.userPass;
    if (username === "admin" && pass === "admin") {
        res.redirect('/panel/dashboard')
    }
})

app.get('/dashboard', (req, res) => {
    res.render('panel/dashboard')
})

module.exports = app