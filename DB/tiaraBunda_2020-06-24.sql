# ************************************************************
# Sequel Pro SQL dump
# Version 5446
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 8.0.16)
# Database: tiaraBunda
# Generation Time: 2020-06-24 07:50:00 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table dataNilai
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dataNilai`;

CREATE TABLE `dataNilai` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idGuru` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `idSiswa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `pkn` int(100) DEFAULT NULL,
  `matematika` int(11) DEFAULT NULL,
  `ips` int(11) DEFAULT NULL,
  `agama` int(11) DEFAULT NULL,
  `ipa` int(11) DEFAULT NULL,
  `bahasaIndonesia` int(11) DEFAULT NULL,
  `bahasaInggris` int(11) DEFAULT NULL,
  `penjaskes` int(11) DEFAULT NULL,
  `seniBudaya` int(11) DEFAULT NULL,
  `catatanSiswa` varchar(5000) DEFAULT NULL,
  `namaSiswa` varchar(100) DEFAULT NULL,
  `kelas` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idKelas2` (`idGuru`),
  KEY `idSiswa2` (`idSiswa`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `dataNilai` WRITE;
/*!40000 ALTER TABLE `dataNilai` DISABLE KEYS */;

INSERT INTO `dataNilai` (`id`, `idGuru`, `idSiswa`, `pkn`, `matematika`, `ips`, `agama`, `ipa`, `bahasaIndonesia`, `bahasaInggris`, `penjaskes`, `seniBudaya`, `catatanSiswa`, `namaSiswa`, `kelas`)
VALUES
	(4,'G24235','S24811',80,100,90,90,100,60,80,90,100,'Bagus','Muhammad Alkautsar Sanusi',1);

/*!40000 ALTER TABLE `dataNilai` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
