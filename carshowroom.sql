-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2023 at 04:35 PM
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
-- Database: `carshowroom`
--

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `car_id` int(11) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `year` varchar(4) NOT NULL,
  `price` int(11) NOT NULL,
  `engine` varchar(255) NOT NULL,
  `transmission` varchar(255) NOT NULL,
  `fuel` varchar(255) NOT NULL,
  `description` varchar(6000) NOT NULL,
  `images` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`car_id`, `brand`, `model`, `year`, `price`, `engine`, `transmission`, `fuel`, `description`, `images`) VALUES
(1, 'BMW', 'M5', '2023', 111895, 'V8', 'Manual', 'Petrol', 'Incredible engineering defines the 2023 BMW M5 Sedan. Standard M xDrive – BMW\'s most performance-oriented all-wheel drive system, delivers adjustable 4WD, 4WD Sport, and 2WD modes for ultimate control on the road. This authority is only elevated with the available M Compound brakes, or available Carbon Ceramic brakes – giving drivers the ability to stop on a dime.', 'bmwm52023.jpg'),
(2, 'Toyota', 'MKV GR Supra', '2022', 45000, 'V6', 'Auto', 'Petrol', 'GR Supra’s available 3.0-liter turbocharged inline-six produces 382 horsepower * with an impressive 368 lb.-ft. of torque. Add more speed into the equation through an 8-speed Automatic Transmission or take full control on the road with the lighter and optimally balanced 6-speed intelligent Manual Transmission (iMT) for even more thrilling drives.', 'toyotagrsupra2022.jpg'),
(9, 'Lamborghini ', 'Huracan Evo', '2023', 550000, 'v8', 'Automatic', 'Petrol', 'its a 2022 huracan', 'lamborghinihuracanevo2023.jpg'),
(10, 'Porche', '911 Carrera T', '2018', 450000, 'v8', 'Automatic', 'Petrol', 'Its a 2018 porche 911 carrera', 'porche911carrerat2018.jpg'),
(12, 'Toyota', 'Corolla', '2023', 22500, '1.8L 4-cylinder', 'Automatic', 'Gasoline', 'Compact sedan with advanced safety features.', 'toyotacorolla2023.jpg'),
(13, 'Ford', 'Mustang', '2023', 35750, '2.3L EcoBoost', 'Manual', 'Gasoline', 'Iconic sports car with aggressive styling.', 'fordmustang2023.jpg'),
(22, 'Honda', 'Civic', '2020', 27800, '2.0 L ', 'Automatic', 'Gasoline', 'The 2020 Honda Civic is one of our highest-rated compact cars. It gets good gas mileage, has a nice amount of passenger and cargo space, and comes in three body styles.', '1692252947654.jpg'),
(23, 'Subaru', 'WRX STI', '2021', 37800, '310-hp turbocharged 2.5-liter 4-cylinder SUBARU BOXER® engine', '6-speed close-ratio manual ', 'Gasoline', 'The 2021 Subaru WRX STI encapsulates the spirit of high-performance driving with its exhilarating blend of power, precision, and iconic design. As the flagship model in Subaru\'s legendary WRX lineup, the WRX STI maintains its reputation as a rally-inspired sports sedan that\'s equally at home on both the track and the open road.', '1692269911310.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `customer_order`
--

CREATE TABLE `customer_order` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `total_price` int(11) NOT NULL,
  `payment_reference` varchar(20) NOT NULL,
  `payment_status` varchar(255) NOT NULL,
  `delivery_address` varchar(255) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `order_status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_order`
--

INSERT INTO `customer_order` (`order_id`, `user_id`, `car_id`, `order_date`, `total_price`, `payment_reference`, `payment_status`, `delivery_address`, `contact_number`, `order_status`) VALUES
(1, 12, 1, '2023-08-01', 50000, '202308012056', 'paid', 'Ayesha Cottage, Siddeshwari, Dhaka', '01398745237', 'processing'),
(2, 13, 2, '2022-08-05', 60000, '202208052003', 'paid', 'Mohakhali, Dhaka', '01236578912', 'completed'),
(5, 2, 2, '2023-08-18', 47300, '20230819003337', 'paid', 'demra, dhaka', '01818465069', 'completed'),
(6, 2, 9, '2023-08-18', 572500, '20230819003610', 'paid', 'Demra', '01818465069', 'processing'),
(7, 2, 1, '2023-08-18', 116871, '20230819003510', 'pending', 'demra, dhaka', '01818465069', 'confirmed'),
(8, 2, 12, '2023-08-18', 23900, '20230819210828', 'pending', 'demra, dhaka', '01818465069', 'confirmed'),
(9, 2, 23, '2023-08-18', 39812, '20230819003920', 'pending', 'demra, dhaka', '01818465069', 'confirmed'),
(10, 14, 13, '2023-08-18', 37680, '', '', 'Mohakhali, Dhaka', '018163378954', 'pending'),
(11, 2, 10, '2023-08-19', 468500, '', '', 'Mohakhali, Dhaka', '01236985214', 'pending'),
(12, 2, 22, '2023-08-19', 29412, '20230819223458', 'pending', 'Mohakhali, Dhaka', '01236547896', 'cancelled');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `review_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `review_date` date NOT NULL,
  `message` longtext NOT NULL,
  `rating` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`review_id`, `car_id`, `user_id`, `review_date`, `message`, `rating`) VALUES
(1, 2, 13, '2022-09-30', 'Mama sheraaaaaaaa <3 :3 uWu', 5),
(2, 2, 1, '2023-08-01', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel adipisci pariatur debitis tempora facere vitae nisi eius rerum quod! Natus, minus? Porro explicabo ut, placeat asperiores suscipit odio vero exercitationem.\r\nTempora quia obcaecati dolores adipisci nisi, deleniti explicabo similique placeat in eligendi perferendis eum esse facere suscipit! Non, laudantium est tenetur, officiis alias qui fugiat eligendi, blanditiis molestiae modi eius!', 4),
(3, 2, 2, '2023-08-18', 'Its a fantastic sports car. There\'s no “one” perfect thing that makes it that way, rather, it\'s the amalgam of features that you just don\'t see very often: good design, turbocharged inline-six, rear-drive, two-doors, and all paired with a manual transmission. It makes its mark as a driver\'s car.', 5),
(4, 1, 2, '2023-08-18', 'Awesome car. asdfja oiajdf iadof ', 4),
(8, 12, 2, '2023-08-18', 'sweet ride', 4),
(9, 13, 2, '2023-08-21', 'not  soo  coool  car', 3);

-- --------------------------------------------------------

--
-- Table structure for table `test_drive`
--

CREATE TABLE `test_drive` (
  `testdrive_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `test_drive`
--

INSERT INTO `test_drive` (`testdrive_id`, `user_id`, `car_id`, `date`, `status`) VALUES
(1, 12, 2, '2023-08-11', 'scheduled'),
(2, 2, 2, '2023-08-03', 'scheduled'),
(3, 2, 9, '2023-08-22', 'scheduled'),
(4, 2, 12, '2023-08-24', 'pending'),
(5, 2, 13, '2023-08-30', 'pending'),
(6, 2, 10, '2023-08-28', 'pending'),
(7, 2, 23, '2023-08-25', 'scheduled');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `role` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `email`, `password`, `phone`, `address`, `role`) VALUES
(1, 'FAHMID HASAN CHOWDHURY', 'fahmid@gmail.com', '$2a$10$yCyf4l9PGlNlTR8.rAWEvuGKQRhmA3Zh640pA1eRM2zQGwGdVigoi', '01817279669', 'Boro Moghbazar, Dr. goli, Dhaka', 'admin'),
(2, 'Zakaria Ibne Rafiq', 'zakaria@gmail.com', '$2a$10$DBpuj4FCPYBttn4Am.NpsuYh5WcTOOF55aIadgOo6Rgy9yk6LCqri', '01818465069', 'Demra, Dhaka', 'admin'),
(12, 'Radito Dhali', 'radito@gmail.com', '$2a$10$RO510tmWjU/1IePO3Xinn.izv7eqMDUcGXPUjhgd5AV7gGsdBGCNO', '01310022463', 'Shantinagar, Dhaka', 'user'),
(13, 'Sabbir Hossain Mirza', 'sabbir@gmail.com', '$2a$10$kQEzVMn5KEz8f21cVGYG9uTjPJn6BcZWMYyeIhiur/JhZBTp2S6aq', '01951037670', 'Mohakhali, Dhaka', 'user'),
(14, 'Phoenix Hubert', 'user@email.com', '$2a$10$6L4fl.R11qmowYgy7FJCc.9PK9JiPabcQhuQTjMjZKgsOaBPTKzLO', '02356478936', 'somewhere precious', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `user_enquiry`
--

CREATE TABLE `user_enquiry` (
  `enquiry_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `title` varchar(2000) NOT NULL,
  `message` varchar(6000) NOT NULL,
  `response` varchar(6000) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_enquiry`
--

INSERT INTO `user_enquiry` (`enquiry_id`, `user_id`, `car_id`, `title`, `message`, `response`, `status`) VALUES
(1, 2, 9, 'Questions regarding purchase', 'When will this be available', 'in your dreams', 'completed');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`car_id`);

--
-- Indexes for table `customer_order`
--
ALTER TABLE `customer_order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `car_id` (`car_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `car_id` (`car_id`);

--
-- Indexes for table `test_drive`
--
ALTER TABLE `test_drive`
  ADD PRIMARY KEY (`testdrive_id`),
  ADD KEY `car_id` (`car_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_enquiry`
--
ALTER TABLE `user_enquiry`
  ADD PRIMARY KEY (`enquiry_id`),
  ADD KEY `car_id` (`car_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `car`
--
ALTER TABLE `car`
  MODIFY `car_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `customer_order`
--
ALTER TABLE `customer_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `test_drive`
--
ALTER TABLE `test_drive`
  MODIFY `testdrive_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user_enquiry`
--
ALTER TABLE `user_enquiry`
  MODIFY `enquiry_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer_order`
--
ALTER TABLE `customer_order`
  ADD CONSTRAINT `customer_order_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `car` (`car_id`),
  ADD CONSTRAINT `customer_order_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `car` (`car_id`);

--
-- Constraints for table `test_drive`
--
ALTER TABLE `test_drive`
  ADD CONSTRAINT `test_drive_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `car` (`car_id`),
  ADD CONSTRAINT `test_drive_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `user_enquiry`
--
ALTER TABLE `user_enquiry`
  ADD CONSTRAINT `user_enquiry_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `car` (`car_id`),
  ADD CONSTRAINT `user_enquiry_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
