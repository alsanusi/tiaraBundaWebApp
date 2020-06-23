const express = require('express')
const app = express()

// Koneksi Database
const dbConnection = require('../db_config/db_connection')
let idSiswa, namaSiswa, kelasSiswa, idGuru, namaGuru;

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

const checkWaliKelasSiswa = (kelas) => {
    return new Promise((resolve, reject) => {
        dbConnection.con.query("SELECT * FROM dataKelas WHERE kelas = ?", [kelas], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

const checkDetailWaliKelasSiswa = (idGuru) => {
    return new Promise((resolve, reject) => {
        dbConnection.con.query("SELECT * FROM dataGuru WHERE id = ?", [idGuru], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

const checkKelasSiswa = (idSiswa) => {
    return new Promise((resolve, reject) => {
        dbConnection.con.query("SELECT * FROM dataKelasSiswa WHERE idSiswa = ?", [idSiswa], (err, rows) => {
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
    const hasilCheckKelasSiswa = await checkKelasSiswa(idSiswa)
    kelasSiswa = hasilCheckKelasSiswa[0].kelas
    const hasilCheckWaliKelasSiswa = await checkWaliKelasSiswa(kelasSiswa)
    idGuru = hasilCheckWaliKelasSiswa[0].idGuru
    const hasilCheckDetailWaliKelasSiswa = await checkDetailWaliKelasSiswa(idGuru)
    namaGuru = hasilCheckDetailWaliKelasSiswa[0].namaLengkap

    res.render('siswa/dashboard', {
        namaSiswa: namaSiswa ? namaSiswa : "Siswa",
        totalHadir: hasilCheckHadirSiswa ? hasilCheckHadirSiswa.length : 0,
        totalIzin: hasilCheckIzinSiswa ? hasilCheckIzinSiswa.length : 0,
        totalSakit: hasilCheckSakitSiswa ? hasilCheckSakitSiswa.length : 0,
        listNilaiSiswa: hasilCheckNilaiSiswa ? hasilCheckNilaiSiswa : [],
        idGuru: idGuru ? idGuru : "-",
        namaGuru: namaGuru ? namaGuru : "-",
        nomorTelefonGuru: hasilCheckDetailWaliKelasSiswa ? hasilCheckDetailWaliKelasSiswa[0].nomorTelefon : "-",
        emailGuru: hasilCheckDetailWaliKelasSiswa ? hasilCheckDetailWaliKelasSiswa[0].email : "-"
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

app.get('/profilSiswa', redirectLogin, (req, res) => {
    dbConnection.con.query('SELECT * FROM dataSiswa WHERE id = ?', [idSiswa], (err, rows, fields) => {
        let data = rows[0];
        if (err) {
            res.redirect('dashboard')
        } else {
            res.render('siswa/profilSiswa', {
                namaSiswa: namaSiswa ? namaSiswa : "Siswa",
                kelas: kelasSiswa ? kelasSiswa : "-",
                waliKelas: namaGuru ? namaGuru : "-",
                id: idSiswa,
                namaLengkap: data.namaLengkap,
                tempatLahir: data.tempatLahir,
                tanggalLahir: data.tanggalLahir,
                agama: data.agama,
                alamat: data.alamat,
                namaAyah: data.namaAyah,
                jenisKelamin: data.jenisKelamin,
                namaIbu: data.namaIbu,
                nomorTelefon: data.nomorTelefon,
                status: data.status
            })
        }
    })
})

app.put('/profilSiswa', redirectLogin, (req, res) => {
    let dataSiswa = {
        id: idSiswa,
        alamat: req.sanitize('alamat').escape().trim(),
        nomorTelefon: req.sanitize('nomorTelefon').escape().trim(),
    }
    dbConnection.con.query("UPDATE dataSiswa SET ? WHERE id = ?", [dataSiswa, idSiswa], (err, rows) => {
        if (err) {
            req.flash('error', err)
            res.redirect('profilSiswa')
        } else {
            res.redirect('profilSiswa')
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