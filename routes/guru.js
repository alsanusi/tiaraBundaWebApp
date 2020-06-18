const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.render('guru/index')
})

app.post('/login', (req, res) => {

})

app.get('/dashboard', (req, res) => {
    res.render('guru/dashboard')
})

module.exports = app