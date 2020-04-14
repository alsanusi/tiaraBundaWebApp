const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.render('panel/index')
})

module.exports = app