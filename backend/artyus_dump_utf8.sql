-- MySQL dump 10.13  Distrib 8.0.44, for Linux (x86_64)
--
-- Host: localhost    Database: arty-us
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `qty` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cart_user` (`user_id`),
  KEY `fk_cart_product` (`product_id`),
  CONSTRAINT `fk_cart_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Stationery Supplies','2025-11-03 14:09:27'),(2,'Art & Craft','2025-11-03 14:09:27'),(3,'Planners','2025-11-03 14:09:27'),(4,'Kits & Hampers','2025-11-03 14:09:27');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `child_category`
--

DROP TABLE IF EXISTS `child_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `child_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `category_id` int NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_child_category_category` (`category_id`),
  CONSTRAINT `fk_child_category_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child_category`
--

LOCK TABLES `child_category` WRITE;
/*!40000 ALTER TABLE `child_category` DISABLE KEYS */;
INSERT INTO `child_category` VALUES (1,'Stationery Basics',1,'2025-11-03 17:14:07'),(2,'Art Supplies',1,'2025-11-03 17:14:07'),(3,'Art Paints',2,'2025-11-03 17:14:07'),(4,'Sketch Supplies',2,'2025-11-03 17:14:07'),(5,'Planners and Journals',3,'2025-11-03 17:14:07'),(6,'Diaries',3,'2025-11-03 17:14:07'),(7,'Essentials Kits',4,'2025-11-03 17:14:07');
/*!40000 ALTER TABLE `child_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `contact` varchar(45) NOT NULL,
  `staus` varchar(45) NOT NULL,
  `price` float NOT NULL,
  `qty` int NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orders_user` (`user_id`),
  KEY `fk_orders_product` (`product_id`),
  CONSTRAINT `fk_orders_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) NOT NULL,
  `qty` int NOT NULL,
  `price` float NOT NULL,
  `description` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `slug_id` int NOT NULL,
  `trader_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_slug` (`slug_id`),
  KEY `fk_product_trader` (`trader_id`),
  CONSTRAINT `fk_product_slug` FOREIGN KEY (`slug_id`) REFERENCES `slug` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_product_trader` FOREIGN KEY (`trader_id`) REFERENCES `trader` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (5,'TMOL Fabric Paints',10,600,'A set of 30 poster paints infused with reflective pigments to add a shimmery gold, silver, or bronze finish','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762884932/bdooz1a06scz9cucp5wq.jpg',20,3),(6,'Fevicryl Fabric Colors',15,360,'Set of 15 fabric colors. All non-toxic, easily cleanable formula designed for young children to paint without staining clothes or skin.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762885044/jolrkbhbbarcm8dngiez.jpg',20,3),(7,'Water Drip Sticky Notes',10,30,'Set of 2. Classic square-shaped pads in pastel colors, perfect for quick reminders, page markers, and leaving notes.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762885186/gyto6zfl9p3j1iqpylhp.jpg',34,3),(8,'Cartoon Sticky Notes',10,60,'Product quality is 1. Fun, CUTE notes having various shapes like arrows, stars, or speech bubbles to make your reminders stand out.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762885306/tw73rjgn1mtiy75lif3p.jpg',34,3),(9,'classic sketch book',12,120,'A durable sketchbook with a rigid, book-like cover, perfect for protecting finished artwork and archiving.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762886557/tw7d8qcisyqbizpomtuk.jpg',25,3),(10,'Cute Pastel Sketch Book',5,299,'A sketchbook with a wire coil binding that allows it to lay perfectly flat or fold back on itself.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762886646/iccxzza2p35tzodnu5wh.jpg',25,3),(11,'Light Pastel Highlighters',5,280,'Set of 8 highlighters in soft, muted colors (like mint or peach) for a more subtle and less distracting way to organize notes.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762886823/l31o6matuudii8y1nj34.jpg',16,3),(12,'Liquid Highlighters',10,198,'A set of 6 highlighters having pen-like design with a visible ink reservoir, providing a smooth, consistent, and vibrant color flow.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762886929/iemu7qsxv91fttcwvybn.jpg',16,3),(13,'FabreCastel Sketch Pens',12,280,'A set of 30 standard water-based markers with a felt tip, used for general coloring, drawing, and school projects.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762887042/c682n1yu0dcyrtoxcrnc.jpg',15,3),(14,'Pastel A-Ink Sketch Pens',10,350,'Set of 10 Sketchpens with a flexible, fibrous tip that mimics a paintbrush, perfect for calligraphy, lettering, and expressive art.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762887141/wbjcraaxb9oyavowixf8.jpg',15,3),(15,'Ohuhu Oil Paint ',7,650,'A set of 24 rich, slow-drying paints made from pigment in oil, prized for their depth, blendability, and longevity.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762887387/ziupglnp1cvyzhlm1rw8.jpg',21,3),(16,'Winton Oil Colors',13,600,'Set of 10. A professional painting medium known for its deep, luminous colors and durable, long-lasting finish.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762887566/tk0liitkic5ukw2zgxvm.jpg',21,3),(17,'Staedtler Eraser',20,11,'A corrective implement that lifts pigment from a surface without tearing the paper.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762887643/x9fxkpcdhzyfj8hv1hvm.jpg',6,3),(18,'FabreCastle Erasers',20,6,'Product quantity will be 1. Used to remove pencil or graphite marks from paper.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762887722/ulpc1f78s2p7r3ldc0ea.jpg',6,3),(19,'Watercolor Brush Set',8,320,'A set of 7 soft, absorbent brushes (often mop and round) designed to hold large amounts of water for washes.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762887925/aeiuncs2j9fwoyhyyeob.jpg',18,3),(20,'Magic Touch Paint Brushes',10,250,'A beginner pack with a variety of essential round, flat, and filbert brushes for learning basic techniques.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762887972/esxnblrmffc5dunmfswk.jpg',18,3),(21,'Self-Care Planners',15,158,'A beginner pack with a variety of essential round, flat, and filbert brushes for learning basic techniques. (Product quantity - 1)','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762888544/x7ty324v3hv2uzummmz6.jpg',30,4),(22,'Plant Collection Journal',20,220,'Product quantity 1. A personal record of experiences, ideas, or feelings, kept in a bound notebook.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762888609/d0yogesyrjuxbvrdeaa4.jpg',30,4),(23,'Flower Color Palette',10,80,'A white ceramic dish with multiple small, separated \"petal\" wells, perfect for keeping watercolor or ink washes pure.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762888751/rqhmiy7fpwl22c2juien.jpg',17,4),(24,'Wooden Color Palatte',8,159,'The classic artist\'s palette, shaped to fit comfortably in your arm with a thumbhole for stable oil or acrylic mixing.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762888809/vlefixklizzfubzqwojv.jpg',17,4),(25,'Maroon Vintage Diary',5,419,'A diary that mimics the look of an old book, appealing to those who love a classic or nostalgic style.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762888894/ekfktvrjjg51rfpuo4lr.jpg',32,4),(26,'Heart Vintage Diary',3,550,'A journal designed with a rustic or antique aesthetic, often featuring a distressed leather cover and aged paper.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762888967/nbyj8u3vxt7ekoxqrmq8.jpg',32,4),(27,'Blue Geometry Tools',10,380,'A set including rulers, protractors, and compasses for technical drawing and creating precise shapes.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762889054/emtzhgffczhyvpl5ge32.jpg',7,4),(28,'Classic geomerty box',15,270,'Drafting instruments used in math, engineering, and art to measure angles, draw circles, and rule straight lines.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762889108/xqvywzu8jpzvwkc6nctk.jpg',7,4),(29,'Black Gel Pens',18,120,'A set of 6 classic black gel pens.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762889202/esf26gy9xndbr0uwzbya.jpg',2,4),(30,'Pure Tic-Tac Pens',20,160,'A set of 6 prized for their smooth, consistent lines and inability to be erased.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762889277/vzjyudoocmfn1adik6qo.jpg',2,4),(31,'Cute cutters',30,43,'Product quantity 1. Cute cloud shaped pocket friendly cutter. ','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762889365/iskybpsialbytwxushoh.jpg',10,4),(32,'Pastel Scissors',10,80,'A set of 3 pastel colored scissors with smooth cutting edged','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762889445/f5uz0snf9moywgxsm0pz.jpg',10,4),(33,'Bear Calculator',5,160,'Brown Bear Calculator for all your daily calculations.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762889501/smrqnp3wdco4y1fltabu.jpg',10,4),(34,'Fevicol (small)',10,10,'Mr Fevicol for sticking all your paper images ,pages and craft in place','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762889605/tncewvx90y6qzieoqlbt.jpg',9,4),(35,'Pink Glue Gun',15,370,'Pink hot glue gun to stick all your art together. Children friendly.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762889679/o0wzn59b5wxriiaq0ppo.jpg',9,4),(36,'Water color plate',10,550,'A painting medium prized for its ability to be layered in thin \"washes\" to build up color and light.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762889763/laamqixextbvrxmbsvpn.jpg',12,4),(37,'Ryallleble Water Colors',9,590,'A set of 12 Transparent pigments that are activated with water to create luminous, flowing paintings.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762889834/oegvgdngzjpmk8pbugir.jpg',12,4),(38,'Pastel Crippled Craft Papers',8,260,'A set of 25 crippled craft papers thicker than standard.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762889948/ieotd80nf1cs09btb5wo.jpg',4,4),(39,'Classic Craft Papers',20,120,'A set of 30 craft papers with vibrant colors used for scrapbooking, card-making, and collages. ','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762890040/mlxfqchffd7sfhcv7xjd.jpg',4,4),(40,'Pack of 6 Canvas Boards',25,600,'A rigid, slim panel wrapped in primed cotton canvas, providing a sturdy and portable painting surface.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762890458/xwmkg2hv3vb0g1712gst.jpg',24,5),(41,'Small Canvas Boards',30,63,'Item quantity - 1. A lightweight, economical alternative to stretched canvas, ready to be painted on immediately.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762890531/htgcnmb7g8uoscqbsnnn.jpg',24,5),(42,'Hour based Daily Planner',10,450,'A planner focused on hourly appointments, to-do lists, and notes for a single day at a time.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762890599/romdq8walwczatybcl4j.jpg',26,5),(43,'Daily Day Planner',10,450,'An organizational book with a separate, detailed page for each day, perfect for managing busy schedules and self care.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762890688/ejr1wdmtmsxhdo0qtygu.jpg',26,5),(44,'64 Crayon',18,418,'A favorite children\'s art supply that is non-toxic, easy to grip, and resistant to breaking.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762890749/ameu2iskwqjawofhhb3l.jpg',13,5),(45,'96 Crayon',12,720,'Sticks of colored wax used for drawing, known for their bright colors and waxy, texture-building properties.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762890790/aaj1kkwwygshsvumgvuw.jpg',13,5),(46,'Plant Sticky Notes',8,120,'Cute square sticky notes with plant and vases drawn.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762890911/jstd0bw4pdgjfjajuwjj.jpg',34,5),(47,'Bear Exam Board',8,100,'A smooth, hard surface that provides support for a single sheet or notepad, often used during tests.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762890985/ipo9tsmdgtm2azd7zkvu.jpg',8,5),(48,'Cartoon Exam Board',12,110,'A rigid, portable flat board with a metal clip to hold papers securely for writing away from a desk. Item quantity -1.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762891039/xgyduidlcngwis50wk96.jpg',8,5),(49,'FabreCastle Pencil Colors',12,420,'A set of 30 color pencils with tips that allows for precise control and the ability to build up color intensity.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762891131/ktsobuszsw1vfyrbp0mt.jpg',3,5),(50,'MutliColor Color Pencils',10,250,'A set of 24 color pencils best for childern and used for layering, shading, and blending detailed artwork.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762891237/medthzc5glpqcornbf0n.jpg',3,5),(51,'EcoLapiz Pencils',10,50,'A set of 30 Pencils having graphite core in a wooden casing used for erasable writing, drawing, and sketching.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762891378/berketkr7kzwpvr5emyj.jpg',1,5),(52,'Stadler Pencils',19,150,'An artist\'s primary tool, available in various grades from hard (H) for light lines to soft (B) for dark shading. Set of 10','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762891544/hwnsehmjxep9v9ekbn5h.jpg',1,5),(53,'Pastel Craft Kit',8,1520,'A curated set of art supplies (like colors or dairies) designed for a single activity or to explore a new hobby.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762891706/ccfsyljzps9ttcqyqzak.jpg',36,5),(54,'Year Art Kit',12,1500,'An all-in-one box containing all the materials to get creative in writing and drawing.','https://res.cloudinary.com/djx1xg3tr/image/upload/v1762891839/qjkjwmfwyuse8b0bxbvm.jpg',36,5);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_provider`
--

DROP TABLE IF EXISTS `service_provider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_provider` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `shop_name` varchar(45) NOT NULL,
  `service_address` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `contact` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_service` (`user_id`),
  CONSTRAINT `fk_user_service` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_provider`
--

LOCK TABLES `service_provider` WRITE;
/*!40000 ALTER TABLE `service_provider` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_provider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slug`
--

DROP TABLE IF EXISTS `slug`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slug` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `child_category_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_slug_child_category` (`child_category_id`),
  CONSTRAINT `fk_slug_child_category` FOREIGN KEY (`child_category_id`) REFERENCES `child_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slug`
--

LOCK TABLES `slug` WRITE;
/*!40000 ALTER TABLE `slug` DISABLE KEYS */;
INSERT INTO `slug` VALUES (1,'Pencil',1),(2,'Pens',1),(3,'Color Pencils',2),(4,'Craft Papers',4),(5,'Sharpeners',1),(6,'Erasers',1),(7,'Geometric Tools',1),(8,'Exam Boards',1),(9,'Glue and Adhesives',1),(10,'Desk Supplies',1),(12,'Water Colors',2),(13,'Crayon Colors',2),(14,'Poster Colors',2),(15,'Sketch Pens',2),(16,'Markers and Highlighters',2),(17,'Color Palette',2),(18,'Paint Brushes',2),(19,'Acrylic Colors',3),(20,'Fabric Colors',3),(21,'Oil Colors',3),(22,'Spray Paints',3),(24,'Canvas Boards',4),(25,'Sketch Books',4),(26,'Daily Planner',5),(27,'Weekly Planner',5),(28,'Monthly Planner',5),(29,'Customized Planner',5),(30,'Journals',5),(31,'Simple Diaries',6),(32,'Vintage Diaries',6),(33,'Little Diaries',6),(34,'Sticky Notes',6),(35,'Stationary Kits',7),(36,'Art-and-Craft Kits',7);
/*!40000 ALTER TABLE `slug` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trader`
--

DROP TABLE IF EXISTS `trader`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trader` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `shop_name` varchar(45) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact` varchar(10) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_trader_user` (`user_id`),
  CONSTRAINT `fk_trader_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trader`
--

LOCK TABLES `trader` WRITE;
/*!40000 ALTER TABLE `trader` DISABLE KEYS */;
INSERT INTO `trader` VALUES (3,8,'Supreme Stationery','22,Supreme stationery,nikol,ahmedabad','9106331012','Your one stop destination for all pastel stationery and art collection.','2025-11-11 18:10:49','2025-11-11 18:10:49'),(4,9,'PaperPop','12,PaperPop ,Thaltej,ahmedabad','9106331012','Bringing all items having a unique blend of functionality and design made to inspire.','2025-11-11 19:13:35','2025-11-11 19:13:35'),(5,10,'InkSpirations','33,Aryan Mall,Vaishnovdevi , Ahmedabad','1234512345','Your place to find tools that feature charming, often whimsical, designs intended to make everyday tasks feel more joyful and personal.','2025-11-11 19:45:54','2025-11-11 19:45:54');
/*!40000 ALTER TABLE `trader` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contact` varchar(10) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `is_trader` tinyint(1) NOT NULL DEFAULT '0',
  `is_serviceprovider` tinyint(1) NOT NULL DEFAULT '0',
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'Test User','testuser@example.com','','$2b$10$QM/FaWuGhp5dNNn7OCk5kuFOeHdwlsg2rDhINATcqwNXZylN8wQe.','9876543210',0,0,0,0,'2025-08-12 05:20:37','2025-08-12 05:20:37'),(3,'Om Somani','om.somani@gmail.com','Ahmedabad','$2b$10$BM6uWIV.O7lu/ZqSvdfJjec6jNlryR01RDrYmi800Vg0HlR3XXJEm','9157992385',0,1,0,1,'2025-11-03 10:46:56','2025-11-07 06:48:31'),(4,'test1','test1@gmail.com','Gandhinagar','$2b$10$7/GaxmpYed0tbDYw5bJocubDsQ7xFLZkgOhp8LKgAf276uq356LGC','1231231231',0,0,0,0,'2025-11-03 13:12:27','2025-11-03 13:12:27'),(8,'Heta','202412022@dau.ac.in','4,malbar gold,nikol,Ahmedabad','$2b$10$tMA0nW0cxdkaC44AuqgAluxmMDPbVYQ5Pd4nfuW2.TB.7LYz/3JEG','9876556789',0,1,0,1,'2025-11-11 18:10:49','2025-11-12 06:09:01'),(9,'yash','202412111@dau.ac.in','4,malbar silver,bhatar,Ahmedabad','$2b$10$red29zh1TrehPy0K0zUhq.CbrfIrPc6wxzZbs96GJricnYVh76RJm','9876556789',0,1,0,1,'2025-11-11 19:13:34','2025-11-12 06:08:58'),(10,'Om ','202412106@dau.ac.in','12,Shivalik Heights,Kudasan,Ahmedabad','$2b$10$gA36XiFWem.SiQNPs8kmfu6V4bzwdu2.lA5LbY6Su.3spitx6Anbu','9876516789',0,1,0,1,'2025-11-11 19:45:54','2025-11-12 06:08:54');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-12  6:13:05
