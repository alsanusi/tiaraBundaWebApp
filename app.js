const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Welcome")
})

app.listen(3000, () => {
    console.log('Server running at port 3000: http://127.0.0.1:3000')
})