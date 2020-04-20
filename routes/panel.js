const express = require('express')
const app = express()

// Koneksi Database
const dbConnection = require('../db_config/db_connection')

// Multer
const multer = require('multer')
const path = require('path')

// Max File Size
const maxFileSize = 50 * 1024 * 1204;

// ImageUpload - Article Image
const dir = 'views/uploads/siswa'
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({
    storage: storage,
    limits: {
        fileSize: maxFileSize,
        files: 1
    }
});

let adminCredential = {
    username: 'admin',
    password: 'admin'
}

const generateStudentId = () => {
    let uniqueId, currentDate, day;
    uniqueId = Math.floor(Math.random() * 1000);
    currentDate = new Date();
    day = currentDate.getDate()
    return 'S' + day + uniqueId;
}

app.get('/', (req, res) => {
    res.render('panel/index')
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

// Siswa
app.get('/tambahDataSiswa', (req, res) => {
    res.render('panel/tambahDataSiswa', {
        id: generateStudentId(),
        kelas: 1,
        status: 'Siswa',
        semester: 1
    })
})

const fotoProfilSiswa = upload.single('fotoProfil')
app.post('/tambahDataSiswa', (req, res) => {
    fotoProfilSiswa(req, res, (err) => {
        if (err) {
            let error_msg = "Besar foto profil siswa melebihi 3 MB!"
            req.flash('error', error_msg)
            res.render('panel/tambahDataSiswa', {
                id: generateStudentId(),
                namaLengkap: '',
                tempatLahir: '',
                tanggalLahir: '',
                kelas: 1,
                semester: 1,
                alamat: '',
                namaAyah: '',
                namaIbu: '',
                nomorTelefon: '',
                status: 'Siswa'
            })
        } else {
            if (req.file === null) {
                let error_msg = 'Input foto profil siswa!'
                req.flash('error', error_msg)
                res.render('panel/tambahDataSiswa', {
                    id: generateStudentId(),
                    namaLengkap: '',
                    tempatLahir: '',
                    tanggalLahir: '',
                    kelas: 1,
                    semester: 1,
                    alamat: '',
                    namaAyah: '',
                    namaIbu: '',
                    nomorTelefon: '',
                    status: 'Siswa'
                })
            } else {
                let dataSiswa = {
                    id: generateStudentId(),
                    fotoProfil: req.file.filename,
                    namaLengkap: req.sanitize('namaLengkap').escape().trim(),
                    tempatLahir: req.sanitize('tempatLahir').escape().trim(),
                    tanggalLahir: req.sanitize('tanggalLahir').escape().trim(),
                    kelas: 1,
                    semester: 1,
                    alamat: req.sanitize('alamat').escape().trim(),
                    namaAyah: req.sanitize('namaAyah').escape().trim(),
                    namaIbu: req.sanitize('namaIbu').escape().trim(),
                    nomorTelefon: req.sanitize('nomorTelefon').escape().trim(),
                    status: 'Siswa'
                }
                dbConnection.con.query('INSERT INTO dataSiswa SET ?', dataSiswa, (err, result) => {
                    if (err) {
                        req.flash('error', err)
                        res.render('panel/tambahDataSiswa', {
                            id: dataSiswa.id,
                            namaLengkap: dataSiswa.namaLengkap,
                            tempatLahir: dataSiswa.tempatLahir,
                            tanggalLahir: dataSiswa.tanggalLahir,
                            kelas: dataSiswa.kelas,
                            semester: dataSiswa.semester,
                            alamat: dataSiswa.alamat,
                            namaAyah: dataSiswa.namaAyah,
                            namaIbu: dataSiswa.namaIbu,
                            nomorTelefon: dataSiswa.nomorTelefon,
                            status: dataSiswa.status
                        })
                    } else {
                        req.flash('success', 'Data siswa berhasil ditambahkan!')
                        res.render('panel/tambahDataSiswa', {
                            id: generateStudentId(),
                            namaLengkap: '',
                            tempatLahir: '',
                            tanggalLahir: '',
                            kelas: 1,
                            semester: 1,
                            alamat: '',
                            namaAyah: '',
                            namaIbu: '',
                            nomorTelefon: '',
                            status: 'Siswa'
                        })
                    }
                })
            }
        }
    })
})

app.get('/kelolaDataSiswa', (req, res) => {
    res.render('panel/kelolaDataSiswa')
})

// Guru
app.get('/tambahDataGuru', (req, res) => {
    res.render('panel/tambahDataGuru')
})

app.get('/kelolaDataGuru', (req, res) => {
    res.render('panel/kelolaDataGuru')
})

module.exports = app