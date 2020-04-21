const express = require('express')
const app = express()
// Koneksi Database
const dbConnection = require('../db_config/db_connection')
// Multer
const multer = require('multer')
const path = require('path')
// Max File Size
const maxFileSize = 50 * 1024 * 1204;
// ImageUpload -  Profil Siswa
const dirProfilSiswa = 'views/uploads/siswa'
let profilSiswaStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, dirProfilSiswa);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let uploadProfilSiswa = multer({
    storage: profilSiswaStorage,
    limits: {
        fileSize: maxFileSize,
        files: 1
    }
});
// ImageUpload - Berita
const dirBerita = 'views/uploads/berita'
let beritaStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, dirBerita);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let uploadBerita = multer({
    storage: beritaStorage,
    limits: {
        fileSize: maxFileSize,
        files: 1
    }
});

let adminCredential = {
    username: 'admin',
    password: 'admin'
}

const generateIdSiswa = () => {
    let uniqueId, currentDate, day;
    uniqueId = Math.floor(Math.random() * 1000);
    currentDate = new Date();
    day = currentDate.getDate()
    return 'S' + day + uniqueId;
}

const cariDataSiswa = (kelas, semester) => {
    return new Promise((resolve, reject) => {
        dbConnection.con.query('SELECT * FROM dataSiswa WHERE kelas = ? AND semester = ?', [kelas, semester], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
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
    res.render('panel/siswa/tambahDataSiswa', {
        id: generateIdSiswa(),
        kelas: 1,
        status: 'Siswa',
        semester: 1
    })
})

const fotoProfilSiswa = uploadProfilSiswa.single('fotoProfil')
app.post('/tambahDataSiswa', (req, res) => {
    fotoProfilSiswa(req, res, (err) => {
        if (err) {
            let error_msg = "Besar foto profil siswa melebihi 3 MB!"
            req.flash('error', error_msg)
            res.render('panel/siswa/tambahDataSiswa', {
                id: generateIdSiswa(),
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
                res.render('panel/siswa/tambahDataSiswa', {
                    id: generateIdSiswa(),
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
                    id: generateIdSiswa(),
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
                        res.render('panel/siswa/tambahDataSiswa', {
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
                        res.render('panel/siswa/tambahDataSiswa', {
                            id: generateIdSiswa(),
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

app.post('/cariDataSiswa', async (req, res) => {
    let inputKelas = req.body.kelas;
    let inputSemester = req.body.semester;
    const hasilCariDataSiswa = await cariDataSiswa(inputKelas, inputSemester);
    res.render('panel/siswa/kelolaDataSiswa', {
        kelas: inputKelas,
        semester: inputSemester,
        listDataSiswa: hasilCariDataSiswa
    })
})

app.get('/kelolaDataSiswa', (req, res) => {
    res.render('panel/siswa/kelolaDataSiswa', {
        listDataSiswa: '',
        kelas: 1,
        semester: 1
    })
})

// Guru
app.get('/tambahDataGuru', (req, res) => {
    res.render('panel/guru/tambahDataGuru')
})

app.get('/kelolaDataGuru', (req, res) => {
    res.render('panel/guru/kelolaDataGuru')
})

// Berita
app.get('/tambahDataBerita', (req, res) => {
    res.render('panel/berita/tambahDataBerita', {
        penulis: adminCredential.username
    })
})

const gambarBerita = uploadBerita.single('gambarBerita')
app.post('/tambahDataBerita', (req, res) => {
    gambarBerita(req, res, (err) => {
        if (err) {
            let error_msg = "Besar gambar berita melebihi 3 MB!"
            req.flash('error', error_msg)
            res.render('panel/berita/tambahDataBerita', {
                judulBerita: '',
                tanggalUpdate: '',
                penulis: adminCredential.username,
                deskripsiBerita: ''
            })
        } else {
            if (req.file === null) {
                let error_msg = "Input gambar berita!"
                req.flash('error', error_msg)
                res.render('panel/berita/tambahDataBerita', {
                    judulBerita: '',
                    tanggalUpdate: '',
                    penulis: adminCredential.username,
                    deskripsiBerita: ''
                })
            } else {
                let dataBerita = {
                    gambarBerita: req.file.filename,
                    judulBerita: req.sanitize("judulBerita").escape().trim(),
                    tanggalUpdate: req.sanitize("tanggalUpdate").escape().trim(),
                    deskripsi: req.sanitize("deskripsiBerita").escape().trim(),
                    penulis: adminCredential.username
                }
                dbConnection.con.query("INSERT INTO dataBerita SET ?", dataBerita, (err, result) => {
                    if (err) {
                        req.flash('error', err)
                        res.render('panel/berita/tambahDataBerita', {
                            judulBerita: dataBerita.gambarBerita,
                            tanggalUpdate: dataBerita.tanggalUpdate,
                            penulis: adminCredential.username,
                            deskripsiBerita: dataBerita.deskripsi
                        })
                    } else {
                        req.flash('success', "Berita berhasil ditambakan!")
                        res.render('panel/berita/tambahDataBerita', {
                            gambarBerita: '',
                            judulBerita: '',
                            tanggalUpdate: '',
                            penulis: adminCredential.username,
                            deskripsiBerita: ''
                        })
                    }
                })
            }
        }
    })
})

app.get('/kelolaDataBerita', (req, res) => {
    res.render('panel/berita/kelolaDataBerita')
})

module.exports = app