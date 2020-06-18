const express = require('express')
const app = express()

// Koneksi Database
const dbConnection = require('../db_config/db_connection')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/blog', (req, res) => {
    dbConnection.con.query("SELECT * FROM dataBerita", (err, rows, field) => {
        if (err) {
            res.render('blog', {
                listBerita: ''
            })
        } else {
            res.render('blog', {
                listBerita: rows
            })
        }
    })
})

app.get('/blog-detail/(:id)', (req, res) => {
    dbConnection.con.query("SELECT * FROM dataBerita WHERE id= ?", [req.params.id], (err, rows, field) => {
        if (err) {
            throw err
        } else {
            res.render('blog-detail', {
                id: rows[0].id,
                gambarBerita: rows[0].gambarBerita,
                judulBerita: rows[0].judulBerita,
                tanggalUpdate: rows[0].tanggalUpdate,
                deskripsi: rows[0].deskripsi,
                penulis: rows[0].penulis,
            })
        }
    })
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