const express = require('express')
const app = express()

let adminCredential = {
    username: 'admin',
    password: 'admin123'
}

app.get('/', (req, res) => {
    res.render('panel/index', {
        userName: '',
        userPass: ''
    })
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

module.exports = app