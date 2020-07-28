-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 28, 2020 at 08:35 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tiaraBunda`
--

-- --------------------------------------------------------

--
-- Table structure for table `dataBerita`
--

CREATE TABLE `dataBerita` (
  `id` int(11) UNSIGNED NOT NULL,
  `gambarBerita` varchar(100) DEFAULT NULL,
  `judulBerita` varchar(200) DEFAULT NULL,
  `tanggalUpdate` varchar(100) DEFAULT NULL,
  `deskripsi` varchar(2000) DEFAULT NULL,
  `penulis` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `dataEvent`
--

CREATE TABLE `dataEvent` (
  `id` int(11) NOT NULL,
  `tanggal` varchar(100) NOT NULL,
  `event` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dataEvent`
--

INSERT INTO `dataEvent` (`id`, `tanggal`, `event`) VALUES
(1, '2020-07-22', 'Event Test'),
(2, '2020-07-23', 'Event Test 2');

-- --------------------------------------------------------

--
-- Table structure for table `dataGuru`
--

CREATE TABLE `dataGuru` (
  `id` varchar(150) NOT NULL,
  `fotoProfil` varchar(150) DEFAULT NULL,
  `namaLengkap` varchar(150) DEFAULT NULL,
  `tempatLahir` varchar(150) DEFAULT NULL,
  `tanggalLahir` varchar(150) DEFAULT NULL,
  `alamat` varchar(150) DEFAULT NULL,
  `nomorTelefon` varchar(200) DEFAULT NULL,
  `agama` varchar(150) DEFAULT NULL,
  `jenisKelamin` varchar(150) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dataGuru`
--

INSERT INTO `dataGuru` (`id`, `fotoProfil`, `namaLengkap`, `tempatLahir`, `tanggalLahir`, `alamat`, `nomorTelefon`, `agama`, `jenisKelamin`, `password`, `email`) VALUES
('G24235', 'fotoProfilGuru-1592982398578.jpeg', 'Tawil Fattawa', 'Ujung Pandang', '2015-11-18', 'Bojongsoang', '01112829758', 'Islam', 'Pria', '12345', 'teacher1@gmail.com'),
('G26170', 'fotoProfilGuru-1593180709942.jpeg', 'Mark Zuckerburger', 'Makassar', '1996-11-18', 'Bojongsoang', '12345', 'Islam', 'Pria', '12345', 'teacher2@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `dataKehadiran`
--

CREATE TABLE `dataKehadiran` (
  `id` int(11) UNSIGNED NOT NULL,
  `idSiswa` varchar(100) DEFAULT NULL,
  `tanggal` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `idGuru` varchar(100) DEFAULT NULL,
  `mataPelajaran` varchar(100) DEFAULT NULL,
  `namaSiswa` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dataKehadiran`
--

INSERT INTO `dataKehadiran` (`id`, `idSiswa`, `tanggal`, `status`, `idGuru`, `mataPelajaran`, `namaSiswa`) VALUES
(37, 'S24811', '2020-07-24', 'Hadir', 'G24235', 'PKN', 'Muhammad Alkautsar Sanusi');

-- --------------------------------------------------------

--
-- Table structure for table `dataKelas`
--

CREATE TABLE `dataKelas` (
  `id` int(100) NOT NULL,
  `kelas` int(100) NOT NULL,
  `idGuru` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dataKelas`
--

INSERT INTO `dataKelas` (`id`, `kelas`, `idGuru`) VALUES
(1, 1, 'G24235'),
(3, 2, 'G26170');

-- --------------------------------------------------------

--
-- Table structure for table `dataKelasSiswa`
--

CREATE TABLE `dataKelasSiswa` (
  `id` int(11) UNSIGNED NOT NULL,
  `idSiswa` varchar(100) DEFAULT NULL,
  `namaSiswa` varchar(100) DEFAULT NULL,
  `kelas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dataKelasSiswa`
--

INSERT INTO `dataKelasSiswa` (`id`, `idSiswa`, `namaSiswa`, `kelas`) VALUES
(10, 'S24811', 'Muhammad Alkautsar Sanusi', 1);

-- --------------------------------------------------------

--
-- Table structure for table `dataNilai`
--

CREATE TABLE `dataNilai` (
  `id` int(11) UNSIGNED NOT NULL,
  `idGuru` varchar(100) DEFAULT NULL,
  `idSiswa` varchar(100) DEFAULT NULL,
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
  `kelas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dataNilai`
--

INSERT INTO `dataNilai` (`id`, `idGuru`, `idSiswa`, `nilaiTugasPkn`, `nilaiUjianPkn`, `nilaiTugasMatematika`, `nilaiUjianMatematika`, `nilaiTugasIps`, `nilaiUjianIps`, `nilaiTugasAgama`, `nilaiUjianAgama`, `nilaiTugasIpa`, `nilaiUjianIpa`, `nilaiTugasBahasaIndonesia`, `nilaiUjianBahasaIndonesia`, `nilaiTugasBahasaInggris`, `nilaiUjianBahasaInggris`, `nilaiTugasPenjaskes`, `nilaiUjianPenjaskes`, `nilaiTugasSeniBudaya`, `nilaiUjianSeniBudaya`, `catatanSiswa`, `namaSiswa`, `kelas`) VALUES
(4, 'G24235', 'S24811', 80, 80, 60, 60, 90, 90, 90, 90, 100, 100, 60, 80, 80, 100, 90, 100, 100, 100, 'Bagus', 'Muhammad Alkautsar Sanusi', 1);

-- --------------------------------------------------------

--
-- Table structure for table `dataSiswa`
--

CREATE TABLE `dataSiswa` (
  `id` varchar(100) NOT NULL,
  `fotoProfil` varchar(150) DEFAULT NULL,
  `namaLengkap` varchar(150) DEFAULT NULL,
  `tempatLahir` varchar(150) DEFAULT NULL,
  `tanggalLahir` varchar(150) DEFAULT NULL,
  `alamat` varchar(150) DEFAULT NULL,
  `namaAyah` varchar(150) DEFAULT NULL,
  `namaIbu` varchar(150) DEFAULT NULL,
  `nomorTelefon` varchar(150) DEFAULT NULL,
  `agama` varchar(150) DEFAULT NULL,
  `jenisKelamin` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dataSiswa`
--

INSERT INTO `dataSiswa` (`id`, `fotoProfil`, `namaLengkap`, `tempatLahir`, `tanggalLahir`, `alamat`, `namaAyah`, `namaIbu`, `nomorTelefon`, `agama`, `jenisKelamin`) VALUES
('S24811', 'fotoProfil-1592982276968.jpeg', 'Muhammad Alkautsar Sanusi', 'Ujung Pandang', '2015-11-18', 'Jln Toddopuli X No 11', 'Parent1', 'Parent2', '082194275704', 'Islam', 'Pria');

-- --------------------------------------------------------

--
-- Table structure for table `kotakSaran`
--

CREATE TABLE `kotakSaran` (
  `id` int(11) UNSIGNED NOT NULL,
  `namaLengkap` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `nomorTelefon` varchar(30) NOT NULL DEFAULT '',
  `saran` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dataBerita`
--
ALTER TABLE `dataBerita`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dataEvent`
--
ALTER TABLE `dataEvent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dataGuru`
--
ALTER TABLE `dataGuru`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dataKehadiran`
--
ALTER TABLE `dataKehadiran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idSiswa` (`idSiswa`);

--
-- Indexes for table `dataKelas`
--
ALTER TABLE `dataKelas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idGuru` (`idGuru`);

--
-- Indexes for table `dataKelasSiswa`
--
ALTER TABLE `dataKelasSiswa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `siswa` (`idSiswa`);

--
-- Indexes for table `dataNilai`
--
ALTER TABLE `dataNilai`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idKelas2` (`idGuru`),
  ADD KEY `idSiswa2` (`idSiswa`);

--
-- Indexes for table `dataSiswa`
--
ALTER TABLE `dataSiswa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kotakSaran`
--
ALTER TABLE `kotakSaran`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dataBerita`
--
ALTER TABLE `dataBerita`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `dataEvent`
--
ALTER TABLE `dataEvent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `dataKehadiran`
--
ALTER TABLE `dataKehadiran`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `dataKelas`
--
ALTER TABLE `dataKelas`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `dataKelasSiswa`
--
ALTER TABLE `dataKelasSiswa`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `dataNilai`
--
ALTER TABLE `dataNilai`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `kotakSaran`
--
ALTER TABLE `kotakSaran`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dataKelas`
--
ALTER TABLE `dataKelas`
  ADD CONSTRAINT `idGuru` FOREIGN KEY (`idGuru`) REFERENCES `dataguru` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
