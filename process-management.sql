-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 25, 2023 at 08:08 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `process-management`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_shipment`
--

CREATE TABLE `detail_shipment` (
  `id` int(5) NOT NULL,
  `date_manufacture` date NOT NULL,
  `quantity` int(6) NOT NULL,
  `price` int(9) NOT NULL,
  `status` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detail_shipment`
--

INSERT INTO `detail_shipment` (`id`, `date_manufacture`, `quantity`, `price`, `status`) VALUES
(12345, '0000-00-00', 36700, 2023, 'Đã thanh toán'),
(12346, '2023-10-25', 1200, 56000, 'Đã thanh toán');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(5) NOT NULL,
  `name` varchar(250) NOT NULL,
  `hsd` int(2) NOT NULL,
  `preserve` text NOT NULL,
  `pack` text NOT NULL,
  `status` text NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `hsd`, `preserve`, `pack`, `status`, `image`) VALUES
(1, 'Tôm lột nõn', 2, 'Đông lạnh (Thấp hơn -18 độ C)', 'IQF – 1kg, 2kg/Túi…', 'Lột bỏ, bỏ đầu, làm sạch', 'http://localhost:3000/images/image-1698211717562-560312977.png'),
(2, 'Mực tươi', 3, 'Đông lạnh (Thấp hơn -19 độ C)', 'IQF – 500gr, 1kg, 2kg/Túi…', 'Làm sạch, cắt bỏ nội tạng.', 'http://localhost:3000/images/image-1698211763793-791324036.png'),
(3, 'Cá tra cắt khúc', 6, 'Đông lạnh (Thấp hơn -19 độ C)', 'Đóng bao PE 1kg hoặc đóng thùng 5kg', 'Cá tra làm sạch, cắt khúc', 'http://localhost:3000/images/image-1698212105151-712050194.png'),
(4, 'Cá tra fillet', 3, 'Đông lạnh (Thấp hơn -18 độ C)', 'IQF – 500gr, 1kg, 2kg/Túi…', 'Không da, không xương, còn vè, còn mỡ, còn thịt đỏ.', 'http://localhost:3000/images/image-1698212166724-551760548.png');

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

CREATE TABLE `salary` (
  `id` float NOT NULL,
  `basic` int(9) NOT NULL,
  `support` int(9) NOT NULL,
  `BH` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`id`, `basic`, `support`, `BH`) VALUES
(1.89, 3500000, 750000, 34.5),
(2.12, 3500000, 750000, 34.5);

-- --------------------------------------------------------

--
-- Table structure for table `shipment`
--

CREATE TABLE `shipment` (
  `id` int(5) NOT NULL,
  `name` varchar(250) NOT NULL,
  `id_product` int(5) NOT NULL,
  `id_staff_Mn` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shipment`
--

INSERT INTO `shipment` (`id`, `name`, `id_product`, `id_staff_Mn`) VALUES
(12345, 'Cá tra fillet', 4, 12345),
(12346, 'Cá tra phi lê', 4, 36363);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(5) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `birth_date` date NOT NULL,
  `gender` varchar(3) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `id_number` varchar(13) NOT NULL,
  `address` text NOT NULL,
  `email` text NOT NULL,
  `id_DV` varchar(10) NOT NULL,
  `position` text NOT NULL,
  `id_salary` float NOT NULL,
  `avatar` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `fullname`, `birth_date`, `gender`, `phone`, `id_number`, `address`, `email`, `id_DV`, `position`, `id_salary`, `avatar`) VALUES
(12345, 'Cao Minh Quan', '2001-10-07', 'Nam', '0989839334', '9948988348772', 'Giồng Giềng, Kiên Giang', 'bangduong87220@gmail.com', 'QLLH2', 'Quản lí lô hàng', 2.12, ''),
(32365, 'Dương Hãi Băng', '2023-10-25', 'Nam', '0988989898', '7003277202832', '124/11A, Xuân Khánh, Ninh Kiều, Cần Thơ.', 'bangduong870@gmail.com', 'QLQT1', 'Quản lí quy trình', 2.12, ''),
(36363, 'Trần Minh Anh', '2002-08-08', 'Nữ', '0394476389', '7003277202990', 'Cần Thơ', 'main@gmail.com', 'QLLH1', 'Quản lí lô hàng', 2.12, '');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(5) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `role` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`) VALUES
(12345, 'caoquan', '123', 1),
(32365, 'haibang', '123', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_shipment`
--
ALTER TABLE `detail_shipment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `salary`
--
ALTER TABLE `salary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipment`
--
ALTER TABLE `shipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idstafffmanager` (`id_staff_Mn`),
  ADD KEY `idproduct` (`id_product`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idsalary` (`id_salary`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_shipment`
--
ALTER TABLE `detail_shipment`
  ADD CONSTRAINT `idshipment` FOREIGN KEY (`id`) REFERENCES `shipment` (`id`);

--
-- Constraints for table `shipment`
--
ALTER TABLE `shipment`
  ADD CONSTRAINT `idproduct` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `idstafffmanager` FOREIGN KEY (`id_staff_Mn`) REFERENCES `staff` (`id`);

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `idsalary` FOREIGN KEY (`id_salary`) REFERENCES `salary` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `idstaff` FOREIGN KEY (`id`) REFERENCES `staff` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
