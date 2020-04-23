const express = require('express')
const app = express()

// Koneksi Database
const dbConnection = require('../db_config/db_connection')

// Multer - Upload Gambar
const multer = require('multer')
const path = require('path')
const maxFileSize = 50 * 1024 * 1204;

// Upload Gambar 
const direktoriGambarBerita = 'views/uploads/berita'
const direktoriProfilSiswa = 'views/uploads/siswa'
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        if (file.fieldname === 'gambarBerita') {
            callback(null, direktoriGambarBerita);
        } else {
            callback(null, direktoriProfilSiswa);
        }
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

// Credential Admin
let adminCredential = {
    id: '1',
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

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/panel')
    } else {
        next()
    }
}

const redirectHome = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/panel/dashboard')
    } else {
        next()
    }
}

app.get('/', (req, res) => {
    res.render('panel/index')
})

app.post('/login', redirectHome, (req, res) => {
    let username = req.body.userName;
    let pass = req.body.userPass;
    if (username === adminCredential.username && pass === adminCredential.password) {
        req.session.userId = adminCredential.id
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

app.get('/dashboard', redirectLogin, (req, res) => {
    res.render('panel/dashboard')
})

// Siswa
const fotoProfilSiswa = upload.single('fotoProfil')
app.route('/tambahDataSIswa', redirectLogin)
    .get((req, res) => {
        res.render('panel/admin/siswa/tambahDataSiswa', {
            id: generateIdSiswa(),
            kelas: 1,
            status: 'Siswa',
            semester: 1
        })
    })
    .post((req, res) => {
        fotoProfilSiswa(req, res, (err) => {
            if (err) {
                let error_msg = "Besar foto profil siswa melebihi 3 MB!"
                req.flash('error', error_msg)
                res.render('panel/admin/siswa/tambahDataSiswa', {
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
                    res.render('panel/admin/siswa/tambahDataSiswa', {
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
                            res.render('panel/admin/siswa/tambahDataSiswa', {
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
                            res.render('panel/admin/siswa/tambahDataSiswa', {
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

app.post('/cariDataSiswa', redirectLogin, async (req, res) => {
    let inputKelas = req.body.kelas;
    let inputSemester = req.body.semester;
    const hasilCariDataSiswa = await cariDataSiswa(inputKelas, inputSemester);
    res.render('panel/admin/siswa/kelolaDataSiswa', {
        kelas: inputKelas,
        semester: inputSemester,
        listDataSiswa: hasilCariDataSiswa
    })
})

app.get('/kelolaDataSiswa', redirectLogin, (req, res) => {
    res.render('panel/admin/siswa/kelolaDataSiswa', {
        listDataSiswa: '',
        kelas: 1,
        semester: 1
    })
})

// Guru
app.get('/tambahDataGuru', redirectLogin, (req, res) => {
    res.render('panel/admin/guru/tambahDataGuru')
})

app.get('/kelolaDataGuru', redirectLogin, (req, res) => {
    res.render('panel/admin/guru/kelolaDataGuru')
})

// Berita
const gambarBerita = upload.single('gambarBerita')
app.route('/tambahDataBerita', redirectLogin)
    .get((req, res) => {
        res.render('panel/admin/berita/tambahDataBerita', {
            penulis: adminCredential.username
        })
    })
    .post((req, res) => {
        gambarBerita(req, res, (err) => {
            if (err) {
                let error_msg = "Besar gambar berita melebihi 3 MB!"
                req.flash('error', error_msg)
                res.render('panel/admin/berita/tambahDataBerita', {
                    judulBerita: '',
                    tanggalUpdate: '',
                    penulis: adminCredential.username,
                    deskripsiBerita: ''
                })
            } else {
                if (req.file === null) {
                    let error_msg = "Input gambar berita!"
                    req.flash('error', error_msg)
                    res.render('panel/admin/berita/tambahDataBerita', {
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
                            res.render('panel/admin/berita/tambahDataBerita', {
                                judulBerita: dataBerita.gambarBerita,
                                tanggalUpdate: dataBerita.tanggalUpdate,
                                penulis: adminCredential.username,
                                deskripsiBerita: dataBerita.deskripsi
                            })
                        } else {
                            req.flash('success', "Berita berhasil ditambakan!")
                            res.render('panel/admin/berita/tambahDataBerita', {
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

app.get('/kelolaDataBerita', redirectLogin, (req, res) => {
    dbConnection.con.query("SELECT * FROM dataBerita", (err, rows, field) => {
        if (err) {
            res.render('panel/admin/berita/kelolaDataBerita', {
                listBerita: ''
            })
        } else {
            res.render('panel/admin/berita/kelolaDataBerita', {
                listBerita: rows
            })
        }
    })
})

app.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.redirect('panel/dashboard')
        } else {
            res.clearCookie('sid')
            res.redirect('/panel')
        }
    })
})

module.exports = app