const express = require('express')
const app = express()

// Koneksi Database
const dbConnection = require('../db_config/db_connection')
let idGuru;

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/guru')
    } else {
        next()
    }
}

const redirectHome = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('dashboard')
    } else {
        next()
    }
}

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

app.post('/login', redirectHome, async (req, res) => {
    const checkHasilDataGuru = await checkDataGuru(req.body.email, req.body.password)

    if (checkHasilDataGuru.length === 0) {
        let error_msg = "Username dan Password Salah!"
        req.flash('error', error_msg)
        res.render('guru/index', {
            email: '',
            password: ''
        })
    } else {
        req.session.userId = checkHasilDataGuru[0].id
        idGuru = checkHasilDataGuru[0].id
        res.redirect('dashboard')
    }
})

app.route('/profil', redirectLogin)
    .get((req, res) => {
        dbConnection.con.query('SELECT * FROM dataGuru WHERE id = ?', [idGuru], (err, rows, fields) => {
            let data = rows[0];
            if (err) {
                res.redirect('dashboard')
            } else {
                res.render('guru/profil', {
                    id: data.id,
                    namaLengkap: data.namaLengkap,
                    tempatLahir: data.tempatLahir,
                    tanggalLahir: data.tanggalLahir,
                    jenisKelamin: data.jenisKelamin,
                    agama: data.agama,
                    alamat: data.alamat,
                    nomorTelefon: data.nomorTelefon,
                    email: data.email,
                    password: data.password
                })
            }
        })
    })
    .put((req, res) => {
        let dataGuru = {
            id: idGuru,
            namaLengkap: req.sanitize('namaLengkap').escape().trim(),
            tempatLahir: req.sanitize('tempatLahir').escape().trim(),
            tanggalLahir: req.sanitize('tanggalLahir').escape().trim(),
            alamat: req.sanitize('alamat').escape().trim(),
            nomorTelefon: req.sanitize('nomorTelefon').escape().trim(),
            jenisKelamin: req.sanitize('jenisKelamin').escape().trim(),
            agama: req.sanitize('agama').escape().trim(),
            email: req.sanitize('email').escape().trim(),
            password: req.sanitize('password').escape().trim()

        }
        dbConnection.con.query("UPDATE dataGuru SET ? WHERE id = ?", [dataGuru, idGuru], (err, rows) => {
            if (err) {
                req.flash('error', err)
                res.render('guru/profil', {
                    id: idGuru,
                    namaLengkap: dataGuru.namaLengkap,
                    tempatLahir: dataGuru.tempatLahir,
                    tanggalLahir: dataGuru.tanggalLahir,
                    jenisKelamin: dataGuru.jenisKelamin,
                    agama: dataGuru.agama,
                    alamat: dataGuru.alamat,
                    nomorTelefon: dataGuru.nomorTelefon,
                    email: dataGuru.email,
                    password: dataGuru.password
                })
            } else {
                res.redirect('profil')
            }
        })
    })

app.get('/dashboard', redirectLogin, (req, res) => {
    res.render('guru/dashboard')
})

app.get('/kelolaJadwal', redirectLogin, (req, res) => {
    res.render('guru/jadwalPelajaran')
})

app.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.redirect('guru/dashboard')
        } else {
            res.clearCookie('sid')
            res.redirect('/guru')
        }
    })
})

module.exports = app