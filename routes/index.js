const express = require('express')
const app = express()

// Koneksi Database
const dbConnection = require('../db_config/db_connection')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/blog', (req, res) => {
    res.render('blog')
})

app.get('/blog-detail', (req, res) => {
    res.render('blog-detail')
})

app.route('/kotakSaran')
    .get((req, res) => {
        res.render('kotakSaran')
    })
    .post((req, res) => {
        let dataSaran = {
            namaLengkap: req.sanitize("namaLengkap").escape().trim(),
            email: req.sanitize("email").escape().trim(),
            nomorTelefon: req.sanitize("nomorTelefon").escape().trim(),
            saran: req.sanitize("saran").escape().trim()
        }
        dbConnection.con.query("INSERT INTO kotakSaran SET ?", dataSaran, (err, result) => {
            if (err) {
                req.flash('error', err)
                res.render("kotakSaran", {
                    namaLengkap: dataSaran.namaLengkap,
                    email: dataSaran.email,
                    nomorTelefon: dataSaran.email,
                    saran: dataSaran.saran
                })
            } else {
                req.flash('success', "Berita berhasil ditambakan!")
                res.render("kotakSaran")
            }
        })
    })

module.exports = app