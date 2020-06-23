const express = require('express')
const app = express()

// Koneksi Database
const dbConnection = require('../db_config/db_connection')
let idSiswa, namaSiswa;

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/siswa')
    } else {
        next()
    }
}

const redirectHome = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('kelolaJadwal')
    } else {
        next()
    }
}

const checkDataSiswa = (idSiswa) => {
    return new Promise((resolve, reject) => {
        dbConnection.con.query("SELECT * FROM dataSiswa WHERE id = ?", [idSiswa], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

const checkHadirSiswa = (idSiswa) => {
    return new Promise((resolve, reject) => {
        dbConnection.con.query("SELECT * FROM dataKehadiran WHERE idSiswa = ? AND status ='Hadir'", [idSiswa], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

const checkIzinSiswa = (idSiswa) => {
    return new Promise((resolve, reject) => {
        dbConnection.con.query("SELECT * FROM dataKehadiran WHERE idSiswa = ? AND status ='Izin'", [idSiswa], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

const checkSakitSiswa = (idSiswa) => {
    return new Promise((resolve, reject) => {
        dbConnection.con.query("SELECT * FROM dataKehadiran WHERE idSiswa = ? AND status ='Sakit'", [idSiswa], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

const checkNilaiSiswa = (idSiswa) => {
    return new Promise((resolve, reject) => {
        dbConnection.con.query("SELECT * FROM dataNilai WHERE idSiswa = ?", [idSiswa], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

app.get('/', (req, res) => {
    res.render('siswa/index')
})

app.post('/login', redirectHome, async (req, res) => {
    const hasilCheckDataSiswa = await checkDataSiswa(req.body.email)

    if (hasilCheckDataSiswa.length === 0) {
        let error_msg = "Id Siswa dan Password Salah!"
        req.flash('error', error_msg)
        res.render('siswa/index', {
            email: '',
            password: ''
        })
    } else {
        req.session.userId = hasilCheckDataSiswa[0].id
        idSiswa = hasilCheckDataSiswa[0].id
        namaSiswa = hasilCheckDataSiswa[0].namaLengkap
        res.redirect('dashboard')
    }
})

app.get('/dashboard', redirectLogin, async (req, res) => {
    const hasilCheckHadirSiswa = await checkHadirSiswa(idSiswa)
    const hasilCheckIzinSiswa = await checkIzinSiswa(idSiswa)
    const hasilCheckSakitSiswa = await checkSakitSiswa(idSiswa)
    const hasilCheckNilaiSiswa = await checkNilaiSiswa(idSiswa)

    res.render('siswa/dashboard', {
        namaSiswa: namaSiswa ? namaSiswa : "Siswa",
        totalHadir: hasilCheckHadirSiswa ? hasilCheckHadirSiswa.length : 0,
        totalIzin: hasilCheckIzinSiswa ? hasilCheckIzinSiswa.length : 0,
        totalSakit: hasilCheckSakitSiswa ? hasilCheckSakitSiswa.length : 0,
        listNilaiSiswa: hasilCheckNilaiSiswa ? hasilCheckNilaiSiswa : []
    })
})

app.get('/jadwalPelajaran', redirectLogin, (req, res) => {
    res.render('siswa/jadwalPelajaran', {
        namaSiswa: namaSiswa ? namaSiswa : "Siswa"
    })
})

app.get('/absensiSiswa', redirectLogin, (req, res) => {
    dbConnection.con.query("SELECT * FROM dataKehadiran WHERE idSiswa = ?", [idSiswa], (err, rows, field) => {
        if (err) {
            res.render('siswa/absenSiswa', {
                listSiswa: '',
                namaSiswa: namaSiswa ? namaSiswa : "Siswa"
            })
        } else {
            res.render('siswa/absenSiswa', {
                listSiswa: rows,
                namaSiswa: namaSiswa ? namaSiswa : "Siswa"
            })
        }
    })
})

app.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.redirect('siswa/dashboard')
        } else {
            res.clearCookie('sid')
            res.redirect('/siswa')
        }
    })
})

module.exports = app