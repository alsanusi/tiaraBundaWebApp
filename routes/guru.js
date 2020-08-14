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
        dbConnection.con.query("SELECT * FROM dataNilaiSiswa WHERE idSiswa = ?", [idSiswa], (err, rows) => {
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

const checkJadwalGuru = (kelasGuru) => {
    return new Promise((resolve, reject) => {
        dbConnection.con.query("SELECT * FROM dataJadwalMapel WHERE kelas = ?", [kelasGuru], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

const checkListMapel = () => {
    return new Promise((resolve, reject) => {
        dbConnection.con.query("SELECT * FROM dataMapel", (err, rows) => {
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

app.get('/kelolaJadwal', redirectLogin, async (req, res) => {
    const hasilCheckJadwalGuru = await checkJadwalGuru(kelasGuru);
    res.render('guru/jadwalPelajaran', {
        namaGuru: namaGuru,
        jadwalKelas: hasilCheckJadwalGuru,
        kelas: kelasGuru
    })
})

app.get('/absensiSiswa', redirectLogin, async (req, res) => {
    const hasilCheckListMapel = await checkListMapel();
    res.render('guru/absensiSiswa', {
        listSiswa: '',
        pilihanTanggal: todayDate(),
        listMapelGuru: hasilCheckListMapel,
        mapelGuru: '',
        namaGuru: namaGuru
    })
})

app.route('/pilihanMapel', redirectLogin)
    .get(async (req, res) => {
        const hasilCheckListMapel = await checkListMapel();
        if (mapelGuru) {
            dbConnection.con.query("SELECT * FROM dataKelasSiswa WHERE kelas = ?", [kelasGuru], (err, rows, field) => {
                if (err) {
                    res.render('guru/absensiSiswa', {
                        listSiswa: '',
                        pilihanTanggal: '',
                        namaGuru: namaGuru,
                        listMapelGuru: hasilCheckListMapel,
                    })
                } else {
                    res.render('guru/absensiSiswa', {
                        listSiswa: rows,
                        listMapelGuru: hasilCheckListMapel,
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
                listMapelGuru: hasilCheckListMapel,
                namaGuru: namaGuru
            })
        }
    })
    .post(async (req, res) => {
        const hasilCheckListMapel = await checkListMapel();
        mapelGuru = req.sanitize('mapel').escape().trim()
        if (mapelGuru) {
            dbConnection.con.query("SELECT * FROM dataKelasSiswa WHERE kelas = ?", [kelasGuru], (err, rows, field) => {
                if (err) {
                    res.render('guru/absensiSiswa', {
                        listSiswa: '',
                        listMapelGuru: hasilCheckListMapel,
                        mapelGuru: '',
                        pilihanTanggal: '',
                        namaGuru: namaGuru
                    })
                } else {
                    res.render('guru/absensiSiswa', {
                        listSiswa: rows,
                        listMapelGuru: hasilCheckListMapel,
                        mapelGuru: mapelGuru,
                        pilihanTanggal: todayDate(),
                        namaGuru: namaGuru
                    })
                }
            })
        } else {
            res.render('guru/absensiSiswa', {
                listSiswa: '',
                listMapelGuru: hasilCheckListMapel,
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
    .get(async (req, res) => {
        const hasilCheckListMapel = await checkListMapel();
        res.render('guru/kelolaAbsensiSiswa', {
            listSiswa: '',
            pilihanTanggal: '',
            listMapelGuru: hasilCheckListMapel,
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

app.post('/cariAbsensi', redirectLogin, async (req, res) => {
    let tanggal, mataPelajaran;
    const hasilCheckListMapel = await checkListMapel();
    tanggal = req.sanitize('tanggalPelajaran').escape().trim();
    mataPelajaran = req.sanitize('mapel').escape().trim();
    mapelGuru = mataPelajaran
    pilihanTanggal = tanggal
    dbConnection.con.query("SELECT * FROM dataKehadiran WHERE tanggal = ? AND mataPelajaran = ?", [tanggal, mataPelajaran], (err, rows, field) => {
        if (err) {
            res.render('guru/kelolaAbsensiSiswa', {
                listSiswa: '',
                pilihanTanggal: '',
                listMapelGuru: hasilCheckListMapel,
                mapelGuru: '',
                namaGuru: namaGuru
            })
        } else {
            res.render('guru/kelolaAbsensiSiswa', {
                listSiswa: rows,
                pilihanTanggal: pilihanTanggal,
                listMapelGuru: hasilCheckListMapel,
                mapelGuru: mapelGuru,
                namaGuru: namaGuru
            })
        }
    })
})

app.get('/detailAbsensi', redirectLogin, async (req, res) => {
    const hasilCheckListMapel = await checkListMapel();
    dbConnection.con.query("SELECT * FROM dataKehadiran WHERE tanggal = ? AND mataPelajaran = ?", [pilihanTanggal, mapelGuru], (err, rows, field) => {
        if (err) {
            res.render('guru/kelolaAbsensiSiswa', {
                listSiswa: '',
                pilihanTanggal: '',
                listMapelGuru: hasilCheckListMapel,
                mapelGuru: '',
                namaGuru: namaGuru
            })
        } else {
            res.render('guru/kelolaAbsensiSiswa', {
                listSiswa: rows,
                pilihanTanggal: pilihanTanggal,
                listMapelGuru: hasilCheckListMapel,
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
    const hasilCheckListMapel = await checkListMapel()
    dbConnection.con.query('SELECT * FROM dataSiswa WHERE id = ?', [req.params.id], (err, rows, fields) => {
        let data = rows[0];
        if (err) {
            res.redirect('kelolaDataSiswa')
        } else {
            res.render('guru/detailDataSiswa', {
                id: req.params.id,
                namaGuru: namaGuru,
                fotoProfil: data.fotoProfil,
                namaLengkap: data.namaLengkap,
                kelas: kelasGuru,
                status: data.status,
                listMapel: hasilCheckListMapel,
                listNilaiSiswa: hasilCheckNilaiSiswa
            })
        }
    })
})

app.post('/tambahNilaiSiswa', redirectLogin, (req, res) => {
    let dataNilaiSiswa = {
        idGuru: idGuru,
        idSiswa: req.sanitize('id').escape().trim(),
        mapel: req.sanitize('mapel').escape().trim(),
        namaSiswa: req.sanitize('namaSiswa').escape().trim(),
        nilaiTugas: req.sanitize('nilaiTugas').toInt(),
        nilaiTugas2: req.sanitize('nilaiTugas2').escape().trim() ? req.sanitize('nilaiTugas2').toInt() : 0,
        nilaiTugas3: req.sanitize('nilaiTugas3').escape().trim() ? req.sanitize('nilaiTugas3').toInt() : 0,
        nilaiUjian: req.sanitize('nilaiUjian').toInt(),
        nilaiUjian2: req.sanitize('nilaiUjian2').escape().trim() ? req.sanitize('nilaiUjian2').toInt() : 0,
        nilaiUjian3: req.sanitize('nilaiUjian3').escape().trim() ? req.sanitize('nilaiUjian3').toInt() : 0,
        kelas: kelasGuru
    }
    dbConnection.con.query("INSERT INTO dataNilaiSiswa SET ?", dataNilaiSiswa, (err, result) => {
        if (err) {
            req.flash('error', err)
            res.redirect("/guru/kelolaDataSiswa")
        } else {
            res.redirect("/guru/kelolaDataSiswa")
        }
    })
})

app.route('/editNilaiSiswa/(:id)', redirectLogin)
    .get(async (req, res) => {
        const hasilCheckListMapel = await checkListMapel()
        dbConnection.con.query('SELECT * FROM dataNilaiSiswa WHERE id = ?', [req.params.id], (err, rows, fields) => {
            if (err) {
                res.redirect('kelolaDataSiswa')
            } else {
                res.render('guru/editDataSiswa', {
                    id: req.params.id,
                    namaGuru: namaGuru,
                    listMapel: hasilCheckListMapel,
                    listNilaiSiswa: rows
                })
            }
        })
    })
    .put((req, res) => {
        let dataNilaiSiswa = {
            id: req.params.id,
            idGuru: idGuru,
            idSiswa: req.sanitize('id').escape().trim(),
            nilaiTugas: req.sanitize('nilaiTugas').toInt(),
            nilaiTugas2: req.sanitize('nilaiTugas2').escape().trim() ? req.sanitize('nilaiTugas2').toInt() : 0,
            nilaiTugas3: req.sanitize('nilaiTugas3').escape().trim() ? req.sanitize('nilaiTugas3').toInt() : 0,
            nilaiUjian: req.sanitize('nilaiUjian').toInt(),
            nilaiUjian2: req.sanitize('nilaiUjian2').escape().trim() ? req.sanitize('nilaiUjian2').toInt() : 0,
            nilaiUjian3: req.sanitize('nilaiUjian3').escape().trim() ? req.sanitize('nilaiUjian3').toInt() : 0,
        }
        dbConnection.con.query("UPDATE dataNilaiSiswa SET ? WHERE id = ?", [dataNilaiSiswa, req.params.id], (err, rows) => {
            if (err) {
                req.flash('error', err)
                res.redirect('/guru/kelolaDataSiswa')
            } else {
                res.redirect('/guru/kelolaDataSiswa')
            }
        })
    })
    .delete((req, res) => {
        dbConnection.con.query('DELETE FROM dataNilaiSiswa WHERE id = ?', req.params.id, (err, rows, fields) => {
            if (err) {
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