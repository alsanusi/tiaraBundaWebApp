# ************************************************************
# Sequel Pro SQL dump
# Version 5446
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 8.0.16)
# Database: tiaraBunda
# Generation Time: 2020-06-27 06:45:01 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table dataBerita
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dataBerita`;

CREATE TABLE `dataBerita` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `gambarBerita` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `judulBerita` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `tanggalUpdate` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `deskripsi` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `penulis` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table dataGuru
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dataGuru`;

CREATE TABLE `dataGuru` (
  `id` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `fotoProfil` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `namaLengkap` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `tempatLahir` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `tanggalLahir` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `alamat` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `nomorTelefon` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `agama` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `jenisKelamin` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `password` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `dataGuru` WRITE;
/*!40000 ALTER TABLE `dataGuru` DISABLE KEYS */;

INSERT INTO `dataGuru` (`id`, `fotoProfil`, `namaLengkap`, `tempatLahir`, `tanggalLahir`, `alamat`, `nomorTelefon`, `agama`, `jenisKelamin`, `password`, `email`)
VALUES
	('G24235','fotoProfilGuru-1592982398578.jpeg','Tawil Fattawa','Ujung Pandang','2015-11-18','Bojongsoang','01112829758','Islam','Pria','12345','teacher1@gmail.com'),
	('G26170','fotoProfilGuru-1593180709942.jpeg','Mark Zuckerburger','Makassar','1996-11-18','Bojongsoang','12345','Islam','Pria','12345','teacher2@gmail.com');

/*!40000 ALTER TABLE `dataGuru` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dataKehadiran
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dataKehadiran`;

CREATE TABLE `dataKehadiran` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idSiswa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `tanggal` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `idGuru` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `mataPelajaran` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `namaSiswa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `idSiswa` (`idSiswa`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `dataKehadiran` WRITE;
/*!40000 ALTER TABLE `dataKehadiran` DISABLE KEYS */;

INSERT INTO `dataKehadiran` (`id`, `idSiswa`, `tanggal`, `status`, `idGuru`, `mataPelajaran`, `namaSiswa`)
VALUES
	(32,'S24811','2020-06-24','Hadir','G24235','PKN','Muhammad Alkautsar Sanusi');

/*!40000 ALTER TABLE `dataKehadiran` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dataKelas
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dataKelas`;

CREATE TABLE `dataKelas` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `kelas` int(100) NOT NULL,
  `idGuru` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `idGuru` (`idGuru`),
  CONSTRAINT `idGuru` FOREIGN KEY (`idGuru`) REFERENCES `dataguru` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `dataKelas` WRITE;
/*!40000 ALTER TABLE `dataKelas` DISABLE KEYS */;

INSERT INTO `dataKelas` (`id`, `kelas`, `idGuru`)
VALUES
	(1,1,'G24235'),
	(3,2,'G26170');

/*!40000 ALTER TABLE `dataKelas` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dataKelasSiswa
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dataKelasSiswa`;

CREATE TABLE `dataKelasSiswa` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idSiswa` varchar(100) DEFAULT NULL,
  `namaSiswa` varchar(100) DEFAULT NULL,
  `kelas` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `siswa` (`idSiswa`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `dataKelasSiswa` WRITE;
/*!40000 ALTER TABLE `dataKelasSiswa` DISABLE KEYS */;

INSERT INTO `dataKelasSiswa` (`id`, `idSiswa`, `namaSiswa`, `kelas`)
VALUES
	(10,'S24811','Muhammad Alkautsar Sanusi',1);

/*!40000 ALTER TABLE `dataKelasSiswa` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dataNilai
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dataNilai`;

CREATE TABLE `dataNilai` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idGuru` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `idSiswa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `nilaiTugasPkn` int(100) DEFAULT NULL,
  `nilaiUjianPkn` int(11) DEFAULT NULL,
  `nilaiTugasMatematika` int(11) DEFAULT NULL,
  `nilaiUjianMatematika` int(11) DEFAULT NULL,
  `nilaiTugasIps` int(11) DEFAULT NULL,
  `nilaiUjianIps` int(11) DEFAULT NULL,
  `nilaiTugasAgama` int(11) DEFAULT NULL,
  `nilaiUjianAgama` int(11) DEFAULT NULL,
  `nilaiTugasIpa` int(11) DEFAULT NULL,
  `nilaiUjianIpa` int(11) DEFAULT NULL,
  `nilaiTugasBahasaIndonesia` int(11) DEFAULT NULL,
  `nilaiUjianBahasaIndonesia` int(11) DEFAULT NULL,
  `nilaiTugasBahasaInggris` int(11) DEFAULT NULL,
  `nilaiUjianBahasaInggris` int(11) DEFAULT NULL,
  `nilaiTugasPenjaskes` int(11) DEFAULT NULL,
  `nilaiUjianPenjaskes` int(11) DEFAULT NULL,
  `nilaiTugasSeniBudaya` int(11) DEFAULT NULL,
  `nilaiUjianSeniBudaya` int(11) DEFAULT NULL,
  `catatanSiswa` varchar(5000) DEFAULT NULL,
  `namaSiswa` varchar(100) DEFAULT NULL,
  `kelas` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idKelas2` (`idGuru`),
  KEY `idSiswa2` (`idSiswa`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `dataNilai` WRITE;
/*!40000 ALTER TABLE `dataNilai` DISABLE KEYS */;

INSERT INTO `dataNilai` (`id`, `idGuru`, `idSiswa`, `nilaiTugasPkn`, `nilaiUjianPkn`, `nilaiTugasMatematika`, `nilaiUjianMatematika`, `nilaiTugasIps`, `nilaiUjianIps`, `nilaiTugasAgama`, `nilaiUjianAgama`, `nilaiTugasIpa`, `nilaiUjianIpa`, `nilaiTugasBahasaIndonesia`, `nilaiUjianBahasaIndonesia`, `nilaiTugasBahasaInggris`, `nilaiUjianBahasaInggris`, `nilaiTugasPenjaskes`, `nilaiUjianPenjaskes`, `nilaiTugasSeniBudaya`, `nilaiUjianSeniBudaya`, `catatanSiswa`, `namaSiswa`, `kelas`)
VALUES
	(4,'G24235','S24811',80,80,60,60,90,90,90,90,100,100,60,80,80,100,90,100,100,100,'Bagus','Muhammad Alkautsar Sanusi',1);

/*!40000 ALTER TABLE `dataNilai` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dataSiswa
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dataSiswa`;

CREATE TABLE `dataSiswa` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `fotoProfil` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `namaLengkap` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `tempatLahir` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `tanggalLahir` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `alamat` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `namaAyah` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `namaIbu` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `nomorTelefon` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `agama` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `jenisKelamin` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `dataSiswa` WRITE;
/*!40000 ALTER TABLE `dataSiswa` DISABLE KEYS */;

INSERT INTO `dataSiswa` (`id`, `fotoProfil`, `namaLengkap`, `tempatLahir`, `tanggalLahir`, `alamat`, `namaAyah`, `namaIbu`, `nomorTelefon`, `agama`, `jenisKelamin`)
VALUES
	('S24811','fotoProfil-1592982276968.jpeg','Muhammad Alkautsar Sanusi','Ujung Pandang','2015-11-18','Jln Toddopuli X No 11','Parent1','Parent2','082194275704','Islam','Pria');

/*!40000 ALTER TABLE `dataSiswa` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table kotakSaran
# ------------------------------------------------------------

DROP TABLE IF EXISTS `kotakSaran`;

CREATE TABLE `kotakSaran` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `namaLengkap` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `nomorTelefon` varchar(30) NOT NULL DEFAULT '',
  `saran` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
