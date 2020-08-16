-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 16, 2020 at 10:23 AM
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
-- Table structure for table `dataCatatanSiswa`
--

CREATE TABLE `dataCatatanSiswa` (
  `id` int(11) NOT NULL,
  `idSiswa` varchar(1000) NOT NULL,
  `idGuru` varchar(1000) DEFAULT NULL,
  `catatan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dataCatatanSiswa`
--

INSERT INTO `dataCatatanSiswa` (`id`, `idSiswa`, `idGuru`, `catatan`) VALUES
(1, 'S1531', NULL, NULL),
(2, 'S24811', 'G13423', 'Anak yang baik dan sopan');

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
(1, '2020-07-22', 'Event Test1'),
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
('G13151', 'fotoProfilGuru-1597332809836.jpeg', 'Mamang Ganteng', 'Bandung', '1996-11-18', 'Toddopuli', '01112829758', 'Islam', 'Pria', '12345', 'teacher2@gmail.com'),
('G13423', 'fotoProfilGuru-1597327271988.jpeg', 'Tetew', 'Taraktandung', '1996-11-18', 'Toddopuli', '01112829758', 'Islam', 'Pria', '12345', 'teacher1@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `dataJadwalMapel`
--

CREATE TABLE `dataJadwalMapel` (
  `id` int(11) NOT NULL,
  `hari` varchar(1000) NOT NULL,
  `jam` varchar(1000) NOT NULL,
  `mapel` varchar(1000) NOT NULL,
  `kelas` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dataJadwalMapel`
--

INSERT INTO `dataJadwalMapel` (`id`, `hari`, `jam`, `mapel`, `kelas`) VALUES
(1, 'Senin', '07.00 - 08.30', 'Matematika', '1'),
(10, 'Senin', '08.30 - 10.00', 'Pendidikan Kewarganegaraan', '1'),
(11, 'Senin', '10.00 - 10.30', 'Istirahat', '1'),
(12, 'Senin', '10.30 - 12.00', 'Seni Budaya dan Keterampilan', '1'),
(13, 'Senin', '12.00 - 12.30', 'Istirahat', '1'),
(14, 'Senin', '12.30 - 13.30', 'Bahasa Mandarin', '1'),
(17, 'Selasa', '07.00 - 08.30', 'Bahasa dan Sastra Sunda', '1');

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
(37, 'S24811', '2020-07-24', 'Hadir', 'G24235', 'PKN', 'Muhammad Alkautsar Sanusi'),
(38, 'S24811', '2020-08-10', 'Hadir', 'G24235', 'PKN', 'Muhammad Alkautsar Sanusi'),
(39, 'S24811', '2020-08-14', 'Hadir', 'G13423', 'Matematika', 'Muhammad Alkautsar Sanusi');

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
(8, 1, 'G13423');

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
(10, 'S24811', 'Muhammad Alkautsar Sanusi', 1),
(15, 'S1531', 'Ahmad Sadiq Sanusi', 1);

-- --------------------------------------------------------

--
-- Table structure for table `dataMapel`
--

CREATE TABLE `dataMapel` (
  `id` int(11) NOT NULL,
  `mapel` varchar(100) NOT NULL,
  `category` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dataMapel`
--

INSERT INTO `dataMapel` (`id`, `mapel`, `category`) VALUES
(5, 'Pendidikan Agama Katolik', 'Umum'),
(6, 'Pendidikan Kewarganegaraan', 'Umum'),
(7, 'Bahasa Indonesia', 'Umum'),
(8, 'Matematika', 'Umum'),
(9, 'Ilmu Pengetahuan Alam', 'Umum'),
(10, 'Ilmu Pengetahuan Sosial', 'Umum'),
(11, 'Seni Budaya dan Keterampilan', 'Umum'),
(12, 'Pendidikan Jasmani, Olahraga dan Kesehatan', 'Umum'),
(13, 'Bahasa dan Sastra Sunda', 'Mulok'),
(14, 'PLH', 'Mulok'),
(15, 'Bahasa Inggris', 'Mulok'),
(17, 'Bahasa Mandarin', 'Mulok');

-- --------------------------------------------------------

--
-- Table structure for table `dataNilaiSiswa`
--

CREATE TABLE `dataNilaiSiswa` (
  `id` int(11) NOT NULL,
  `idGuru` varchar(100) NOT NULL,
  `idSiswa` varchar(100) NOT NULL,
  `mapel` varchar(1000) NOT NULL,
  `nilaiTugas` int(11) NOT NULL,
  `nilaiTugas2` int(11) NOT NULL,
  `nilaiTugas3` int(11) NOT NULL,
  `nilaiUjian` int(11) NOT NULL,
  `nilaiUjian2` int(11) NOT NULL,
  `nilaiUjian3` int(11) NOT NULL,
  `namaSiswa` varchar(1000) NOT NULL,
  `kelas` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dataNilaiSiswa`
--

INSERT INTO `dataNilaiSiswa` (`id`, `idGuru`, `idSiswa`, `mapel`, `nilaiTugas`, `nilaiTugas2`, `nilaiTugas3`, `nilaiUjian`, `nilaiUjian2`, `nilaiUjian3`, `namaSiswa`, `kelas`) VALUES
(1, 'G13423', 'S24811', 'Matematika', 100, 40, 40, 40, 40, 40, 'Muhammad Alkautsar Sanusi', '1'),
(2, 'G13423', 'S24811', 'Bahasa Indonesia', 100, 100, 0, 100, 80, 0, 'Muhammad Alkautsar Sanusi', '1');

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
('S1531', 'fotoProfil-1597467291755.jpeg', 'Ahmad Sadiq Sanusi', 'Ujung Pandang', '1996-11-18', 'Toddopuli', 'Parent1', 'Parent2', '01112829758', 'Islam', 'Pria'),
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
-- Indexes for table `dataCatatanSiswa`
--
ALTER TABLE `dataCatatanSiswa`
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
-- Indexes for table `dataJadwalMapel`
--
ALTER TABLE `dataJadwalMapel`
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
-- Indexes for table `dataMapel`
--
ALTER TABLE `dataMapel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dataNilaiSiswa`
--
ALTER TABLE `dataNilaiSiswa`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `dataCatatanSiswa`
--
ALTER TABLE `dataCatatanSiswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dataEvent`
--
ALTER TABLE `dataEvent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `dataJadwalMapel`
--
ALTER TABLE `dataJadwalMapel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `dataKehadiran`
--
ALTER TABLE `dataKehadiran`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `dataKelas`
--
ALTER TABLE `dataKelas`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `dataKelasSiswa`
--
ALTER TABLE `dataKelasSiswa`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `dataMapel`
--
ALTER TABLE `dataMapel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `dataNilaiSiswa`
--
ALTER TABLE `dataNilaiSiswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

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
