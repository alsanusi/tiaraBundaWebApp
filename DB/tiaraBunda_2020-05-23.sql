# ************************************************************
# Sequel Pro SQL dump
# Version 5446
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 8.0.16)
# Database: tiaraBunda
# Generation Time: 2020-05-22 21:09:15 +0000
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `dataBerita` WRITE;
/*!40000 ALTER TABLE `dataBerita` DISABLE KEYS */;

INSERT INTO `dataBerita` (`id`, `gambarBerita`, `judulBerita`, `tanggalUpdate`, `deskripsi`, `penulis`)
VALUES
	(1,'gambarBerita-1587462538357.png','Judul Berita1','2020-04-21','Test Test Test','admin');

/*!40000 ALTER TABLE `dataBerita` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dataGuru
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dataGuru`;

CREATE TABLE `dataGuru` (
  `id` varchar(150) NOT NULL DEFAULT '',
  `fotoProfil` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `namaLengkap` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `tempatLahir` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `tanggalLahir` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `alamat` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `nomorTelefon` int(150) NOT NULL,
  `mataPelajaran` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table dataSiswa
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dataSiswa`;

CREATE TABLE `dataSiswa` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `fotoProfil` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `namaLengkap` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `tempatLahir` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `tanggalLahir` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `kelas` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `semester` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `alamat` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `namaAyah` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `namaIbu` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `nomorTelefon` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `status` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `dataSiswa` WRITE;
/*!40000 ALTER TABLE `dataSiswa` DISABLE KEYS */;

INSERT INTO `dataSiswa` (`id`, `fotoProfil`, `namaLengkap`, `tempatLahir`, `tanggalLahir`, `kelas`, `semester`, `alamat`, `namaAyah`, `namaIbu`, `nomorTelefon`, `status`)
VALUES
	('S20655','fotoProfil-1587368527898.jpeg','Student1','Makassar','1996-11-18','1','1','Jln Toddopuli X No 11','Parent1','Parent2','01112829758','Siswa'),
	('S2759','fotoProfil-1587966017149.jpg','Student2','Ambon','1996-11-18','1','1','Jln Toddopuli X No 11','Parent1','Parent2','082194275704','Siswa');

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

LOCK TABLES `kotakSaran` WRITE;
/*!40000 ALTER TABLE `kotakSaran` DISABLE KEYS */;

INSERT INTO `kotakSaran` (`id`, `namaLengkap`, `email`, `nomorTelefon`, `saran`)
VALUES
	(1,'muhammad alkautsars','malkautsars@gmail.com','082194275704','Mantap Sekali!');

/*!40000 ALTER TABLE `kotakSaran` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
