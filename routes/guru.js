const express = require('express')
const app = express()

// Koneksi Database
const dbConnection = require('../db_config/db_connection')
let idGuru, namaGuru, kelasGuru, mapelGuru, pilihanTanggal, idNilaiSiswa;

const todayDate = () => {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return yyyy + '-' + mm + '-' + dd;
}

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/guru')
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

const checkDataGuru = (email, pass) => {
    return new Promise((resolve, reject) => {
        dbConnection.con.query("SELECT * FROM dataGuru WHERE email = ? AND password = ?", [email, pass], (err, rows) => {
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

const checkKelasGuru = (idGuru) => {
    return new Promise((resolve, reject) => {
        dbConnection.con.query("SELECT kelas FROM dataKelas WHERE idGuru = ?", [idGuru], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

// const listAbsensiSiswa = (idGuru, mapelGuru) => {
//     return new Promise((resolve, reject) => {
//         dbConnection.con.query("SELECT * FROM dataKehadiran WHERE idGuru = ? AND mataPelajaran = ?", [idGuru, mapelGuru], (err, rows) => {
//             err ? reject(err) : resolve(rows)
//         })
//     })
// }

app.get('/', (req, res) => {
    res.render('guru/index')
})

app.post('/login', redirectHome, async (req, res) => {
    const checkHasilDataGuru = await checkDataGuru(req.body.email, req.body.password)
    const checkHasilKelasGuru = await checkKelasGuru(checkHasilDataGuru[0].id)

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
        namaGuru = checkHasilDataGuru[0].namaLengkap
        kelasGuru = checkHasilKelasGuru[0].kelas
        res.redirect('kelolaJadwal')
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
                    fotoProfil: data.fotoProfil,
                    namaGuru: namaGuru,
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
            alamat: req.sanitize('alamat').escape().trim(),
            nomorTelefon: req.sanitize('nomorTelefon').escape().trim(),
            email: req.sanitize('email').escape().trim(),
            password: req.sanitize('password').escape().trim()
        }
        dbConnection.con.query("UPDATE dataGuru SET ? WHERE id = ?", [dataGuru, idGuru], (err, rows) => {
            if (err) {
                req.flash('error', err)
                res.render('guru/profil', {
                    id: idGuru,
                    fotoProfil: data.fotoProfil,
                    namaGuru: namaGuru,
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

app.get('/kelolaJadwal', redirectLogin, (req, res) => {
    res.render('guru/jadwalPelajaran', {
        namaGuru: namaGuru
    })
})

app.get('/absensiSiswa', redirectLogin, (req, res) => {
    res.render('guru/absensiSiswa', {
        listSiswa: '',
        pilihanTanggal: todayDate(),
        mapelGuru: '',
        namaGuru: namaGuru
    })
})

app.route('/pilihanMapel', redirectLogin)
    .get((req, res) => {
        if (mapelGuru) {
            dbConnection.con.query("SELECT * FROM dataKelasSiswa WHERE kelas = ?", [kelasGuru], (err, rows, field) => {
                if (err) {
                    res.render('guru/absensiSiswa', {
                        listSiswa: '',
                        pilihanTanggal: '',
                        namaGuru: namaGuru
                    })
                } else {
                    res.render('guru/absensiSiswa', {
                        listSiswa: rows,
                        mapelGuru: mapelGuru,
                        pilihanTanggal: todayDate(),
                        namaGuru: namaGuru
                    })
                }
            })
        } else {
            res.render('guru/absensiSiswa', {
                listSiswa: '',
                pilihanTanggal: '',
                namaGuru: namaGuru
            })
        }
    })
    .post((req, res) => {
        mapelGuru = req.sanitize('mapel').escape().trim()
        if (mapelGuru) {
            dbConnection.con.query("SELECT * FROM dataKelasSiswa WHERE kelas = ?", [kelasGuru], (err, rows, field) => {
                if (err) {
                    res.render('guru/absensiSiswa', {
                        listSiswa: '',
                        mapelGuru: '',
                        pilihanTanggal: '',
                        namaGuru: namaGuru
                    })
                } else {
                    res.render('guru/absensiSiswa', {
                        listSiswa: rows,
                        mapelGuru: mapelGuru,
                        pilihanTanggal: todayDate(),
                        namaGuru: namaGuru
                    })
                }
            })
        } else {
            res.render('guru/absensiSiswa', {
                listSiswa: '',
                mapelGuru: '',
                pilihanTanggal: todayDate(),
                namaGuru: namaGuru
            })
        }
    })

app.post('/absensiSiswa', redirectLogin, (req, res) => {
    let dataAbsensi = {
        tanggal: todayDate(),
        idSiswa: req.sanitize('idSiswa').escape().trim(),
        status: req.sanitize('status').escape().trim(),
        namaSiswa: req.sanitize('namaSiswa').escape().trim(),
        mataPelajaran: mapelGuru,
        idGuru: idGuru
    }
    dbConnection.con.query("INSERT INTO dataKehadiran SET ?", dataAbsensi, (err, result) => {
        if (err) {
            req.flash('error', err)
            res.redirect('pilihanMapel')
        } else {
            req.flash('success', "Siswa berhasil diabsen!")
            res.redirect('pilihanMapel')
        }
    })
})

app.route('/kelolaAbsensi', redirectLogin)
    .get((req, res) => {
        res.render('guru/kelolaAbsensiSiswa', {
            listSiswa: '',
            pilihanTanggal: '',
            mapelGuru: '',
            namaGuru: namaGuru
        })
    })
    .put((req, res) => {
        let dataAbsensi = {
            tanggal: pilihanTanggal,
            id: req.sanitize('id').escape().trim(),
            idSiswa: req.sanitize('idSiswa').escape().trim(),
            status: req.sanitize('status').escape().trim(),
            namaSiswa: req.sanitize('namaSiswa').escape().trim(),
            mataPelajaran: mapelGuru,
            idGuru: idGuru
        }
        dbConnection.con.query("UPDATE dataKehadiran SET ? WHERE id = ?", [dataAbsensi, dataAbsensi.id], (err, rows) => {
            if (err) {
                req.flash('error', err)
                res.redirect('detailAbsensi')
            } else {
                req.flash('success', "Data absen siswa berhasil diupdate!")
                res.redirect('detailAbsensi')
            }
        })
    })

app.post('/cariAbsensi', redirectLogin, (req, res) => {
    let tanggal, mataPelajaran;
    tanggal = req.sanitize('tanggalPelajaran').escape().trim();
    mataPelajaran = req.sanitize('mapel').escape().trim();
    mapelGuru = mataPelajaran
    pilihanTanggal = tanggal
    dbConnection.con.query("SELECT * FROM dataKehadiran WHERE tanggal = ? AND mataPelajaran = ?", [tanggal, mataPelajaran], (err, rows, field) => {
        if (err) {
            res.render('guru/kelolaAbsensiSiswa', {
                listSiswa: '',
                pilihanTanggal: '',
                mapelGuru: '',
                namaGuru: namaGuru
            })
        } else {
            res.render('guru/kelolaAbsensiSiswa', {
                listSiswa: rows,
                pilihanTanggal: pilihanTanggal,
                mapelGuru: mapelGuru,
                namaGuru: namaGuru
            })
        }
    })
})

app.get('/detailAbsensi', redirectLogin, (req, res) => {
    dbConnection.con.query("SELECT * FROM dataKehadiran WHERE tanggal = ? AND mataPelajaran = ?", [pilihanTanggal, mapelGuru], (err, rows, field) => {
        if (err) {
            res.render('guru/kelolaAbsensiSiswa', {
                listSiswa: '',
                pilihanTanggal: '',
                mapelGuru: '',
                namaGuru: namaGuru
            })
        } else {
            res.render('guru/kelolaAbsensiSiswa', {
                listSiswa: rows,
                pilihanTanggal: pilihanTanggal,
                mapelGuru: mapelGuru,
                namaGuru: namaGuru
            })
        }
    })
})

app.get('/kelolaDataSiswa', redirectLogin, (req, res) => {
    dbConnection.con.query("SELECT * FROM dataKelasSiswa WHERE kelas = ?", [kelasGuru], (err, rows, field) => {
        if (err) {
            res.render('guru/kelolaDataSiswa', {
                listSiswa: '',
                namaGuru: namaGuru
            })
        } else {
            res.render('guru/kelolaDataSiswa', {
                listSiswa: rows,
                namaGuru: namaGuru
            })
        }
    })
})

app.get('/kelolaDataSiswa/(:id)', redirectLogin, async (req, res) => {
    const hasilCheckNilaiSiswa = await checkNilaiSiswa(req.params.id)
    let nilaiSiswa = hasilCheckNilaiSiswa[0]
    dbConnection.con.query('SELECT * FROM dataSiswa WHERE id = ?', [req.params.id], (err, rows, fields) => {
        idNilaiSiswa = nilaiSiswa.id
        let data = rows[0];
        if (err) {
            res.redirect('kelolaDataSiswa')
        } else {
            res.render('guru/detailDataSiswa', {
                id: req.params.id,
                namaGuru: namaGuru,
                fotoProfil: data.fotoProfil,
                namaLengkap: data.namaLengkap,
                tempatLahir: data.tempatLahir,
                tanggalLahir: data.tanggalLahir,
                kelas: kelasGuru,
                alamat: data.alamat,
                namaAyah: data.namaAyah,
                namaIbu: data.namaIbu,
                nomorTelefon: data.nomorTelefon,
                status: data.status,
                nilaiTugasPkn: nilaiSiswa.nilaiTugasPkn ? nilaiSiswa.nilaiTugasPkn : 0,
                nilaiUjianPkn: nilaiSiswa.nilaiUjianPkn ? nilaiSiswa.nilaiUjianPkn : 0,
                nilaiAkhirPkn: (nilaiSiswa.nilaiTugasPkn + nilaiSiswa.nilaiUjianPkn) / 2,
                nilaiTugasMatematika: nilaiSiswa.nilaiTugasMatematika ? nilaiSiswa.nilaiTugasMatematika : 0,
                nilaiUjianMatematika: nilaiSiswa.nilaiUjianMatematika ? nilaiSiswa.nilaiUjianMatematika : 0,
                nilaiAkhirMatematika: (nilaiSiswa.nilaiTugasMatematika + nilaiSiswa.nilaiUjianMatematika) / 2,
                nilaiTugasIps: nilaiSiswa.nilaiTugasIps ? nilaiSiswa.nilaiTugasIps : 0,
                nilaiUjianIps: nilaiSiswa.nilaiUjianIps ? nilaiSiswa.nilaiUjianIps : 0,
                nilaiAkhirIps: (nilaiSiswa.nilaiTugasIps + nilaiSiswa.nilaiUjianIps) / 2,
                nilaiTugasAgama: nilaiSiswa.nilaiTugasAgama ? nilaiSiswa.nilaiTugasAgama : 0,
                nilaiUjianAgama: nilaiSiswa.nilaiUjianAgama ? nilaiSiswa.nilaiUjianAgama : 0,
                nilaiAkhirAgama: (nilaiSiswa.nilaiTugasAgama + nilaiSiswa.nilaiUjianAgama) / 2,
                nilaiTugasIpa: nilaiSiswa.nilaiTugasIpa ? nilaiSiswa.nilaiTugasIpa : 0,
                nilaiUjianIpa: nilaiSiswa.nilaiUjianIpa ? nilaiSiswa.nilaiUjianIpa : 0,
                nilaiAkhirIpa: (nilaiSiswa.nilaiTugasIpa + nilaiSiswa.nilaiUjianIpa) / 2,
                nilaiTugasBahasaIndonesia: nilaiSiswa.nilaiTugasBahasaIndonesia ? nilaiSiswa.nilaiTugasBahasaIndonesia : 0,
                nilaiUjianBahasaIndonesia: nilaiSiswa.nilaiUjianBahasaIndonesia ? nilaiSiswa.nilaiUjianBahasaIndonesia : 0,
                nilaiAkhirBahasaIndonesia: (nilaiSiswa.nilaiTugasBahasaIndonesia + nilaiSiswa.nilaiUjianBahasaIndonesia) / 2,
                nilaiTugasBahasaInggris: nilaiSiswa.nilaiTugasBahasaInggris ? nilaiSiswa.nilaiTugasBahasaInggris : 0,
                nilaiUjianBahasaInggris: nilaiSiswa.nilaiUjianBahasaInggris ? nilaiSiswa.nilaiUjianBahasaInggris : 0,
                nilaiAkhirBahasaInggris: (nilaiSiswa.nilaiTugasBahasaInggris + nilaiSiswa.nilaiUjianBahasaInggris) / 2,
                nilaiTugasPenjaskes: nilaiSiswa.nilaiTugasPenjaskes ? nilaiSiswa.nilaiTugasPenjaskes : 0,
                nilaiUjianPenjaskes: nilaiSiswa.nilaiUjianPenjaskes ? nilaiSiswa.nilaiUjianPenjaskes : 0,
                nilaiAkhirPenjaskes: (nilaiSiswa.nilaiTugasPenjaskes + nilaiSiswa.nilaiUjianPenjaskes) / 2,
                nilaiTugasSeniBudaya: nilaiSiswa.nilaiTugasSeniBudaya ? nilaiSiswa.nilaiTugasSeniBudaya : 0,
                nilaiUjianSeniBudaya: nilaiSiswa.nilaiUjianSeniBudaya ? nilaiSiswa.nilaiUjianSeniBudaya : 0,
                nilaiAkhirSeniBudaya: (nilaiSiswa.nilaiTugasSeniBudaya + nilaiSiswa.nilaiUjianSeniBudaya) / 2,
                catatanSiswa: nilaiSiswa.catatanSiswa ? nilaiSiswa.catatanSiswa : "-",
            })
        }
    })
})

app.put('/kelolaDataSiswa/(:id)', redirectLogin, (req, res) => {
    let dataNilaiSiswa = {
        idGuru: idGuru,
        idSiswa: req.params.id,
        namaSiswa: req.sanitize('namaLengkap').escape().trim(),
        catatanSiswa: req.sanitize('catatanSiswa').escape().trim(),
        nilaiTugasPkn: req.sanitize('nilaiTugasPkn').escape().trim(),
        nilaiUjianPkn: req.sanitize('nilaiUjianPkn').escape().trim(),
        nilaiTugasMatematika: req.sanitize('nilaiTugasMatematika').escape().trim(),
        nilaiUjianMatematika: req.sanitize('nilaiUjianMatematika').escape().trim(),
        nilaiTugasIps: req.sanitize('nilaiTugasIps').escape().trim(),
        nilaiUjianIps: req.sanitize('nilaiUjianIps').escape().trim(),
        nilaiTugasAgama: req.sanitize('nilaiTugasAgama').escape().trim(),
        nilaiUjianAgama: req.sanitize('nilaiUjianAgama').escape().trim(),
        nilaiTugasIpa: req.sanitize('nilaiTugasIpa').escape().trim(),
        nilaiUjianIpa: req.sanitize('nilaiUjianIpa').escape().trim(),
        nilaiTugasBahasaIndonesia: req.sanitize('nilaiTugasBahasaIndonesia').escape().trim(),
        nilaiUjianBahasaIndonesia: req.sanitize('nilaiUjianBahasaIndonesia').escape().trim(),
        nilaiTugasBahasaInggris: req.sanitize('nilaiTugasBahasaInggris').escape().trim(),
        nilaiUjianBahasaInggris: req.sanitize('nilaiUjianBahasaInggris').escape().trim(),
        nilaiTugasPenjaskes: req.sanitize('nilaiTugasPenjaskes').escape().trim(),
        nilaiUjianPenjaskes: req.sanitize('nilaiUjianPenjaskes').escape().trim(),
        nilaiTugasSeniBudaya: req.sanitize('nilaiTugasSeniBudaya').escape().trim(),
        nilaiUjianSeniBudaya: req.sanitize('nilaiUjianSeniBudaya').escape().trim(),
        catatanSiswa: req.sanitize('catatanSiswa').escape().trim(),
        kelas: kelasGuru
    }
    dbConnection.con.query("UPDATE dataNilai SET ? WHERE id = ?", [dataNilaiSiswa, idNilaiSiswa], (err, rows) => {
        if (err) {
            req.flash('error', err)
            res.redirect('/guru/kelolaDataSiswa')
        } else {
            res.redirect('/guru/kelolaDataSiswa')
        }
    })
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