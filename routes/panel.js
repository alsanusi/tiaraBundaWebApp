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
const direktoriProfilGuru = 'views/uploads/guru'
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        if (file.fieldname === 'gambarBerita') {
            callback(null, direktoriGambarBerita);
        } else if (file.fieldname === 'fotoProfilGuru') {
            callback(null, direktoriProfilGuru);
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

const generateIdGuru = () => {
    let uniqueId, currentDate, day;
    uniqueId = Math.floor(Math.random() * 1000);
    currentDate = new Date();
    day = currentDate.getDate()
    return 'G' + day + uniqueId;
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
            status: 'Siswa'
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
                    alamat: '',
                    namaAyah: '',
                    namaIbu: '',
                    nomorTelefon: '',
                    status: 'Siswa',
                    agama: '',
                    jenisKelamin: '',
                    tahunAngkatan: ''
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
                        alamat: '',
                        namaAyah: '',
                        namaIbu: '',
                        nomorTelefon: '',
                        status: 'Siswa',
                        agama: '',
                        jenisKelamin: '',
                        tahunAngkatan: ''
                    })
                } else {
                    let dataSiswa = {
                        id: generateIdSiswa(),
                        fotoProfil: req.file.filename,
                        namaLengkap: req.sanitize('namaLengkap').escape().trim(),
                        tempatLahir: req.sanitize('tempatLahir').escape().trim(),
                        tanggalLahir: req.sanitize('tanggalLahir').escape().trim(),
                        alamat: req.sanitize('alamat').escape().trim(),
                        namaAyah: req.sanitize('namaAyah').escape().trim(),
                        namaIbu: req.sanitize('namaIbu').escape().trim(),
                        nomorTelefon: req.sanitize('nomorTelefon').escape().trim(),
                        status: 'Siswa',
                        agama: req.sanitize('agama').escape().trim(),
                        jenisKelamin: req.sanitize('jenisKelamin').escape().trim(),
                        tahunAngkatan: req.sanitize('tahunAngkatan').escape().trim()
                    }
                    dbConnection.con.query('INSERT INTO dataSiswa SET ?', dataSiswa, (err, result) => {
                        if (err) {
                            req.flash('error', err)
                            res.render('panel/admin/siswa/tambahDataSiswa', {
                                id: dataSiswa.id,
                                namaLengkap: dataSiswa.namaLengkap,
                                tempatLahir: dataSiswa.tempatLahir,
                                tanggalLahir: dataSiswa.tanggalLahir,
                                alamat: dataSiswa.alamat,
                                namaAyah: dataSiswa.namaAyah,
                                namaIbu: dataSiswa.namaIbu,
                                nomorTelefon: dataSiswa.nomorTelefon,
                                status: dataSiswa.status,
                                agama: dataSiswa.agama,
                                jenisKelamin: dataSiswa.jenisKelamin,
                                tahunAngkatan: dataSiswa.tahunAngkatan
                            })
                        } else {
                            req.flash('success', 'Data siswa berhasil ditambahkan!')
                            res.render('panel/admin/siswa/tambahDataSiswa', {
                                id: generateIdSiswa(),
                                namaLengkap: '',
                                tempatLahir: '',
                                tanggalLahir: '',
                                alamat: '',
                                namaAyah: '',
                                namaIbu: '',
                                nomorTelefon: '',
                                status: 'Siswa',
                                agama: '',
                                jenisKelamin: '',
                                tahunAngkatan: ''
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

app.route('/editDataSiswa/(:id)', redirectLogin)
    .get((req, res) => {
        dbConnection.con.query('SELECT * FROM dataSiswa WHERE id = ?', [req.params.id], (err, rows, fields) => {
            let data = rows[0];
            if (err) {
                res.redirect('/panel/kelolaDataSiswa')
            } else {
                res.render('panel/admin/siswa/editDataSiswa', {
                    id: req.params.id,
                    namaLengkap: data.namaLengkap,
                    tempatLahir: data.tempatLahir,
                    tanggalLahir: data.tanggalLahir,
                    kelas: data.kelas,
                    semester: data.semester,
                    alamat: data.alamat,
                    namaAyah: data.namaAyah,
                    namaIbu: data.namaIbu,
                    nomorTelefon: data.nomorTelefon,
                    status: data.status
                })
            }
        })
    })
    .put((req, res) => {
        let dataSiswa = {
            id: req.params.id,
            namaLengkap: req.sanitize('namaLengkap').escape().trim(),
            tempatLahir: req.sanitize('tempatLahir').escape().trim(),
            tanggalLahir: req.sanitize('tanggalLahir').escape().trim(),
            kelas: req.sanitize('kelas').escape().trim(),
            semester: req.sanitize('semester').escape().trim(),
            alamat: req.sanitize('alamat').escape().trim(),
            namaAyah: req.sanitize('namaAyah').escape().trim(),
            namaIbu: req.sanitize('namaIbu').escape().trim(),
            nomorTelefon: req.sanitize('nomorTelefon').escape().trim(),
            status: req.sanitize('status').escape().trim()
        }
        dbConnection.con.query("UPDATE dataSiswa SET ? WHERE id = ?", [dataSiswa, req.params.id], (err, rows) => {
            if (err) {
                req.flash('error', err)
                res.render('panel/admin/siswa/editDataSiswa', {
                    id: req.params.id,
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
                res.redirect('/panel/kelolaDataSiswa')
            }
        })
    })
    .delete((req, res) => {
        dbConnection.con.query('DELETE FROM dataSiswa WHERE id = ?', req.params.id, (err, rows, fields) => {
            if (err) {
                res.redirect('/panel/kelolaDataSiswa')
            } else {
                res.redirect('/panel/kelolaDataSiswa')
            }
        })
    })

// Guru
const fotoProfilGuru = upload.single("fotoProfilGuru")
app.route('/tambahDataGuru', redirectLogin)
    .get((req, res) => {
        res.render('panel/admin/guru/tambahDataGuru', {
            id: generateIdGuru(),
        })
    })
    .post((req, res) => {
        fotoProfilGuru(req, res, (err) => {
            if (err) {
                let error_msg = "Besar foto profil guru melebihi 3 MB!"
                req.flash('error', error_msg)
                res.render('panel/admin/guru/tambahDataGuru', {
                    id: generateIdGuru(),
                    namaLengkap: '',
                    tempatLahir: '',
                    tanggalLahir: '',
                    alamat: '',
                    jenisKelamin: '',
                    agama: '',
                    nomorTelefon: ''
                })
            } else {
                if (req.file === null) {
                    let error_msg = 'Input foto profil guru!'
                    req.flash('error', error_msg)
                    res.render('panel/admin/guru/tambahDataGuru', {
                        id: generateIdGuru(),
                        namaLengkap: '',
                        tempatLahir: '',
                        tanggalLahir: '',
                        alamat: '',
                        nomorTelefon: '',
                        jenisKelamin: '',
                        agama: ''
                    })
                } else {
                    let dataGuru = {
                        id: generateIdGuru(),
                        fotoProfil: req.file.filename,
                        namaLengkap: req.sanitize('namaLengkap').escape().trim(),
                        tempatLahir: req.sanitize('tempatLahir').escape().trim(),
                        tanggalLahir: req.sanitize('tanggalLahir').escape().trim(),
                        alamat: req.sanitize('alamat').escape().trim(),
                        nomorTelefon: req.sanitize('nomorTelefon').escape().trim(),
                        jenisKelamin: req.sanitize('jenisKelamin').escape().trim(),
                        agama: req.sanitize('agama').escape().trim(),
                    }
                    dbConnection.con.query("INSERT INTO dataGuru SET ?", dataGuru, (err, result) => {
                        if (err) {
                            req.flash('error', err)
                            res.render('panel/admin/guru/tambahDataGuru', {
                                id: dataGuru.id,
                                namaLengkap: dataGuru.namaLengkap,
                                tempatLahir: dataGuru.tempatLahir,
                                tanggalLahir: dataGuru.tanggalLahir,
                                alamat: dataGuru.alamat,
                                nomorTelefon: dataGuru.nomorTelefon,
                                jenisKelamin: dataGuru.jenisKelamin,
                                agama: dataGuru.agama
                            })
                        } else {
                            req.flash('success', 'Data guru berhasil ditambahkan!')
                            res.render('panel/admin/guru/tambahDataGuru', {
                                id: generateIdGuru(),
                                namaLengkap: '',
                                tempatLahir: '',
                                tanggalLahir: '',
                                alamat: '',
                                nomorTelefon: '',
                                jenisKelamin: '',
                                agama: ''
                            })
                        }
                    })
                }
            }
        })
    })

app.get('/kelolaDataGuru', redirectLogin, (req, res) => {
    dbConnection.con.query("SELECT * FROM dataGuru", (err, rows, field) => {
        if (err) {
            res.render('panel/admin/guru/kelolaDataGuru', {
                listGuru: ''
            })
        } else {
            res.render('panel/admin/guru/kelolaDataGuru', {
                listGuru: rows
            })
        }
    })
})

app.route('/editDataGuru/(:id)', redirectLogin)
    .get((req, res) => {
        dbConnection.con.query('SELECT * FROM dataGuru WHERE id = ?', [req.params.id], (err, rows, fields) => {
            let data = rows[0];
            if (err) {
                res.redirect('/panel/kelolaDataGuru')
            } else {
                res.render('panel/admin/guru/editDataGuru', {
                    id: req.params.id,
                    namaLengkap: data.namaLengkap,
                    tempatLahir: data.tempatLahir,
                    tanggalLahir: data.tanggalLahir,
                    jenisKelamin: data.jenisKelamin,
                    agama: data.agama,
                    alamat: data.alamat,
                    nomorTelefon: data.nomorTelefon
                })
            }
        })
    })
    .put((req, res) => {
        let dataGuru = {
            id: req.params.id,
            namaLengkap: req.sanitize('namaLengkap').escape().trim(),
            tempatLahir: req.sanitize('tempatLahir').escape().trim(),
            tanggalLahir: req.sanitize('tanggalLahir').escape().trim(),
            alamat: req.sanitize('alamat').escape().trim(),
            nomorTelefon: req.sanitize('nomorTelefon').escape().trim(),
            jenisKelamin: req.sanitize('jenisKelamin').escape().trim(),
            agama: req.sanitize('agama').escape().trim()
        }
        dbConnection.con.query("UPDATE dataGuru SET ? WHERE id = ?", [dataGuru, req.params.id], (err, rows) => {
            if (err) {
                req.flash('error', err)
                res.render('panel/admin/guru/editDataGuru', {
                    id: req.params.id,
                    namaLengkap: dataGuru.namaLengkap,
                    tempatLahir: dataGuru.tempatLahir,
                    tanggalLahir: dataGuru.tanggalLahir,
                    jenisKelamin: dataGuru.jenisKelamin,
                    agama: dataGuru.agama,
                    alamat: dataGuru.alamat,
                    nomorTelefon: dataGuru.nomorTelefon
                })
            } else {
                res.redirect('/panel/kelolaDataGuru')
            }
        })
    })
    .delete((req, res) => {
        dbConnection.con.query('DELETE FROM dataGuru WHERE id = ?', req.params.id, (err, rows, fields) => {
            if (err) {
                res.redirect('/panel/kelolaDataGuru')
            } else {
                res.redirect('/panel/kelolaDataGuru')
            }
        })
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

app.route('/editDataBerita/(:id)', redirectLogin)
    .get((req, res) => {
        dbConnection.con.query('SELECT * FROM dataBerita WHERE id = ?', [req.params.id], (err, rows, fields) => {
            let data = rows[0]
            if (err) {
                res.redirect('/panel/kelolaDataBerita')
            } else {
                res.render('panel/admin/berita/editDataBerita', {
                    id: data.id,
                    judulBerita: data.judulBerita,
                    tanggalUpdate: data.tanggalUpdate,
                    deskripsi: data.deskripsi,
                    penulis: data.penulis
                })
            }
        })
    })
    .put((req, res) => {
        let dataBerita = {
            id: req.params.id,
            judulBerita: req.sanitize('judulBerita').escape().trim(),
            tanggalUpdate: req.sanitize('tanggalUpdate').escape().trim(),
            deskripsi: req.sanitize('deskripsiBerita').escape().trim(),
            penulis: req.sanitize('penulis').escape().trim()
        }
        dbConnection.con.query("UPDATE dataBerita SET ? WHERE id = ?", [dataBerita, req.params.id], (err, rows) => {
            if (err) {
                req.flash('error', err)
                res.render('panel/admin/berita/editDataBerita', {
                    id: req.params.id,
                    judulBerita: dataBerita.judulBerita,
                    tanggalUpdate: dataBerita.tanggalUpdate,
                    deskripsi: dataBerita.deskripsi,
                    penulis: dataBerita.penulis
                })
            } else {
                res.redirect('/panel/kelolaDataBerita')
            }
        })
    })
    .delete((req, res) => {
        dbConnection.con.query('DELETE FROM dataBerita WHERE id = ?', req.params.id, (err, rows, fields) => {
            if (err) {
                res.redirect('/panel/kelolaDataBerita')
            } else {
                res.redirect('/panel/kelolaDataBerita')
            }
        })
    })

// Kotak Saran
app.get('/kelolaKotakSaran', redirectLogin, (req, res) => {
    dbConnection.con.query("SELECT * FROM kotakSARAN", (err, rows, field) => {
        if (err) {
            res.render('panel/admin/kotakSaran/kelolaKotakSaran', {
                listSaran: ''
            })
        } else {
            res.render('panel/admin/kotakSaran/kelolaKotakSaran', {
                listSaran: rows
            })
        }
    })
})

app.route('/detailSaran/(:id)', redirectLogin)
    .get((req, res) => {
        dbConnection.con.query('SELECT * FROM kotakSaran WHERE id = ?', [req.params.id], (err, rows, fields) => {
            if (err) {
                res.redirect('/panel/kelolaKotakSaran')
            } else {
                res.render('panel/admin/kotakSaran/detailSaran', {
                    id: rows[0].id,
                    namaLengkap: rows[0].namaLengkap,
                    email: rows[0].email,
                    nomorTelefon: rows[0].nomorTelefon,
                    saran: rows[0].saran
                })
            }
        })
    })
    .delete((req, res) => {
        dbConnection.con.query('DELETE FROM kotakSaran WHERE id = ?', req.params.id, (err, rows, fields) => {
            if (err) {
                res.redirect('/panel/kelolaKotakSaran')
            } else {
                res.redirect('/panel/kelolaKotakSaran')
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