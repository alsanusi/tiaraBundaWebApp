const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/blog', (req, res) => {
    res.render('blog')
})

app.get('/blog-detail', (req, res) => {
    res.render('blog-detail')
})

app.get('/kotakSaran', (req, res) => {
    res.render('kotakSaran')
})

module.exports = app