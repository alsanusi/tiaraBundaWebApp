const express = require('express')
const app = express()

// Koneksi Database
const dbConnection = require('../db_config/db_connection')
let idGuru, kelasGuru, mapelGuru, pilihanTanggal, idNilaiSiswa;

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

app.get('/kelolaJadwal', redirectLogin, (req, res) => {
    res.render('guru/jadwalPelajaran')
})

app.get('/absensiSiswa', redirectLogin, (req, res) => {
    res.render('guru/absensiSiswa', {
        listSiswa: '',
        pilihanTanggal: todayDate(),
        mapelGuru: ''
    })
})

app.route('/pilihanMapel', redirectLogin)
    .get((req, res) => {
        if (mapelGuru) {
            dbConnection.con.query("SELECT * FROM dataKelasSiswa WHERE kelas = ?", [kelasGuru], (err, rows, field) => {
                if (err) {
                    res.render('guru/absensiSiswa', {
                        listSiswa: '',
                        pilihanTanggal: ''
                    })
                } else {
                    res.render('guru/absensiSiswa', {
                        listSiswa: rows,
                        mapelGuru: mapelGuru,
                        pilihanTanggal: todayDate()
                    })
                }
            })
        } else {
            res.render('guru/absensiSiswa', {
                listSiswa: '',
                pilihanTanggal: ''
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
                        pilihanTanggal: ''
                    })
                } else {
                    res.render('guru/absensiSiswa', {
                        listSiswa: rows,
                        mapelGuru: mapelGuru,
                        pilihanTanggal: todayDate(),
                    })
                }
            })
        } else {
            res.render('guru/absensiSiswa', {
                listSiswa: '',
                mapelGuru: '',
                pilihanTanggal: todayDate(),
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
            mapelGuru: ''
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
                mapelGuru: ''
            })
        } else {
            res.render('guru/kelolaAbsensiSiswa', {
                listSiswa: rows,
                pilihanTanggal: pilihanTanggal,
                mapelGuru: mapelGuru
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
                mapelGuru: ''
            })
        } else {
            res.render('guru/kelolaAbsensiSiswa', {
                listSiswa: rows,
                pilihanTanggal: pilihanTanggal,
                mapelGuru: mapelGuru
            })
        }
    })
})

app.get('/kelolaDataSiswa', redirectLogin, (req, res) => {
    dbConnection.con.query("SELECT * FROM dataKelasSiswa WHERE kelas = ?", [kelasGuru], (err, rows, field) => {
        if (err) {
            res.render('guru/kelolaDataSiswa', {
                listSiswa: '',
            })
        } else {
            res.render('guru/kelolaDataSiswa', {
                listSiswa: rows,
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
                namaLengkap: data.namaLengkap,
                tempatLahir: data.tempatLahir,
                tanggalLahir: data.tanggalLahir,
                kelas: kelasGuru,
                alamat: data.alamat,
                namaAyah: data.namaAyah,
                namaIbu: data.namaIbu,
                nomorTelefon: data.nomorTelefon,
                status: data.status,
                pkn: nilaiSiswa.pkn ? nilaiSiswa.pkn : 0,
                matematika: nilaiSiswa.matematika ? nilaiSiswa.matematika : 0,
                ips: nilaiSiswa.ips ? nilaiSiswa.ips : 0,
                agama: nilaiSiswa.agama ? nilaiSiswa.agama : 0,
                ipa: nilaiSiswa.ipa ? nilaiSiswa.ipa : 0,
                bahasaIndonesia: nilaiSiswa.bahasaIndonesia ? nilaiSiswa.bahasaIndonesia : 0,
                bahasaInggris: nilaiSiswa.bahasaInggris ? nilaiSiswa.bahasaInggris : 0,
                penjaskes: nilaiSiswa.penjaskes ? nilaiSiswa.penjaskes : 0,
                seniBudaya: nilaiSiswa.seniBudaya ? nilaiSiswa.seniBudaya : 0,
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
        pkn: req.sanitize('pkn').escape().trim(),
        matematika: req.sanitize('matematika').escape().trim(),
        ips: req.sanitize('ips').escape().trim(),
        agama: req.sanitize('agama').escape().trim(),
        ipa: req.sanitize('ipa').escape().trim(),
        bahasaIndonesia: req.sanitize('bahasaIndonesia').escape().trim(),
        bahasaInggris: req.sanitize('bahasaInggris').escape().trim(),
        penjaskes: req.sanitize('penjaskes').escape().trim(),
        seniBudaya: req.sanitize('seniBudaya').escape().trim(),
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