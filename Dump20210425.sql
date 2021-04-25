-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: mbmconsoledb
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `ADDRESS_ID` int NOT NULL AUTO_INCREMENT,
  `MEMBER_ID` int DEFAULT NULL,
  `FIRSTNAME` varchar(245) DEFAULT NULL,
  `MIDDLENAME` varchar(245) DEFAULT NULL,
  `LASTNAME` varchar(245) DEFAULT NULL,
  `ADDRESSLINE1` varchar(245) DEFAULT NULL,
  `ADDRESSLINE2` varchar(245) DEFAULT NULL,
  `LANDMARK` varchar(245) DEFAULT NULL,
  `CITY` varchar(245) DEFAULT NULL,
  `STATE` varchar(245) DEFAULT NULL,
  `COUNTRY` varchar(245) DEFAULT NULL,
  `ZIPCODE` varchar(45) DEFAULT NULL,
  `EMAIL1` varchar(245) DEFAULT NULL,
  `EMAIL2` varchar(245) DEFAULT NULL,
  `PHONE1` varchar(45) DEFAULT NULL,
  `PHONE2` varchar(45) DEFAULT NULL,
  `MOBILE1` varchar(45) DEFAULT NULL,
  `MOBILE1CODE` varchar(45) DEFAULT NULL,
  `MOBILE2` varchar(45) DEFAULT NULL,
  `MOBILE2CODE` varchar(45) DEFAULT NULL,
  `FAX1` varchar(45) DEFAULT NULL,
  `GENDER` varchar(45) DEFAULT NULL,
  `BLOODTYPE` varchar(45) DEFAULT NULL,
  `PANNO` varchar(245) DEFAULT NULL,
  `VOTERID` varchar(245) DEFAULT NULL,
  `AADHAARID` varchar(245) DEFAULT NULL,
  `PASSPORTID` varchar(245) DEFAULT NULL,
  `ADDRESSTYPE` varchar(45) DEFAULT NULL,
  `ADDRESSFOR` varchar(45) DEFAULT NULL,
  `DL` varchar(245) DEFAULT NULL,
  `FIELD1` varchar(245) DEFAULT NULL,
  `FIELD2` varchar(245) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `gstin` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ADDRESS_ID`),
  KEY `ADDRESS_FK1_idx` (`MEMBER_ID`),
  CONSTRAINT `ADDRESS_FK1` FOREIGN KEY (`MEMBER_ID`) REFERENCES `user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,1,'Vikrant',NULL,'Singh','Sector-63',NULL,'Sector-63','Noida','Uttar Pradesh','India','201301','usamarath478@gmail.com',NULL,NULL,NULL,'9178513603','+91',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,NULL,NULL),(2,2,'Umasankar',NULL,'Samarath','undefined',NULL,'Sector-63','Noida','Uttar Pradesh','India','201301','usamarath478@gmail.com',NULL,'898989898',NULL,'9178513603','+91',NULL,NULL,NULL,NULL,NULL,'FDWPS7793N',NULL,NULL,NULL,'H','SB',NULL,NULL,NULL,'CEBS','06AALCA6783C1ZL'),(3,3,'Umasankar',NULL,'Samarath','Noida',NULL,'Sector-63','Noida','Uttar Pradesh','India','201301','undefined',NULL,'undefined',NULL,'undefined','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'H','SB',NULL,NULL,NULL,'undefined','GSFYFGAHGHGSH452'),(4,4,'Abdul',NULL,'W','Sector-63-980',NULL,'Sector-63','Pune','Maharashtra','India','201301','usamarath478@gmail.com',NULL,'',NULL,'9178513603','+91',NULL,NULL,NULL,NULL,NULL,'987698760',NULL,NULL,NULL,'H','SB',NULL,NULL,NULL,'','1234567'),(5,5,'Vipin',NULL,'Samarath','undefined',NULL,NULL,'Pune','Maharashtra','India','','vipin@gmail.com',NULL,'',NULL,'98989898989','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'Shree Traders',''),(6,6,'Umasankar',NULL,'Samarath','undefined',NULL,NULL,'Noida','Uttar Pradesh','India','201301','usamarath478@gmail.com',NULL,'5454545',NULL,'9178513603','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'CEBS','06AALCA6783C1ZL'),(7,7,'uma',NULL,'Samarath','Plot No-25, Sector-32',NULL,NULL,'Noida','Uttar Pradesh','India','201306','uma@gmail.com',NULL,'',NULL,'9178513603','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'MBM',''),(8,8,'JothishKumar ',NULL,'SP','Chennai',NULL,NULL,'Ambattur','Tamil Nadu','India','600083','TEST0011@gmail.com',NULL,'0442131313131311',NULL,'8056805053','+91',NULL,NULL,NULL,NULL,NULL,'TEST0011',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'MBM Chairs ','TEST0011'),(10,12,'Avinash ',NULL,'Singh','undefined',NULL,NULL,'Siliguri','West Bengal','India','734005','mbmchairavinash@gmail.com',NULL,'7384134971',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'srvtech',''),(11,13,'Prabhu',NULL,'Raj','undefined',NULL,NULL,'Chennai','Tamil Nadu','India','600075','test@gmail.com',NULL,'9710942522',NULL,'9710942522','+91',NULL,NULL,NULL,NULL,NULL,'25E65D',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'Customer Broadcast',''),(12,20,'Jai',NULL,'Ganesh','undefined',NULL,NULL,'Vellore','Tamil Nadu','India','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(13,24,'USS',NULL,'SMA','undefined',NULL,NULL,'Noida','Uttar Pradesh','India','201308','uma@gmail.com',NULL,'5454545',NULL,'9178513603','+91',NULL,NULL,NULL,NULL,NULL,'FDWPS7793N',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'CEBS','AGSFSFJH45454'),(14,25,'Umasankar',NULL,'Samarath','ghhgdgh',NULL,NULL,'Noida','Uttar Pradesh','India','201301','uma@gmail.com',NULL,'',NULL,'9178513603','+91',NULL,NULL,NULL,NULL,NULL,'FDWPS7793N',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'CEBS','AGSFSFJH45454'),(15,26,'vikrant ',NULL,'singh','abcd',NULL,NULL,'Noida','Uttar Pradesh','India','734005','abc@gmail.com',NULL,'7384134971',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'abcde',''),(16,27,'usssss',NULL,'ssss','ff',NULL,NULL,'Guna','Madhya Pradesh','India','201301','uma@gmail.com',NULL,'5454545',NULL,'9178513603','+91',NULL,NULL,NULL,NULL,NULL,'FDWPS7793N',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'CEBS','AGSFSFJH45454'),(17,28,'vikrant',NULL,'singh','abcd',NULL,NULL,'Noida','Uttar Pradesh','India','734005','abc@gmail.com',NULL,'',NULL,'07384134971','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'abcde',''),(18,29,'Jai',NULL,'Ganesh','',NULL,NULL,'Chennai','Tamil Nadu','India','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(19,30,'Jai',NULL,'Ganesh','',NULL,NULL,'Chennai','Tamil Nadu','India','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(20,32,'bakya',NULL,'t','',NULL,NULL,'Chennai','Tamil Nadu','India','','backiyavalli@gmail.com',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'CB',''),(21,33,'xxx',NULL,'aa','',NULL,NULL,'Warangal','Telangana','India','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(22,34,'test dealer',NULL,'cb','',NULL,NULL,'Chennai','Tamil Nadu','India','','cb@gmail.com',NULL,'121344cdddddd',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(23,35,'test dis',NULL,'cb','',NULL,NULL,'New Delhi','Delhi','India','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(24,36,'Bakya',NULL,'T','Guindy, Chennai',NULL,NULL,'Chennai','Tamil Nadu','India','600096','test@gmail.com',NULL,'',NULL,'9846466565','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'CB',''),(25,37,'xxx',NULL,'yyy','guindy',NULL,NULL,'Chennai','Tamil Nadu','India','','abc@gmail.com',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'TEST',''),(26,38,'dsjnks',NULL,'njsdn','',NULL,NULL,'Tiruvottiyur','Tamil Nadu','India','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'ndjvj',''),(27,39,'gdg',NULL,'jdsfn','',NULL,NULL,'Kirari Suleman Nagar','Delhi','India','','vjdb@gmail.com',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'djn',''),(28,41,'xvnsjdn',NULL,'vsd','',NULL,NULL,'Kirari Suleman Nagar','Delhi','India','','badhab@gmail.com',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'sdv',''),(29,42,'123',NULL,'123','',NULL,NULL,'Avadi','Tamil Nadu','India','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(30,43,'sd',NULL,'sdf','',NULL,NULL,'Raipur','Chhattisgarh','India','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(31,45,'1212213',NULL,'21312312','',NULL,NULL,'Ranchi','Jharkhand','India','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(32,46,'hjkkjhk',NULL,'hjkhjk','',NULL,NULL,'Panchkula','Haryana','India','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(33,47,'56456456',NULL,'546546','',NULL,NULL,'Salem','Tamil Nadu','India','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(34,48,'dbfghjghjkghkhj',NULL,'hgjkghkghjk','',NULL,NULL,'Siliguri','West Bengal','India','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(35,49,'Ganesh',NULL,'Ganesh','',NULL,NULL,'Singrauli','Madhya Pradesh','India','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(36,58,'Firstname',NULL,'Lastname','address1',NULL,NULL,'Siliguri','West Bengal','India','987654','test@mail.com',NULL,'9051547754',NULL,'9051547754','+91',NULL,NULL,NULL,NULL,NULL,'123456',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'TestCompany','123456'),(39,NULL,'Test',NULL,'Boris','address1',NULL,NULL,'Siliguri','West Bengal','India','987654','boris@mail.com',NULL,'9051547754',NULL,'9051547754','+91',NULL,NULL,NULL,NULL,NULL,'123456',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'TestCompany','123456'),(41,NULL,'Test',NULL,'Boris','address1',NULL,NULL,'Siliguri','West Bengal','India','987654','boris@mail.com',NULL,'9051547754',NULL,'9051547754','+91',NULL,NULL,NULL,NULL,NULL,'123456',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'TestCompany','123456'),(42,NULL,'Testing2',NULL,'Boris','address1',NULL,NULL,'Siliguri','West Bengal','India','987654','boris@mail.com',NULL,'9051547754',NULL,'9051547754','+91',NULL,NULL,NULL,NULL,NULL,'123456',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'TestCompany','123456'),(43,NULL,'Testing2',NULL,'Boris','address1',NULL,NULL,'Siliguri','West Bengal','India','987654','boris@mail.com',NULL,'9051547754',NULL,'9051547754','+91',NULL,NULL,NULL,NULL,NULL,'123456',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'TestCompany','123456'),(44,NULL,'Testing2',NULL,'Boris','address1',NULL,NULL,'Siliguri','West Bengal','India','987654','boris@mail.com',NULL,'9051547754',NULL,'9051547754','+91',NULL,NULL,NULL,NULL,NULL,'123456',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'TestCompany','123456'),(45,NULL,'Testyname',NULL,'lasttest','undefined',NULL,NULL,'Pune','Maharashtra','India','8987654','test098@mail.com',NULL,'8574876486',NULL,'9043578748','+91',NULL,NULL,NULL,NULL,NULL,'weo7385',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'ABC','92373584375'),(46,NULL,'Boris Test',NULL,'TestName','undefined',NULL,NULL,'Rewa','Madhya Pradesh','India','35674564','cbd@mail.com',NULL,'8678576587',NULL,'9859687','+91',NULL,NULL,NULL,NULL,NULL,'049695778',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'CBD','8735874854'),(47,NULL,'uyruyu',NULL,'eiuiufi','undefined',NULL,NULL,'Vijayanagaram','Andhra Pradesh','India','745648','dufyud@mail.com',NULL,'46576475',NULL,'7675674','+91',NULL,NULL,NULL,NULL,NULL,'84568647',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'suyfduf','6736547'),(48,NULL,'VikrantTest',NULL,'Signh','undefined',NULL,NULL,'Kirari Suleman Nagar','Delhi','India','0998765','test7654@mail.com',NULL,'48574584785',NULL,'947584758','+91',NULL,NULL,NULL,NULL,NULL,'9384758436746',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'MNN','934758465847'),(49,NULL,'TestTwo',NULL,'Three','undefined',NULL,NULL,'Kalyan-Dombivli','Maharashtra','India','9087654','test@mail.com',NULL,'746574657465',NULL,'64765476576','+91',NULL,NULL,NULL,NULL,NULL,'928374837',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'MBC','4975847584'),(50,NULL,'UserName',NULL,'Userlastname','undefined',NULL,NULL,'Kolkata','West Bengal','India','987654','user@mail.com',NULL,'475847584',NULL,'84584578','+91',NULL,NULL,NULL,NULL,NULL,'95849854985948',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'ABC Co','39849859459'),(51,NULL,'TestBo',NULL,'TestBis','test address',NULL,NULL,'Eluru','Andhra Pradesh','India','098765','bobisw@mail.com',NULL,'8475487584',NULL,'4854875','+91',NULL,NULL,NULL,NULL,NULL,'846574657',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'BoBis','845746574'),(52,NULL,'BoBis',NULL,'Biswas','test address',NULL,NULL,'Maheshtala','West Bengal','India','98765','bobisw@mail.com',NULL,'736746574',NULL,'56476574657','+91',NULL,NULL,NULL,NULL,NULL,'74564765',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'BoBis','73647564'),(53,NULL,'bb',NULL,'bb','bb test bb',NULL,NULL,'Kota','Rajasthan','India','098765','bb@mail.com',NULL,'454545454',NULL,'345454545','+91',NULL,NULL,NULL,NULL,NULL,'343434343',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'bb','345454545'),(54,NULL,'MBM',NULL,'MBM','test address',NULL,NULL,'Kolkata','West Bengal','India','908765','mbm@mail.com',NULL,'986958695',NULL,'9489565986','+91',NULL,NULL,NULL,NULL,NULL,'984758475874',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'MBM','48758768576'),(55,NULL,'MBM',NULL,'MBM','test address',NULL,NULL,'Khammam','Telangana','India','890765','mbm@mail.com',NULL,'847585768',NULL,'49755655876857','+91',NULL,NULL,NULL,NULL,NULL,'475986587685',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'MBM','8347587685'),(56,NULL,'MBM',NULL,'MBM','test address',NULL,NULL,'Coimbatore','Tamil Nadu','India','890765','mbm@mail.com',NULL,'9087654321',NULL,'9087654431','+91',NULL,NULL,NULL,NULL,NULL,'768940998',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'MBM','567383993009'),(57,NULL,'MBM',NULL,'MBM','test address',NULL,NULL,'Jamnagar','Gujarat','India','908765','mbm@mail.com',NULL,'854875748',NULL,'897638473847','+91',NULL,NULL,NULL,NULL,NULL,'94895486',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'MBM','847584784'),(58,NULL,'MBM',NULL,'MBM','test address',NULL,NULL,'Rajkot','Gujarat','India','890765','mbm@mail.com',NULL,'985768567',NULL,'986586758','+91',NULL,NULL,NULL,NULL,NULL,'89488695',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'MBM','49854985490945'),(59,NULL,'MBM',NULL,'MBM','Test Address',NULL,NULL,'Kolkata','West Bengal','India','908765','mbm@mail.com',NULL,'586758768',NULL,'785675867','+91',NULL,NULL,NULL,NULL,NULL,'586758678',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'MBM','85765876'),(60,NULL,'MBM2',NULL,'MBM2','test address',NULL,NULL,'Pune','Maharashtra','India','845678','mbm2@mail.com',NULL,'84576587',NULL,'845675876','+91',NULL,NULL,NULL,NULL,NULL,'497565867',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'MBM2','487584768'),(61,NULL,'MBM',NULL,'MBM','Test Address',NULL,NULL,'Mysore','Karnataka','India','890765','mbm@mail.com',NULL,'4986596785',NULL,'47685768','+91',NULL,NULL,NULL,NULL,NULL,'5765876',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'MBM','548695869'),(62,NULL,'ABC 1',NULL,'BC1','test address',NULL,NULL,'Madurai','Tamil Nadu','India','908765','abctwo@mail.com',NULL,'945765876',NULL,'845768567','+91',NULL,NULL,NULL,NULL,NULL,'5867587',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'ABC two','74857847568'),(63,NULL,'Demo',NULL,'Name','test address',NULL,NULL,'Anantapur','Andhra Pradesh','India','908765','demo@mail.com',NULL,'985985998',NULL,'84748748748','+91',NULL,NULL,NULL,NULL,NULL,'7647647647',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'DemoOrg','643837837'),(64,NULL,'Boris ',NULL,'Biswas','address1',NULL,NULL,'Siliguri','West Bengal','India','987654','boris@mail.com',NULL,'9051547754',NULL,'9051547754','+91',NULL,NULL,NULL,NULL,NULL,'123456',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'TestCompany','123456'),(65,NULL,'Boris ',NULL,'Biswas','address1',NULL,NULL,'Siliguri','West Bengal','India','987654','boris@mail.com',NULL,'9051547754',NULL,'9051547754','+91',NULL,NULL,NULL,NULL,NULL,'123456',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'TestCompany','123456'),(66,NULL,'Boris ',NULL,'Biswas','address1',NULL,NULL,'Siliguri','West Bengal','India','987654','boris@mail.com',NULL,'9051547754',NULL,'9051547754','+91',NULL,NULL,NULL,NULL,NULL,'123456',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'TestCompany','123456'),(67,NULL,'test',NULL,'test','test',NULL,NULL,'Katni','Madhya Pradesh','India','767676','test@mail.com',NULL,'767676',NULL,'767676','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'test','676767'),(68,NULL,'Boris ',NULL,'Biswas','address1',NULL,NULL,'Siliguri','West Bengal','India','987654','boris@mail.com',NULL,'9051547754',NULL,'9051547754','+91',NULL,NULL,NULL,NULL,NULL,'123456',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'TestCompany','123456'),(69,NULL,'Boris ',NULL,'Biswas','address1',NULL,NULL,'Siliguri','West Bengal','India','987654','boris@mail.com',NULL,'9051547754',NULL,'9051547754','+91',NULL,NULL,NULL,NULL,NULL,'123456',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'TestCompany','123456'),(70,NULL,'Boris ',NULL,'Biswas','address1',NULL,NULL,'Siliguri','West Bengal','India','987654','boris@mail.com',NULL,'9051547754',NULL,'9051547754','+91',NULL,NULL,NULL,NULL,NULL,'123456',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'TestCompany','123456'),(71,NULL,'fghghfgfh',NULL,'fghfghfgh','fhfhfgh',NULL,NULL,'Eluru','Andhra Pradesh','India','565656','gfhfghfgh',NULL,'5656565',NULL,'5656565','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'fghfghgf','5656565'),(72,NULL,'Boris ',NULL,'Biswas','address1',NULL,NULL,'Siliguri','West Bengal','India','987654','boris@mail.com',NULL,'9051547754',NULL,'9051547754','+91',NULL,NULL,NULL,NULL,NULL,'123456',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'TestCompany','123456'),(73,NULL,'',NULL,'','',NULL,NULL,'','','','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(74,NULL,'',NULL,'','',NULL,NULL,'','','','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(75,NULL,'',NULL,'','',NULL,NULL,'','','','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(76,NULL,'',NULL,'','',NULL,NULL,'','','','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(77,NULL,'',NULL,'','',NULL,NULL,'','','','','',NULL,'',NULL,'','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'',''),(78,NULL,'Jo',NULL,'Kumar','Chennai',NULL,NULL,'Chennai','Tamil Nadu','India','600132','Testjo@gmail.com ',NULL,'8056805053',NULL,'8056805053','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'Customer Broadcast ','3o393jsnsnjsnan'),(79,NULL,'Avinash ',NULL,'singh','TEST',NULL,NULL,'Gangtok','Sikkim','India','789450','ABCDEF@GMAIL.COM',NULL,'',NULL,'2222222222','+91',NULL,NULL,NULL,NULL,NULL,'FVRVRVWVRV',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'ABC INTERBATIONAL ','VWDRCWVFWWV'),(80,NULL,'Jo',NULL,'Ku','Chennai ',NULL,NULL,'Chennai','Tamil Nadu','India','600321','Testjo@gmail.com ',NULL,'8056805053',NULL,'8056805053','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'Customer ','3839wjalaofbkxp'),(81,NULL,'Siva ',NULL,'Subu','No.72, Avadi kuruku sandhu',NULL,NULL,'Avadi','Tamil Nadu','India','601200','Happy@gmail.com',NULL,'9898989898',NULL,'9898989898','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'Happy ','Ricmdmvmcdjdjxc'),(82,NULL,'Siva ',NULL,'Subu','No.72, Avadi kuruku sandhu',NULL,NULL,'Avadi','Tamil Nadu','India','601200','Happy@gmail.com',NULL,'9898989898',NULL,'9898989898','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'Happy ','Ricmdmvmcdjdjxc'),(83,NULL,'Mbm ',NULL,'India ','Vallam ',NULL,NULL,'Chennai','Tamil Nadu','India','600077','Pdinesh@mbmindia.co.in',NULL,'7299997291',NULL,'7299997291','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'Mbm india pvt ltd ','Vdkkdmhsskbrghf'),(84,NULL,'Mbm',NULL,'India','Address',NULL,NULL,'Chennai','Tamil Nadu','India','600084','mbm@mbmindia.com',NULL,'9876543210',NULL,'9876543210','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'Mbm India','33dzopk5229k1z1'),(85,NULL,'Mbm',NULL,'India','Address',NULL,NULL,'Chennai','Tamil Nadu','India','600084','mbm@mbmindia.com',NULL,'9876543210',NULL,'9876543210','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'Mbm India','33dzopk5229k1z1'),(86,NULL,'Bbb',NULL,'Vvb','Fgyu',NULL,NULL,'Chennai','Tamil Nadu','India','','balaji21192@gmail.com',NULL,'8939351026',NULL,'8939351026','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'Dtub','33dZopk5229k1z9'),(87,NULL,'Test',NULL,'1','Wiffb',NULL,NULL,'Chennai','Tamil Nadu','India','600004','Test@mail.com',NULL,'4846',NULL,'4846','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'Xyz','33abcp11231q231'),(88,NULL,'Tesy',NULL,'Test','Test',NULL,NULL,'Rewa','Madhya Pradesh','India','213497','Test@mail.com',NULL,'9842364888',NULL,'9842364888','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'Test','Testhsydyfnnfnf'),(89,59,'Boris',NULL,'Biswas','test address',NULL,NULL,'Mumbai','Maharashtra','India','123456','boris.biswas@gmail.com',NULL,'9051547754',NULL,'9051547754','+91',NULL,NULL,NULL,NULL,NULL,'1234567',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'TestCo','123445'),(90,NULL,'test',NULL,'test','test',NULL,NULL,'Anantapur','Andhra Pradesh','India','234324','test@mail.com',NULL,'8596589685',NULL,'8596589685','+91',NULL,NULL,NULL,NULL,NULL,'undefined',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'test','454353454356565'),(91,60,'Boris2',NULL,'Biswas','test',NULL,NULL,'Pune','Maharashtra','India','123123','boris.biswas+1@gmail.com',NULL,'938973484',NULL,'90515477654','+91',NULL,NULL,NULL,NULL,NULL,'123456',NULL,NULL,NULL,'O','SB',NULL,NULL,NULL,'BorisCo','12345678');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atch`
--

DROP TABLE IF EXISTS `atch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atch` (
  `ATCH_ID` int NOT NULL AUTO_INCREMENT,
  `OBJECT_ID` int NOT NULL,
  `URL` varchar(245) DEFAULT NULL,
  `SEQUENCE` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ATCH_ID`),
  KEY `ATCH_FK1_idx` (`OBJECT_ID`),
  CONSTRAINT `ATCH_FK1` FOREIGN KEY (`OBJECT_ID`) REFERENCES `product` (`PRODUCT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atch`
--

LOCK TABLES `atch` WRITE;
/*!40000 ALTER TABLE `atch` DISABLE KEYS */;
/*!40000 ALTER TABLE `atch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attr`
--

DROP TABLE IF EXISTS `attr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attr` (
  `ATTR_ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(245) DEFAULT NULL,
  `IDENTIFIER` varchar(245) NOT NULL,
  `FIELD1` varchar(245) DEFAULT NULL,
  `FIELD2` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`ATTR_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attr`
--

LOCK TABLES `attr` WRITE;
/*!40000 ALTER TABLE `attr` DISABLE KEYS */;
/*!40000 ALTER TABLE `attr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attrval`
--

DROP TABLE IF EXISTS `attrval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attrval` (
  `ATTRVAL_ID` int NOT NULL AUTO_INCREMENT,
  `ATTR_ID` int NOT NULL,
  `IDENTIFIER` varchar(245) NOT NULL,
  `NAME` varchar(245) DEFAULT NULL,
  `FIELD1` varchar(245) DEFAULT NULL,
  `FIELD2` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`ATTRVAL_ID`),
  KEY `ATTRVAL_FK1_idx` (`ATTR_ID`),
  CONSTRAINT `ATTRVAL_FK1` FOREIGN KEY (`ATTR_ID`) REFERENCES `attr` (`ATTR_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attrval`
--

LOCK TABLES `attrval` WRITE;
/*!40000 ALTER TABLE `attrval` DISABLE KEYS */;
/*!40000 ALTER TABLE `attrval` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `CART_ID` int NOT NULL AUTO_INCREMENT,
  `MEMBER_ID` int NOT NULL,
  `COUNT` int NOT NULL,
  `TOTAL` varchar(245) DEFAULT NULL,
  `FIELD1` varchar(245) DEFAULT NULL,
  `FIELD2` varchar(1000) DEFAULT NULL,
  `STATUS` varchar(45) NOT NULL,
  `REDEEM_POINTS` int DEFAULT '0',
  PRIMARY KEY (`CART_ID`),
  UNIQUE KEY `UC_cart` (`MEMBER_ID`,`STATUS`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (32,2,1,'352.5','300','52.5','P',0);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartdtl`
--

DROP TABLE IF EXISTS `cartdtl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartdtl` (
  `CARTDTL_ID` int NOT NULL AUTO_INCREMENT,
  `CART_ID` int NOT NULL,
  `MEMBER_ID` int NOT NULL,
  `PRODUCT_ID` int NOT NULL,
  `pspare_id` varchar(255) DEFAULT NULL,
  `FIELD1` varchar(245) DEFAULT NULL,
  `FIELD2` varchar(1000) DEFAULT NULL,
  `STATUS` varchar(45) NOT NULL,
  `QTY` int DEFAULT NULL,
  `PSPARE_PRICE` varchar(255) DEFAULT NULL,
  `TOTAL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CARTDTL_ID`),
  KEY `CARTDTL_FK2_idx` (`CART_ID`),
  CONSTRAINT `CARTDTL_FK2` FOREIGN KEY (`CART_ID`) REFERENCES `cart` (`CART_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartdtl`
--

LOCK TABLES `cartdtl` WRITE;
/*!40000 ALTER TABLE `cartdtl` DISABLE KEYS */;
INSERT INTO `cartdtl` VALUES (32,32,2,1,'1,2','50','250','P',1,'1/120,2/130','300');
/*!40000 ALTER TABLE `cartdtl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaints`
--

DROP TABLE IF EXISTS `complaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaints` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `order_qty_complain` text,
  `order_qa_complain` text,
  `order_delivery_complain` text,
  `CREATETIME` timestamp NULL DEFAULT NULL,
  `UPDATETIME` timestamp NULL DEFAULT NULL,
  `feedback` text,
  `STATUS` varchar(45) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaints`
--

LOCK TABLES `complaints` WRITE;
/*!40000 ALTER TABLE `complaints` DISABLE KEYS */;
INSERT INTO `complaints` VALUES (1,10001,'Ordered for 5 qty, received 4','Color mismatch','','2020-10-21 22:05:11','2020-10-21 22:05:11','','R',3),(2,10000,'ordered 15 pieces received 12','Color Mismatch, Legs broken and some wheels are missing','Delivery Delayed.','2021-02-13 10:56:47','2021-02-13 10:56:47','Hoping for better services.','R',4),(3,10005,'ordered 15 pieces received 12','Color Mismatch, Legs broken and some wheels are missing','Delivery Delayed.','2021-02-13 10:58:40','2021-02-13 10:58:40','Hoping for better services.','I',3),(4,10108,'ordered 15 pieces received 12','Color Mismatch, Legs broken and some wheels are missing','Delivery Delayed.','2021-02-13 11:19:08','2021-02-13 11:19:08','Hoping for better services.','R',4),(5,10000,'ordered 15 pieces received 12','Color Mismatch, Legs broken and some wheels are missing','Delivery Delayed.','2021-02-19 08:09:27','2021-02-19 08:09:27','Hoping for better services.','R',3),(6,10004,'ORdered 10 received 8','Low Quality','Delayed Delivery','2021-02-22 13:48:10','2021-02-22 13:48:10','Hoping for better service','A',4),(7,10132,'Yes , SQ 100 , RC 50','no','No','2021-03-03 12:57:58','2021-03-03 12:57:58','Worst ','A',3),(8,10145,'','','','2021-03-31 04:14:16','2021-03-31 04:14:16','','P',3);
/*!40000 ALTER TABLE `complaints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount_ads`
--

DROP TABLE IF EXISTS `discount_ads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount_ads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) DEFAULT NULL,
  `CREATETIME` timestamp NULL DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount_ads`
--

LOCK TABLES `discount_ads` WRITE;
/*!40000 ALTER TABLE `discount_ads` DISABLE KEYS */;
INSERT INTO `discount_ads` VALUES (1,'banner_1.jpg','2021-04-14 22:46:00','Active'),(2,'banner_2.jpg','2021-04-14 22:47:51','Discount'),(5,'sample.pdf','2021-04-14 23:42:05','Discount');
/*!40000 ALTER TABLE `discount_ads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emails`
--

DROP TABLE IF EXISTS `emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emails` (
  `EMAILS` int NOT NULL AUTO_INCREMENT,
  `FROM` varchar(245) NOT NULL,
  `TO` varchar(245) DEFAULT NULL,
  `CC` varchar(245) DEFAULT NULL,
  `BCC` varchar(245) DEFAULT NULL,
  `CONTENT` varchar(1000) DEFAULT NULL,
  `STATUS` varchar(45) NOT NULL,
  PRIMARY KEY (`EMAILS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emails`
--

LOCK TABLES `emails` WRITE;
/*!40000 ALTER TABLE `emails` DISABLE KEYS */;
/*!40000 ALTER TABLE `emails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiry`
--

DROP TABLE IF EXISTS `enquiry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enquiry` (
  `ENQUIRY_ID` int NOT NULL AUTO_INCREMENT,
  `USER_ID` int NOT NULL,
  `STATUS` varchar(255) DEFAULT NULL,
  `CREATEDATE` varchar(255) DEFAULT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `TYPE` varchar(255) DEFAULT NULL,
  `QTY` varchar(255) DEFAULT NULL,
  `PRICE` varchar(255) DEFAULT NULL,
  `IMAGE1` varchar(245) DEFAULT NULL,
  `IMAGE2` varchar(245) DEFAULT NULL,
  `IMAGE3` varchar(245) DEFAULT NULL,
  `IMAGE4` varchar(245) DEFAULT NULL,
  `IMAGE5` varchar(245) DEFAULT NULL,
  `IMAGE6` varchar(245) DEFAULT NULL,
  `COMMENT` varchar(245) DEFAULT NULL,
  `FIELD1` varchar(245) DEFAULT NULL,
  `FIELD2` varchar(245) DEFAULT NULL,
  `ISNEW` varchar(255) DEFAULT NULL,
  `NEXTDATE` varchar(255) DEFAULT NULL,
  `ADDRESS_ID` int DEFAULT NULL,
  `QTY_2` varchar(45) DEFAULT NULL,
  `QTY_3` varchar(45) DEFAULT NULL,
  `QTY_4` varchar(45) DEFAULT NULL,
  `QTY_5` varchar(45) DEFAULT NULL,
  `PRICE_2` varchar(45) DEFAULT NULL,
  `PRICE_3` varchar(45) DEFAULT NULL,
  `PRICE_4` varchar(45) DEFAULT NULL,
  `PRICE_5` varchar(45) DEFAULT NULL,
  `ESTIMATED_DELIVERY_DATE` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ENQUIRY_ID`),
  KEY `ENQUIRY_FK1_idx` (`USER_ID`),
  CONSTRAINT `ENQUIRY_FK1` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry`
--

LOCK TABLES `enquiry` WRITE;
/*!40000 ALTER TABLE `enquiry` DISABLE KEYS */;
INSERT INTO `enquiry` VALUES (1,27,'S','2020-12-23','Enquiry','Warn','40','100','25_3_2020_3.png','','','','',NULL,'rest',NULL,NULL,'Y','2021-01-04',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,28,'S','2020-12-10','Enquiry','Warn','7','500','Shirt.png','','','','',NULL,'test',NULL,NULL,'Y',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,30,'F','2021-01-05','Enquiry','Hot','30900','4234234234','variant_16010339383yX9C4M1bt.jpg','Capture001.png','','','','','Test',NULL,NULL,'N','2021-01-23',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,36,'A','2021-01-06','Enquiry','Hot','12','50','','','','','','','test',NULL,NULL,'N','2021-01-07',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,49,'F','2021-01-08','Enquiry','Cold','100','100000','variant_1601034369YANlXU3P9t.jpg','','','','','','',NULL,NULL,'N','2021-01-20',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,58,'P','2021-01-05','Enquiry','Warm','5','1200','variant_16010339383yX9C4M1bt.jpg','Linux(1).png','Linux(2).png','Linux(2).png','Linux(1).png','Linux(1).png','Test comment',NULL,NULL,'N','2021-01-05',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,2,'A','2021-01-05','Enquiry','Warm','5','5000','variant_16010339383yX9C4M1bt.jpg','Linux(1).png','Linux(1).png','Linux(1).png','Linux(1).png','Linux(1).png','Test comment',NULL,NULL,'N','2021-01-05',41,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,2,'P','2021-01-05','Enquiry','Warm','5','5000','variant_16010339383yX9C4M1bt.jpg','Linux(1).png','Linux(1).png','Linux(1).png','Linux(1).png','Linux(1).png','Test comment',NULL,NULL,'N','2021-01-05',42,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,2,'P','2021-01-18','Enquiry','Warm','5','5000','variant_16010339383yX9C4M1bt.jpg','Linux(1).png','Linux(1).png','Linux(1).png','Linux(1).png','Linux(1).png','Test comment',NULL,NULL,'N','2021-01-18',43,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,2,'P','2021-01-18','Enquiry','Warm','5','5000','variant_16010339383yX9C4M1bt.jpg','Linux(1).png','Linux(1).png','Linux(1).png','Linux(1).png','sample1.jpg','Test comment',NULL,NULL,'N','2021-01-18',44,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,2,'P','2021-01-29','Enquiry','warn','5','67895','undefined','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','','',NULL,NULL,'N','2021-01-18',46,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,2,'P','2021-01-29','Enquiry','hot','5','5678','undefined','sample1.jpg','Linux(2).png','Linux(1).png','sample1.jpg','Linux(1).png','',NULL,NULL,'N','undefined',47,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,2,'A','2021-01-29','Enquiry','hot','5','7890','undefined','sample1.jpg','Linux(1).png','','','','',NULL,NULL,'N','undefined',48,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,2,'P','2021-01-30','Enquiry','hot','5','6890','undefined','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','','',NULL,NULL,'N','undefined',49,'6','8','8','10','4567','2345','1234','0987',NULL),(18,2,'P','2021-01-30','Enquiry','hot','10','89000','undefined','chair_1.jpg','chair_2.jpg','chair_3.jpg','chair_4.jpg','chair_5.jpg','',NULL,NULL,'N','undefined',50,'5','4','6','8','1234','4567','7890','9087',NULL),(20,2,'P','2021-01-20','Enquiry','hot','5','1234','undefined','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','','test comment',NULL,NULL,'N','2021-01-28',52,'6','9','2','','4567','4321','3456','',NULL),(21,2,'P','2021-01-20','Enquiry','hot','5','1234','undefined','chair_15.jpg','chair_14.jpeg','chair_13.jpg','chair_9.png','chair_11.jpg','test comment',NULL,NULL,'N','2021-01-26',53,'6','8','2','7','4567','8769','4569','4563',NULL),(22,2,'P','2021-01-20','Enquiry','hot','5','1234','undefined','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','','test comment',NULL,NULL,'N','2021-01-27',54,'8','2','10','','4567','1200','3500','',NULL),(23,2,'P','2021-01-20','Enquiry','hot','5','1234','undefined','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','','test comment',NULL,NULL,'N','2021-01-28',55,'6','8','10','','3456','9087','6789','',NULL),(24,2,'P','2021-01-20','Enquiry','hot','5','1234','undefined','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','','test comment',NULL,NULL,'N','2021-01-28',56,'6','7','8','','5678','7890','9087','',NULL),(25,2,'P','2021-01-20','Enquiry','hot','6','1250','undefined','chair_11.jpg','chair_12.jpg','chair_14.jpeg','chair_15.jpg','chair_7.jpg','test comment',NULL,NULL,'N','2021-01-29',57,'8','10','5','2','7890','12000','1800','24000',NULL),(26,2,'P','2021-01-20','Enquiry','hot','5','1234','undefined','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','','test comment',NULL,NULL,'N','2021-01-25',58,'6','8','10','','4567','14567','6780','',NULL),(27,2,'P','2021-01-20','Enquiry','hot','5','2345','undefined','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','','test comment',NULL,NULL,'N','2021-01-29',59,'8','10','10','','1234','3400','3500','',NULL),(28,2,'A','2021-01-20','Enquiry','hot','10','60000','undefined','chair_7.jpg','chair_3.jpg','chair_12.jpg','chair_6.jpg','chair_9.png','test comment',NULL,NULL,'N','2021-01-29',60,'5','2','8','4','10000','8900','30000','80000',NULL),(29,2,'A','2021-01-20','Enquiry','hot','5','1234','undefined','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','','test comment ',NULL,NULL,'N','2021-01-30',61,'6','8','10','','4567','7890','6789','',NULL),(30,2,'A','2021-01-20','Enquiry','hot','10','50000','undefined','chair_9.png','chair_14.jpeg','','','','test comment',NULL,NULL,'N','2021-01-31',62,'15','','','','20000','','','',NULL),(31,2,'P','2021-01-23','Enquiry','hot','5','60000','undefined','chair_8.jpeg','chair_13.jpg','','','','test comment two ',NULL,NULL,'N','2021-01-29',63,'10','','','','80000','','','',NULL),(32,2,'P','undefined','Enquiry','Warm','undefined','undefined','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','variant_1601034369YANlXU3P9t.jpg','variant_1601034369YANlXU3P9t.jpg','','','Test comment',NULL,NULL,'N','2021-01-05',64,'undefined','undefined','undefined','undefined','undefined','undefined','undefined','undefined',NULL),(33,2,'P','undefined','Enquiry','Warm','4','1234','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','variant_1601034369YANlXU3P9t.jpg','variant_1601034369YANlXU3P9t.jpg','','','Test comment',NULL,NULL,'N','2021-01-05',65,'3','2','','','1234','4321','','',NULL),(34,2,'P','undefined','Enquiry','Warm','4','1234','variant_16010339383yX9C4M1bt.jpg','chair_8.jpeg','chair_12.jpg','chair_13.jpg','','','Test comment',NULL,NULL,'N','2021-01-05',66,'3','2','','','1234','4321','','',NULL),(35,2,'P','undefined','Enquiry','Warm','4','1234','variant_16010339383yX9C4M1bt.jpg','rn_image_picker_lib_temp_83e39907-a631-4dca-ab34-17f9bcc6854c.jpg','rn_image_picker_lib_temp_83e39907-a631-4dca-ab34-17f9bcc6854c.jpg','rn_image_picker_lib_temp_83e39907-a631-4dca-ab34-17f9bcc6854c.jpg','rn_image_picker_lib_temp_83e39907-a631-4dca-ab34-17f9bcc6854c.jpg','rn_image_picker_lib_temp_83e39907-a631-4dca-ab34-17f9bcc6854c.jpg','',NULL,NULL,'N','02/01/21',67,'4','4','4','4','1234','1234','1234','1234',NULL),(36,2,'P','undefined','Enquiry','Warm','4','1234','variant_16010339383yX9C4M1bt.jpg','chair_8.jpeg','chair_12.jpg','chair_13.jpg','','','Test comment',NULL,NULL,'N','2021-01-05',68,'3','2','','','1234','4321','','',NULL),(37,2,'P','undefined','Enquiry','Warm','4','1234','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','variant_1601034369YANlXU3P9t.jpg','undefined','undefined','undefined','Test comment',NULL,NULL,'N','2021-01-05',69,'3','2','','','1234','4321','','',NULL),(38,2,'P','undefined','Enquiry','Warm','4','1234','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','variant_1601034369YANlXU3P9t.jpg','variant_1601034369YANlXU3P9t.jpg','','','Test comment',NULL,NULL,'N','2021-01-05',70,'3','2','','','1234','4321','','',NULL),(39,2,'P','undefined','Enquiry','Warm','2','56565','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','','','','',NULL,NULL,'N','02-02-2021',71,'3','','','','565656','','','',NULL),(40,2,'P','undefined','Enquiry','Warm','4','1234','variant_16010339383yX9C4M1bt.jpg','chair_8.jpeg','chair_12.jpg','chair_13.jpg','','','Test comment',NULL,NULL,'N','2021-01-05',72,'3','2','','','1234','4321','','',NULL),(41,2,'P','undefined','Enquiry','Warm','1','566','variant_16010339383yX9C4M1bt.jpg','rn_image_picker_lib_temp_87a36a4e-024e-4581-8836-80d96d92b6ec.jpg','rn_image_picker_lib_temp_4025ce34-7bf5-4d0a-8acb-6ae380e35c92.jpg','rn_image_picker_lib_temp_6f444ff5-41ff-40b0-826e-e0f25462cca7.jpg','rn_image_picker_lib_temp_a2b96eed-8e2e-4bce-a735-fecea724d652.jpg','rn_image_picker_lib_temp_f05f0351-4906-4a4d-a306-dcbbbb987b8c.jpg','',NULL,NULL,'N','02/02/2021',73,'1','1','1','1','668','678','690','789',NULL),(42,2,'P','undefined','Enquiry','Hot','1','6778','variant_16010339383yX9C4M1bt.jpg','rn_image_picker_lib_temp_a9cfb9f1-1c7e-44a2-b3ff-08a12a040c6c.jpg','','','','','',NULL,NULL,'N','12/02/2021',74,'','','','','','','','',NULL),(43,2,'P','undefined','Enquiry','','1','258','variant_16010339383yX9C4M1bt.jpg','rn_image_picker_lib_temp_fa083948-9316-4718-a27c-91e763dec87e.jpg','','','','','',NULL,NULL,'N','',75,'','','','','','','','',NULL),(44,2,'P','2021-02-02','Enquiry','','3','67786','variant_16010339383yX9C4M1bt.jpg','rn_image_picker_lib_temp_2501473c-460d-46f1-b4c1-77cae53859b4.jpg','','','','','',NULL,NULL,'N','20/02/2021',76,'','','','','','','','',NULL),(45,2,'P','2021-02-02','Enquiry','Cold','1','676','variant_16010339383yX9C4M1bt.jpg','rn_image_picker_lib_temp_b46f00c4-bb4b-4d3c-b6cf-435df684e841.jpg','','','','','',NULL,NULL,'N','02/02/2021',77,'','','','','','','','',NULL),(46,2,'A','2021-03-03','Enquiry','','7','2558','variant_16010339383yX9C4M1bt.jpg','rn_image_picker_lib_temp_75b31c90-2a99-47bb-b9d1-a88ebd1e091b.jpg','','','','','',NULL,NULL,'N','',78,'','','','','','','','',NULL),(47,2,'A','2021-03-03','Enquiry','cold','10','150','undefined','ActivArmor Middle east Logo.PNG','fortiaangular.co.uk_contact-us_(Moto G4) (1).png','WhatsApp Image 2021-02-22 at 13.06.06.jpeg','','','TESTING ',NULL,NULL,'N','2021-03-19',79,'50','1000','','','500','1000','','',NULL),(48,2,'C','2021-03-04','Enquiry','','','','variant_16010339383yX9C4M1bt.jpg','','','','','','',NULL,NULL,'N','',80,'','','','','','','','',NULL),(49,2,'P','2021-03-04','Enquiry','Hot','1','3800','variant_16010339383yX9C4M1bt.jpg','rn_image_picker_lib_temp_f6d73b88-0c59-47c6-8412-9ecede4cfab8.jpg','','','','','',NULL,NULL,'N','05/03/2021',81,'','','','','','','','',NULL),(50,2,'P','2021-03-04','Enquiry','Hot','1','3800','variant_16010339383yX9C4M1bt.jpg','rn_image_picker_lib_temp_f6d73b88-0c59-47c6-8412-9ecede4cfab8.jpg','','','','','',NULL,NULL,'N','05/03/2021',82,'','','','','','','','',NULL),(51,2,'P','2021-03-04','Enquiry','Hot','','','variant_16010339383yX9C4M1bt.jpg','','','','','','',NULL,NULL,'N','04-03-2021',83,'','','','','','','','',NULL),(52,2,'P','2021-03-04','Enquiry','Hot','4','100','variant_16010339383yX9C4M1bt.jpg','rn_image_picker_lib_temp_e382735b-43c5-4d75-979b-cb22897470da.jpg','','','','','',NULL,NULL,'N','11/03/2021',84,'','','','','','','','',NULL),(53,2,'P','2021-03-04','Enquiry','Hot','4','100','variant_16010339383yX9C4M1bt.jpg','rn_image_picker_lib_temp_e382735b-43c5-4d75-979b-cb22897470da.jpg','','','','','',NULL,NULL,'N','11/03/2021',85,'','','','','','','','',NULL),(54,2,'C','2021-03-04','Enquiry','Hot','1','100','variant_16010339383yX9C4M1bt.jpg','variant_16010339383yX9C4M1bt.jpg','','','','','',NULL,NULL,'N','05-03-2021',86,'','','','','','','','',NULL),(55,2,'C','2021-03-04','Enquiry','Warm','3','200','variant_16010339383yX9C4M1bt.jpg','variant_16010339383yX9C4M1bt.jpg','variant_16010339383yX9C4M1bt.jpg','','','','',NULL,NULL,'N','',87,'5','','','','44','','','',NULL),(56,2,'P','2021-03-12','Enquiry','Hot','2','10','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','',NULL,NULL,'N','20-03-2021',88,'2','1','1','1','50','100','150','10',NULL),(57,2,'P','2021-04-08','Enquiry','Hot','1','230','variant_16010339383yX9C4M1bt.jpg','variant_1601034369YANlXU3P9t.jpg','variant_1601034369YANlXU3P9t.jpg','','','','test',NULL,NULL,'N','10-04-2021',90,'1','','','','150','','','','17/04/2021');
/*!40000 ALTER TABLE `enquiry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `INVOICE_ID` int NOT NULL AUTO_INCREMENT,
  `ORDER_ID` int NOT NULL,
  `STATUS` varchar(255) DEFAULT NULL,
  `GENERATEDATE` varchar(255) DEFAULT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `FIELD1` varchar(245) DEFAULT NULL,
  `FIELD2` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`INVOICE_ID`),
  KEY `INVOICE_FK1_idx` (`ORDER_ID`),
  CONSTRAINT `INVOICE_FK1` FOREIGN KEY (`ORDER_ID`) REFERENCES `orders` (`ORDER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (3,10103,'P','2021-01-05 07:54:10','10103_INVOICE',NULL,NULL),(4,10102,'P','2021-01-05 12:03:08','10102_INVOICE',NULL,NULL),(5,10095,'P','2021-01-05 12:07:38','10095_INVOICE',NULL,NULL),(6,10099,'P','2021-01-07 19:03:07','10099_INVOICE',NULL,NULL),(7,10104,'P','2021-01-08 08:17:09','10104_INVOICE',NULL,NULL),(8,10097,'P','2021-01-08 15:42:01','10097_INVOICE',NULL,NULL),(9,10101,'P','2021-01-22 02:07:48','10101_INVOICE',NULL,NULL),(10,10106,'P','2021-01-22 06:34:16','10106_INVOICE',NULL,NULL),(11,10108,'P','2021-01-22 06:37:40','10108_INVOICE',NULL,NULL),(12,10084,'P','2021-01-22 06:37:45','10084_INVOICE',NULL,NULL),(13,10092,'P','2021-01-22 06:41:30','10092_INVOICE',NULL,NULL),(14,10110,'P','2021-01-22 06:54:14','10110_INVOICE',NULL,NULL),(15,10000,'P','2021-01-22 06:57:10','10000_INVOICE',NULL,NULL),(16,10001,'P','2021-01-27 12:23:11','10001_INVOICE',NULL,NULL),(17,10002,'P','2021-01-27 12:23:29','10002_INVOICE',NULL,NULL),(18,10011,'P','2021-02-12 20:27:39','10011_INVOICE',NULL,NULL),(19,10012,'P','2021-02-12 20:27:45','10012_INVOICE',NULL,NULL),(20,10125,'P','2021-02-28 00:50:06','10125_INVOICE',NULL,NULL),(21,10126,'P','2021-02-28 02:00:55','10126_INVOICE',NULL,NULL),(22,10127,'P','2021-02-28 02:07:36','10127_INVOICE',NULL,NULL),(23,10128,'P','2021-03-02 07:14:02','10128_INVOICE',NULL,NULL),(24,10129,'P','2021-03-02 07:56:23','10129_INVOICE',NULL,NULL),(25,10130,'P','2021-03-03 09:01:04','10130_INVOICE',NULL,NULL),(26,10131,'P','2021-03-03 09:07:23','10131_INVOICE',NULL,NULL),(27,10132,'P','2021-03-03 12:38:55','10132_INVOICE',NULL,NULL),(28,10138,'P','2021-03-04 07:02:55','10138_INVOICE',NULL,NULL),(29,10142,'P','2021-03-04 07:04:49','10142_INVOICE',NULL,NULL),(30,10141,'P','2021-03-04 07:05:35','10141_INVOICE',NULL,NULL),(31,10134,'P','2021-03-04 07:06:14','10134_INVOICE',NULL,NULL),(32,10107,'P','2021-03-04 07:06:24','10107_INVOICE',NULL,NULL),(33,10143,'P','2021-03-04 07:23:06','10143_INVOICE',NULL,NULL),(34,10144,'P','2021-03-04 07:23:30','10144_INVOICE',NULL,NULL),(35,10065,'P','2021-03-04 07:42:34','10065_INVOICE',NULL,NULL),(36,10062,'P','2021-03-04 07:42:58','10062_INVOICE',NULL,NULL),(37,10080,'P','2021-03-04 15:00:00','10080_INVOICE',NULL,NULL),(38,10087,'P','2021-03-04 15:00:21','10087_INVOICE',NULL,NULL),(39,10145,'P','2021-03-12 05:49:43','10145_INVOICE',NULL,NULL),(40,10009,'P','2021-03-31 07:59:43','10009_INVOICE',NULL,NULL),(41,10008,'P','2021-03-31 07:59:49','10008_INVOICE',NULL,NULL),(42,10007,'P','2021-03-31 10:39:19','10007_INVOICE',NULL,NULL),(43,10149,'P','2021-04-13 19:54:31','10149_INVOICE',NULL,NULL),(44,10148,'P','2021-04-13 19:54:34','10148_INVOICE',NULL,NULL);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jurst`
--

DROP TABLE IF EXISTS `jurst`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jurst` (
  `id` int NOT NULL,
  `identifier` varchar(1024) NOT NULL,
  `displayname` varchar(1024) DEFAULT NULL,
  `city` varchar(1024) DEFAULT NULL,
  `state` varchar(1024) DEFAULT NULL,
  `country` varchar(1024) DEFAULT NULL,
  `field1` varchar(1024) DEFAULT NULL,
  `field2` varchar(1024) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jurst`
--

LOCK TABLES `jurst` WRITE;
/*!40000 ALTER TABLE `jurst` DISABLE KEYS */;
INSERT INTO `jurst` VALUES (1,'Noida','Noida','Noida','Uttar Pradesh','India',NULL,NULL,'CITY'),(2,'Gurgaon','Gurgaon','Gurgaon','Haryana','India',NULL,NULL,'CITY'),(3,'Uttar Pradesh','Uttar Pradesh',NULL,NULL,'India',NULL,NULL,'STAT'),(4,'India','India',NULL,NULL,NULL,NULL,NULL,'CUNT'),(5,'Maharashtra','Maharashtra',NULL,NULL,'India',NULL,NULL,'STAT'),(6,'Delhi','Delhi',NULL,NULL,'India',NULL,NULL,'STAT'),(7,'Karnataka','Karnataka',NULL,NULL,'India',NULL,NULL,'STAT'),(8,'Telangana','Telangana',NULL,NULL,'India',NULL,NULL,'STAT'),(9,'Gujarat','Gujarat',NULL,NULL,'India',NULL,NULL,'STAT'),(10,'Tamil Nadu','Tamil Nadu',NULL,NULL,'India',NULL,NULL,'STAT'),(11,'West Bengal','West Bengal',NULL,NULL,'India',NULL,NULL,'STAT'),(12,'Rajasthan','Rajasthan',NULL,NULL,'India',NULL,NULL,'STAT'),(13,'Madhya Pradesh','Madhya Pradesh',NULL,NULL,'India',NULL,NULL,'STAT'),(14,'Andhra Pradesh','Andhra Pradesh',NULL,NULL,'India',NULL,NULL,'STAT'),(15,'Bihar','Bihar',NULL,NULL,'India',NULL,NULL,'STAT'),(16,'Punjab','Punjab',NULL,NULL,'India',NULL,NULL,'STAT'),(17,'Jharkhand','Jharkhand',NULL,NULL,'India',NULL,NULL,'STAT'),(18,'Haryana','Haryana',NULL,NULL,'India',NULL,NULL,'STAT'),(19,'Jammu and Kashmir','Jammu and Kashmir',NULL,NULL,'India',NULL,NULL,'STAT'),(20,'Uttar Pradesh','Uttar Pradesh',NULL,NULL,'India',NULL,NULL,'STAT'),(21,'Chhattisgarh','Chhattisgarh',NULL,NULL,'India',NULL,NULL,'STAT'),(22,'Chandigarh','Chandigarh',NULL,NULL,'India',NULL,NULL,'STAT'),(23,'Assam','Assam',NULL,NULL,'India',NULL,NULL,'STAT'),(24,'Odisha','Odisha',NULL,NULL,'India',NULL,NULL,'STAT'),(25,'Kerala','Kerala',NULL,NULL,'India',NULL,NULL,'STAT'),(26,'Uttarakhand','Uttarakhand',NULL,NULL,'India',NULL,NULL,'STAT'),(27,'Tripura','Tripura',NULL,NULL,'India',NULL,NULL,'STAT'),(28,'Puducherry','Puducherry',NULL,NULL,'India',NULL,NULL,'STAT'),(29,'Mizoram','Mizoram',NULL,NULL,'India',NULL,NULL,'STAT'),(30,'Manipur','Manipur',NULL,NULL,'India',NULL,NULL,'STAT'),(31,'Himachal Pradesh','Himachal Pradesh',NULL,NULL,'India',NULL,NULL,'STAT'),(32,'Sikkim','Sikkim',NULL,NULL,'India',NULL,NULL,'STAT'),(33,'Mumbai','Mumbai','Mumbai','Maharashtra','India',NULL,NULL,'CITY'),(35,'Delhi','Delhi','Delhi','Delhi','India',NULL,NULL,'CITY'),(36,'Bangalore','Bangalore','Bangalore','Karnataka','India',NULL,NULL,'CITY'),(37,'Hyderabad','Hyderabad','Hyderabad','Telangana','India',NULL,NULL,'CITY'),(38,'Ahmedabad','Ahmedabad','Ahmedabad','Gujarat','India',NULL,NULL,'CITY'),(39,'Chennai','Chennai','Chennai','Tamil Nadu','India',NULL,NULL,'CITY'),(40,'Kolkata','Kolkata','Kolkata','West Bengal','India',NULL,NULL,'CITY'),(41,'Surat','Surat','Surat','Gujarat','India',NULL,NULL,'CITY'),(42,'Pune','Pune','Pune','Maharashtra','India',NULL,NULL,'CITY'),(43,'Jaipur','Jaipur','Jaipur','Rajasthan','India',NULL,NULL,'CITY'),(44,'Lucknow','Lucknow','Lucknow','Uttar Pradesh','India',NULL,NULL,'CITY'),(45,'Kanpur','Kanpur','Kanpur','Uttar Pradesh','India',NULL,NULL,'CITY'),(46,'Nagpur','Nagpur','Nagpur','Maharashtra','India',NULL,NULL,'CITY'),(47,'Indore','Indore','Indore','Madhya Pradesh','India',NULL,NULL,'CITY'),(48,'Thane','Thane','Thane','Maharashtra','India',NULL,NULL,'CITY'),(49,'Bhopal','Bhopal','Bhopal','Madhya Pradesh','India',NULL,NULL,'CITY'),(50,'Visakhapatnam','Visakhapatnam','Visakhapatnam','Andhra Pradesh','India',NULL,NULL,'CITY'),(51,'Pimpri-Chinchwad','Pimpri-Chinchwad','Pimpri-Chinchwad','Maharashtra','India',NULL,NULL,'CITY'),(52,'Patna','Patna','Patna','Bihar','India',NULL,NULL,'CITY'),(53,'Vadodara','Vadodara','Vadodara','Gujarat','India',NULL,NULL,'CITY'),(54,'Ghaziabad','Ghaziabad','Ghaziabad','Uttar Pradesh','India',NULL,NULL,'CITY'),(55,'Ludhiana','Ludhiana','Ludhiana','Punjab','India',NULL,NULL,'CITY'),(56,'Agra','Agra','Agra','Uttar Pradesh','India',NULL,NULL,'CITY'),(57,'Nashik','Nashik','Nashik','Maharashtra','India',NULL,NULL,'CITY'),(58,'Ranchi','Ranchi','Ranchi','Jharkhand','India',NULL,NULL,'CITY'),(59,'Faridabad','Faridabad','Faridabad','Haryana','India',NULL,NULL,'CITY'),(60,'Meerut','Meerut','Meerut','Uttar Pradesh','India',NULL,NULL,'CITY'),(61,'Rajkot','Rajkot','Rajkot','Gujarat','India',NULL,NULL,'CITY'),(62,'Kalyan-Dombivli','Kalyan-Dombivli','Kalyan-Dombivli','Maharashtra','India',NULL,NULL,'CITY'),(63,'Vasai-Virar','Vasai-Virar','Vasai-Virar','Maharashtra','India',NULL,NULL,'CITY'),(64,'Varanasi','Varanasi','Varanasi','Uttar Pradesh','India',NULL,NULL,'CITY'),(65,'Srinagar','Srinagar','Srinagar','Jammu and Kashmir','India',NULL,NULL,'CITY'),(66,'Aurangabad','Aurangabad','Aurangabad','Maharashtra','India',NULL,NULL,'CITY'),(67,'Dhanbad','Dhanbad','Dhanbad','Jharkhand','India',NULL,NULL,'CITY'),(68,'Amritsar','Amritsar','Amritsar','Punjab','India',NULL,NULL,'CITY'),(69,'Navi Mumbai','Navi Mumbai','Navi Mumbai','Maharashtra','India',NULL,NULL,'CITY'),(70,'Allahabad','Allahabad','Allahabad','Uttar Pradesh[5]','India',NULL,NULL,'CITY'),(71,'Howrah','Howrah','Howrah','West Bengal','India',NULL,NULL,'CITY'),(72,'Gwalior','Gwalior','Gwalior','Madhya Pradesh','India',NULL,NULL,'CITY'),(73,'Jabalpur','Jabalpur','Jabalpur','Madhya Pradesh','India',NULL,NULL,'CITY'),(74,'Coimbatore','Coimbatore','Coimbatore','Tamil Nadu','India',NULL,NULL,'CITY'),(75,'Vijayawada','Vijayawada','Vijayawada','Andhra Pradesh','India',NULL,NULL,'CITY'),(76,'Jodhpur','Jodhpur','Jodhpur','Rajasthan','India',NULL,NULL,'CITY'),(77,'Madurai','Madurai','Madurai','Tamil Nadu','India',NULL,NULL,'CITY'),(78,'Raipur','Raipur','Raipur','Chhattisgarh','India',NULL,NULL,'CITY'),(79,'Chandigarh','Chandigarh','Chandigarh','Chandigarh','India',NULL,NULL,'CITY'),(80,'Guwahati','Guwahati','Guwahati','Assam','India',NULL,NULL,'CITY'),(81,'Solapur','Solapur','Solapur','Maharashtra','India',NULL,NULL,'CITY'),(82,'Hubli–Dharwad','Hubli–Dharwad','Hubli–Dharwad','Karnataka','India',NULL,NULL,'CITY'),(83,'Mysore','Mysore','Mysore','Karnataka','India',NULL,NULL,'CITY'),(84,'Tiruchirappalli','Tiruchirappalli','Tiruchirappalli','Tamil Nadu','India',NULL,NULL,'CITY'),(85,'Bareilly','Bareilly','Bareilly','Uttar Pradesh','India',NULL,NULL,'CITY'),(86,'Aligarh','Aligarh','Aligarh','Uttar Pradesh','India',NULL,NULL,'CITY'),(87,'Tiruppur','Tiruppur','Tiruppur','Tamil Nadu','India',NULL,NULL,'CITY'),(88,'Moradabad','Moradabad','Moradabad','Uttar Pradesh','India',NULL,NULL,'CITY'),(89,'Jalandhar','Jalandhar','Jalandhar','Punjab','India',NULL,NULL,'CITY'),(90,'Bhubaneswar','Bhubaneswar','Bhubaneswar','Odisha','India',NULL,NULL,'CITY'),(91,'Salem','Salem','Salem','Tamil Nadu','India',NULL,NULL,'CITY'),(92,'Warangal','Warangal','Warangal','Telangana','India',NULL,NULL,'CITY'),(93,'Mira-Bhayandar','Mira-Bhayandar','Mira-Bhayandar','Maharashtra','India',NULL,NULL,'CITY'),(94,'Jalgaon','Jalgaon','Jalgaon','Maharashtra','India',NULL,NULL,'CITY'),(95,'Kota','Kota','Kota','Rajasthan','India',NULL,NULL,'CITY'),(96,'Guntur','Guntur','Guntur','Andhra Pradesh','India',NULL,NULL,'CITY'),(97,'Bhiwandi','Bhiwandi','Bhiwandi','Maharashtra','India',NULL,NULL,'CITY'),(98,'Saharanpur','Saharanpur','Saharanpur','Uttar Pradesh','India',NULL,NULL,'CITY'),(99,'Gorakhpur','Gorakhpur','Gorakhpur','Uttar Pradesh','India',NULL,NULL,'CITY'),(100,'Bikaner','Bikaner','Bikaner','Rajasthan','India',NULL,NULL,'CITY'),(101,'Amravati','Amravati','Amravati','Maharashtra','India',NULL,NULL,'CITY'),(102,'Jamshedpur','Jamshedpur','Jamshedpur','Jharkhand','India',NULL,NULL,'CITY'),(103,'Bhilai','Bhilai','Bhilai','Chhattisgarh','India',NULL,NULL,'CITY'),(104,'Cuttack','Cuttack','Cuttack','Odisha','India',NULL,NULL,'CITY'),(105,'Firozabad','Firozabad','Firozabad','Uttar Pradesh','India',NULL,NULL,'CITY'),(106,'Kochi','Kochi','Kochi','Kerala','India',NULL,NULL,'CITY'),(107,'Nellore','Nellore','Nellore','Andhra Pradesh','India',NULL,NULL,'CITY'),(108,'Bhavnagar','Bhavnagar','Bhavnagar','Gujarat','India',NULL,NULL,'CITY'),(109,'Dehradun','Dehradun','Dehradun','Uttarakhand','India',NULL,NULL,'CITY'),(110,'Durgapur','Durgapur','Durgapur','West Bengal','India',NULL,NULL,'CITY'),(111,'Asansol','Asansol','Asansol','West Bengal','India',NULL,NULL,'CITY'),(112,'Rourkela','Rourkela','Rourkela','Odisha','India',NULL,NULL,'CITY'),(113,'Nanded','Nanded','Nanded','Maharashtra','India',NULL,NULL,'CITY'),(114,'Kolhapur','Kolhapur','Kolhapur','Maharashtra','India',NULL,NULL,'CITY'),(115,'Ajmer','Ajmer','Ajmer','Rajasthan','India',NULL,NULL,'CITY'),(116,'Akola','Akola','Akola','Maharashtra','India',NULL,NULL,'CITY'),(117,'Gulbarga','Gulbarga','Gulbarga','Karnataka','India',NULL,NULL,'CITY'),(118,'Jamnagar','Jamnagar','Jamnagar','Gujarat','India',NULL,NULL,'CITY'),(119,'Ujjain','Ujjain','Ujjain','Madhya Pradesh','India',NULL,NULL,'CITY'),(120,'Loni','Loni','Loni','Uttar Pradesh','India',NULL,NULL,'CITY'),(121,'Siliguri','Siliguri','Siliguri','West Bengal','India',NULL,NULL,'CITY'),(122,'Jhansi','Jhansi','Jhansi','Uttar Pradesh','India',NULL,NULL,'CITY'),(123,'Ulhasnagar','Ulhasnagar','Ulhasnagar','Maharashtra','India',NULL,NULL,'CITY'),(124,'Jammu','Jammu','Jammu','Jammu and Kashmir','India',NULL,NULL,'CITY'),(125,'Sangli-Miraj & Kupwad','Sangli-Miraj & Kupwad','Sangli-Miraj & Kupwad','Maharashtra','India',NULL,NULL,'CITY'),(126,'Mangalore','Mangalore','Mangalore','Karnataka','India',NULL,NULL,'CITY'),(127,'Erode','Erode','Erode','Tamil Nadu','India',NULL,NULL,'CITY'),(128,'Belgaum','Belgaum','Belgaum','Karnataka','India',NULL,NULL,'CITY'),(129,'Ambattur','Ambattur','Ambattur','Tamil Nadu','India',NULL,NULL,'CITY'),(130,'Tirunelveli','Tirunelveli','Tirunelveli','Tamil Nadu','India',NULL,NULL,'CITY'),(131,'Malegaon','Malegaon','Malegaon','Maharashtra','India',NULL,NULL,'CITY'),(132,'Gaya','Gaya','Gaya','Bihar','India',NULL,NULL,'CITY'),(133,'Thiruvananthapuram','Thiruvananthapuram','Thiruvananthapuram','Kerala','India',NULL,NULL,'CITY'),(134,'Udaipur','Udaipur','Udaipur','Rajasthan','India',NULL,NULL,'CITY'),(135,'Kakinada','Kakinada','Kakinada','Andhra Pradesh','India',NULL,NULL,'CITY'),(136,'Davanagere','Davanagere','Davanagere','Karnataka','India',NULL,NULL,'CITY'),(137,'Kozhikode','Kozhikode','Kozhikode','Kerala','India',NULL,NULL,'CITY'),(138,'Maheshtala','Maheshtala','Maheshtala','West Bengal','India',NULL,NULL,'CITY'),(139,'Rajpur Sonarpur','Rajpur Sonarpur','Rajpur Sonarpur','West Bengal','India',NULL,NULL,'CITY'),(140,'Rajahmundry','Rajahmundry','Rajahmundry','Andhra Pradesh','India',NULL,NULL,'CITY'),(141,'Bokaro','Bokaro','Bokaro','Jharkhand','India',NULL,NULL,'CITY'),(142,'South Dumdum','South Dumdum','South Dumdum','West Bengal','India',NULL,NULL,'CITY'),(143,'Bellary','Bellary','Bellary','Karnataka','India',NULL,NULL,'CITY'),(144,'Patiala','Patiala','Patiala','Punjab','India',NULL,NULL,'CITY'),(145,'Gopalpur','Gopalpur','Gopalpur','West Bengal','India',NULL,NULL,'CITY'),(146,'Agartala','Agartala','Agartala','Tripura','India',NULL,NULL,'CITY'),(147,'Bhagalpur','Bhagalpur','Bhagalpur','Bihar','India',NULL,NULL,'CITY'),(148,'Muzaffarnagar','Muzaffarnagar','Muzaffarnagar','Uttar Pradesh','India',NULL,NULL,'CITY'),(149,'Bhatpara','Bhatpara','Bhatpara','West Bengal','India',NULL,NULL,'CITY'),(150,'Panihati','Panihati','Panihati','West Bengal','India',NULL,NULL,'CITY'),(151,'Latur','Latur','Latur','Maharashtra','India',NULL,NULL,'CITY'),(152,'Dhule','Dhule','Dhule','Maharashtra','India',NULL,NULL,'CITY'),(153,'Tirupati','Tirupati','Tirupati','Andhra Pradesh','India',NULL,NULL,'CITY'),(154,'Rohtak','Rohtak','Rohtak','Haryana','India',NULL,NULL,'CITY'),(155,'Sagar','Sagar','Sagar','Madhya Pradesh','India',NULL,NULL,'CITY'),(156,'Korba','Korba','Korba','Chhattisgarh','India',NULL,NULL,'CITY'),(157,'Bhilwara','Bhilwara','Bhilwara','Rajasthan','India',NULL,NULL,'CITY'),(158,'Berhampur','Berhampur','Berhampur','Odisha','India',NULL,NULL,'CITY'),(159,'Muzaffarpur','Muzaffarpur','Muzaffarpur','Bihar','India',NULL,NULL,'CITY'),(160,'Ahmednagar','Ahmednagar','Ahmednagar','Maharashtra','India',NULL,NULL,'CITY'),(161,'Mathura','Mathura','Mathura','Uttar Pradesh','India',NULL,NULL,'CITY'),(162,'Kollam','Kollam','Kollam','Kerala','India',NULL,NULL,'CITY'),(163,'Avadi','Avadi','Avadi','Tamil Nadu','India',NULL,NULL,'CITY'),(164,'Kadapa','Kadapa','Kadapa','Andhra Pradesh','India',NULL,NULL,'CITY'),(165,'Kamarhati','Kamarhati','Kamarhati','West Bengal','India',NULL,NULL,'CITY'),(166,'Sambalpur','Sambalpur','Sambalpur','Odisha','India',NULL,NULL,'CITY'),(167,'Bilaspur','Bilaspur','Bilaspur','Chhattisgarh','India',NULL,NULL,'CITY'),(168,'Shahjahanpur','Shahjahanpur','Shahjahanpur','Uttar Pradesh','India',NULL,NULL,'CITY'),(169,'Satara','Satara','Satara','Maharashtra','India',NULL,NULL,'CITY'),(170,'Bijapur','Bijapur','Bijapur','Karnataka','India',NULL,NULL,'CITY'),(171,'Kurnool','Kurnool','Kurnool','Andhra Pradesh','India',NULL,NULL,'CITY'),(172,'Rampur','Rampur','Rampur','Uttar Pradesh','India',NULL,NULL,'CITY'),(173,'Shimoga','Shimoga','Shimoga','Karnataka','India',NULL,NULL,'CITY'),(174,'Chandrapur','Chandrapur','Chandrapur','Maharashtra','India',NULL,NULL,'CITY'),(175,'Junagadh','Junagadh','Junagadh','Gujarat','India',NULL,NULL,'CITY'),(176,'Thrissur','Thrissur','Thrissur','Kerala','India',NULL,NULL,'CITY'),(177,'Alwar','Alwar','Alwar','Rajasthan','India',NULL,NULL,'CITY'),(178,'Bardhaman','Bardhaman','Bardhaman','West Bengal','India',NULL,NULL,'CITY'),(179,'Kulti','Kulti','Kulti','West Bengal','India',NULL,NULL,'CITY'),(180,'Nizamabad','Nizamabad','Nizamabad','Telangana','India',NULL,NULL,'CITY'),(181,'Parbhani','Parbhani','Parbhani','Maharashtra','India',NULL,NULL,'CITY'),(182,'Tumkur','Tumkur','Tumkur','Karnataka','India',NULL,NULL,'CITY'),(183,'Khammam','Khammam','Khammam','Telangana','India',NULL,NULL,'CITY'),(184,'Ozhukarai','Ozhukarai','Ozhukarai','Puducherry','India',NULL,NULL,'CITY'),(185,'Bihar Sharif','Bihar Sharif','Bihar Sharif','Bihar','India',NULL,NULL,'CITY'),(186,'Panipat','Panipat','Panipat','Haryana','India',NULL,NULL,'CITY'),(187,'Darbhanga','Darbhanga','Darbhanga','Bihar','India',NULL,NULL,'CITY'),(188,'Bally','Bally','Bally','West Bengal','India',NULL,NULL,'CITY'),(189,'Aizawl','Aizawl','Aizawl','Mizoram','India',NULL,NULL,'CITY'),(190,'Dewas','Dewas','Dewas','Madhya Pradesh','India',NULL,NULL,'CITY'),(191,'Ichalkaranji','Ichalkaranji','Ichalkaranji','Maharashtra','India',NULL,NULL,'CITY'),(192,'Karnal','Karnal','Karnal','Haryana','India',NULL,NULL,'CITY'),(193,'Bathinda','Bathinda','Bathinda','Punjab','India',NULL,NULL,'CITY'),(194,'Jalna','Jalna','Jalna','Maharashtra','India',NULL,NULL,'CITY'),(195,'Eluru','Eluru','Eluru','Andhra Pradesh','India',NULL,NULL,'CITY'),(196,'Barasat','Barasat','Barasat','West Bengal','India',NULL,NULL,'CITY'),(197,'Kirari Suleman Nagar','Kirari Suleman Nagar','Kirari Suleman Nagar','Delhi','India',NULL,NULL,'CITY'),(198,'Purnia','Purnia','Purnia','Bihar','India',NULL,NULL,'CITY'),(199,'Satna','Satna','Satna','Madhya Pradesh','India',NULL,NULL,'CITY'),(200,'Mau','Mau','Mau','Uttar Pradesh','India',NULL,NULL,'CITY'),(201,'Sonipat','Sonipat','Sonipat','Haryana','India',NULL,NULL,'CITY'),(202,'Farrukhabad','Farrukhabad','Farrukhabad','Uttar Pradesh','India',NULL,NULL,'CITY'),(203,'Durg','Durg','Durg','Chhattisgarh','India',NULL,NULL,'CITY'),(204,'Imphal','Imphal','Imphal','Manipur','India',NULL,NULL,'CITY'),(205,'Ratlam','Ratlam','Ratlam','Madhya Pradesh','India',NULL,NULL,'CITY'),(206,'Hapur','Hapur','Hapur','Uttar Pradesh','India',NULL,NULL,'CITY'),(207,'Arrah','Arrah','Arrah','Bihar','India',NULL,NULL,'CITY'),(208,'Anantapur','Anantapur','Anantapur','Andhra Pradesh','India',NULL,NULL,'CITY'),(209,'Karimnagar','Karimnagar','Karimnagar','Telangana','India',NULL,NULL,'CITY'),(210,'Etawah','Etawah','Etawah','Uttar Pradesh','India',NULL,NULL,'CITY'),(211,'Ambarnath','Ambarnath','Ambarnath','Maharashtra','India',NULL,NULL,'CITY'),(212,'North Dumdum','North Dumdum','North Dumdum','West Bengal','India',NULL,NULL,'CITY'),(213,'Bharatpur','Bharatpur','Bharatpur','Rajasthan','India',NULL,NULL,'CITY'),(214,'Begusarai','Begusarai','Begusarai','Bihar','India',NULL,NULL,'CITY'),(215,'New Delhi','New Delhi','New Delhi','Delhi','India',NULL,NULL,'CITY'),(216,'Gandhidham','Gandhidham','Gandhidham','Gujarat','India',NULL,NULL,'CITY'),(217,'Baranagar','Baranagar','Baranagar','West Bengal','India',NULL,NULL,'CITY'),(218,'Tiruvottiyur','Tiruvottiyur','Tiruvottiyur','Tamil Nadu','India',NULL,NULL,'CITY'),(219,'Pondicherry','Pondicherry','Pondicherry','Puducherry','India',NULL,NULL,'CITY'),(220,'Sikar','Sikar','Sikar','Rajasthan','India',NULL,NULL,'CITY'),(221,'Thoothukudi','Thoothukudi','Thoothukudi','Tamil Nadu','India',NULL,NULL,'CITY'),(222,'Rewa','Rewa','Rewa','Madhya Pradesh','India',NULL,NULL,'CITY'),(223,'Mirzapur','Mirzapur','Mirzapur','Uttar Pradesh','India',NULL,NULL,'CITY'),(224,'Raichur','Raichur','Raichur','Karnataka','India',NULL,NULL,'CITY'),(225,'Pali','Pali','Pali','Rajasthan','India',NULL,NULL,'CITY'),(226,'Ramagundam','Ramagundam','Ramagundam','Telangana','India',NULL,NULL,'CITY'),(227,'Silchar','Silchar','Silchar','Assam','India',NULL,NULL,'CITY'),(228,'Haridwar','Haridwar','Haridwar','Uttarakhand','India',NULL,NULL,'CITY'),(229,'Vijayanagaram','Vijayanagaram','Vijayanagaram','Andhra Pradesh','India',NULL,NULL,'CITY'),(230,'Tenali','Tenali','Tenali','Andhra Pradesh','India',NULL,NULL,'CITY'),(231,'Nagercoil','Nagercoil','Nagercoil','Tamil Nadu','India',NULL,NULL,'CITY'),(232,'Sri Ganganagar','Sri Ganganagar','Sri Ganganagar','Rajasthan','India',NULL,NULL,'CITY'),(233,'Karawal Nagar','Karawal Nagar','Karawal Nagar','Delhi','India',NULL,NULL,'CITY'),(234,'Mango','Mango','Mango','Jharkhand','India',NULL,NULL,'CITY'),(235,'Thanjavur','Thanjavur','Thanjavur','Tamil Nadu','India',NULL,NULL,'CITY'),(236,'Bulandshahr','Bulandshahr','Bulandshahr','Uttar Pradesh','India',NULL,NULL,'CITY'),(237,'Uluberia','Uluberia','Uluberia','West Bengal','India',NULL,NULL,'CITY'),(238,'Katni','Katni','Katni','Madhya Pradesh','India',NULL,NULL,'CITY'),(239,'Sambhal','Sambhal','Sambhal','Uttar Pradesh','India',NULL,NULL,'CITY'),(240,'Singrauli','Singrauli','Singrauli','Madhya Pradesh','India',NULL,NULL,'CITY'),(241,'Nadiad','Nadiad','Nadiad','Gujarat','India',NULL,NULL,'CITY'),(242,'Secunderabad','Secunderabad','Secunderabad','Telangana','India',NULL,NULL,'CITY'),(243,'Naihati','Naihati','Naihati','West Bengal','India',NULL,NULL,'CITY'),(244,'Yamunanagar','Yamunanagar','Yamunanagar','Haryana','India',NULL,NULL,'CITY'),(245,'Bidhannagar','Bidhannagar','Bidhannagar','West Bengal','India',NULL,NULL,'CITY'),(246,'Pallavaram','Pallavaram','Pallavaram','Tamil Nadu','India',NULL,NULL,'CITY'),(247,'Bidar','Bidar','Bidar','Karnataka','India',NULL,NULL,'CITY'),(248,'Munger','Munger','Munger','Bihar','India',NULL,NULL,'CITY'),(249,'Panchkula','Panchkula','Panchkula','Haryana','India',NULL,NULL,'CITY'),(250,'Burhanpur','Burhanpur','Burhanpur','Madhya Pradesh','India',NULL,NULL,'CITY'),(251,'Raurkela Industrial Township','Raurkela Industrial Township','Raurkela Industrial Township','Odisha','India',NULL,NULL,'CITY'),(252,'Kharagpur','Kharagpur','Kharagpur','West Bengal','India',NULL,NULL,'CITY'),(253,'Dindigul','Dindigul','Dindigul','Tamil Nadu','India',NULL,NULL,'CITY'),(254,'Gandhinagar','Gandhinagar','Gandhinagar','Gujarat','India',NULL,NULL,'CITY'),(255,'Hospet','Hospet','Hospet','Karnataka','India',NULL,NULL,'CITY'),(256,'Nangloi Jat','Nangloi Jat','Nangloi Jat','Delhi','India',NULL,NULL,'CITY'),(257,'Malda','Malda','Malda','West Bengal','India',NULL,NULL,'CITY'),(258,'Ongole','Ongole','Ongole','Andhra Pradesh','India',NULL,NULL,'CITY'),(259,'Deoghar','Deoghar','Deoghar','Jharkhand','India',NULL,NULL,'CITY'),(260,'Chapra','Chapra','Chapra','Bihar','India',NULL,NULL,'CITY'),(261,'Haldia','Haldia','Haldia','West Bengal','India',NULL,NULL,'CITY'),(262,'Khandwa','Khandwa','Khandwa','Madhya Pradesh','India',NULL,NULL,'CITY'),(263,'Nandyal','Nandyal','Nandyal','Andhra Pradesh','India',NULL,NULL,'CITY'),(264,'Morena','Morena','Morena','Madhya Pradesh','India',NULL,NULL,'CITY'),(265,'Amroha','Amroha','Amroha','Uttar Pradesh','India',NULL,NULL,'CITY'),(266,'Anand','Anand','Anand','Gujarat','India',NULL,NULL,'CITY'),(267,'Bhind','Bhind','Bhind','Madhya Pradesh','India',NULL,NULL,'CITY'),(268,'Bhalswa Jahangir Pur','Bhalswa Jahangir Pur','Bhalswa Jahangir Pur','Delhi','India',NULL,NULL,'CITY'),(269,'Madhyamgram','Madhyamgram','Madhyamgram','West Bengal','India',NULL,NULL,'CITY'),(270,'Bhiwani','Bhiwani','Bhiwani','Haryana','India',NULL,NULL,'CITY'),(271,'Berhampore','Berhampore','Berhampore','West Bengal','India',NULL,NULL,'CITY'),(272,'Ambala','Ambala','Ambala','Haryana','India',NULL,NULL,'CITY'),(273,'Morbi','Morbi','Morbi','Gujarat','India',NULL,NULL,'CITY'),(274,'Fatehpur','Fatehpur','Fatehpur','Uttar Pradesh','India',NULL,NULL,'CITY'),(275,'Raebareli','Raebareli','Raebareli','Uttar Pradesh','India',NULL,NULL,'CITY'),(276,'Khora, Ghaziabad','Khora, Ghaziabad','Khora, Ghaziabad','Uttar Pradesh','India',NULL,NULL,'CITY'),(277,'Chittoor','Chittoor','Chittoor','Andhra Pradesh','India',NULL,NULL,'CITY'),(278,'Bhusawal','Bhusawal','Bhusawal','Maharashtra','India',NULL,NULL,'CITY'),(279,'Orai','Orai','Orai','Uttar Pradesh','India',NULL,NULL,'CITY'),(280,'Bahraich','Bahraich','Bahraich','Uttar Pradesh','India',NULL,NULL,'CITY'),(281,'Phusro','Phusro','Phusro','Jharkhand','India',NULL,NULL,'CITY'),(282,'Vellore','Vellore','Vellore','Tamil Nadu','India',NULL,NULL,'CITY'),(283,'Mehsana','Mehsana','Mehsana','Gujarat','India',NULL,NULL,'CITY'),(284,'Raiganj','Raiganj','Raiganj','West Bengal','India',NULL,NULL,'CITY'),(285,'Sirsa','Sirsa','Sirsa','Haryana','India',NULL,NULL,'CITY'),(286,'Danapur','Danapur','Danapur','Bihar','India',NULL,NULL,'CITY'),(287,'Serampore','Serampore','Serampore','West Bengal','India',NULL,NULL,'CITY'),(288,'Sultan Pur Majra','Sultan Pur Majra','Sultan Pur Majra','Delhi','India',NULL,NULL,'CITY'),(289,'Guna','Guna','Guna','Madhya Pradesh','India',NULL,NULL,'CITY'),(290,'Jaunpur','Jaunpur','Jaunpur','Uttar Pradesh','India',NULL,NULL,'CITY'),(291,'Panvel','Panvel','Panvel','Maharashtra','India',NULL,NULL,'CITY'),(292,'Shivpuri','Shivpuri','Shivpuri','Madhya Pradesh','India',NULL,NULL,'CITY'),(293,'Surendranagar Dudhrej','Surendranagar Dudhrej','Surendranagar Dudhrej','Gujarat','India',NULL,NULL,'CITY'),(294,'Unnao','Unnao','Unnao','Uttar Pradesh','India',NULL,NULL,'CITY'),(295,'Chinsurah','Chinsurah','Chinsurah','West Bengal','India',NULL,NULL,'CITY'),(296,'Alappuzha','Alappuzha','Alappuzha','Kerala','India',NULL,NULL,'CITY'),(297,'Kottayam','Kottayam','Kottayam','Kerala','India',NULL,NULL,'CITY'),(298,'Machilipatnam','Machilipatnam','Machilipatnam','Andhra Pradesh','India',NULL,NULL,'CITY'),(299,'Shimla','Shimla','Shimla','Himachal Pradesh','India',NULL,NULL,'CITY'),(300,'Adoni','Adoni','Adoni','Andhra Pradesh','India',NULL,NULL,'CITY'),(301,'Udupi','Udupi','Udupi','Karnataka','India',NULL,NULL,'CITY'),(302,'Katihar','Katihar','Katihar','Bihar','India',NULL,NULL,'CITY'),(303,'Proddatur','Proddatur','Proddatur','Andhra Pradesh','India',NULL,NULL,'CITY'),(304,'Mahbubnagar','Mahbubnagar','Mahbubnagar','Telangana','India',NULL,NULL,'CITY'),(305,'Saharsa','Saharsa','Saharsa','Bihar','India',NULL,NULL,'CITY'),(306,'Dibrugarh','Dibrugarh','Dibrugarh','Assam','India',NULL,NULL,'CITY'),(307,'Jorhat','Jorhat','Jorhat','Assam','India',NULL,NULL,'CITY'),(308,'Hazaribagh','Hazaribagh','Hazaribagh','Jharkhand','India',NULL,NULL,'CITY'),(309,'Hindupur','Hindupur','Hindupur','Andhra Pradesh','India',NULL,NULL,'CITY'),(310,'Nagaon','Nagaon','Nagaon','Assam','India',NULL,NULL,'CITY'),(311,'Sasaram','Sasaram','Sasaram','Bihar','India',NULL,NULL,'CITY'),(312,'Hajipur','Hajipur','Hajipur','Bihar','India',NULL,NULL,'CITY'),(313,'Giridih','Giridih','Giridih','Jharkhand','India',NULL,NULL,'CITY'),(314,'Bhimavaram','Bhimavaram','Bhimavaram','Andhra Pradesh','India',NULL,NULL,'CITY'),(315,'Kumbakonam','Kumbakonam','Kumbakonam','Tamil Nadu','India',NULL,NULL,'CITY'),(316,'Bongaigaon','Bongaigaon','Bongaigaon','Assam','India',NULL,NULL,'CITY'),(317,'Dehri','Dehri','Dehri','Bihar','India',NULL,NULL,'CITY'),(318,'Madanapalle','Madanapalle','Madanapalle','Andhra Pradesh','India',NULL,NULL,'CITY'),(319,'Siwan','Siwan','Siwan','Bihar','India',NULL,NULL,'CITY'),(320,'Bettiah','Bettiah','Bettiah','Bihar','India',NULL,NULL,'CITY'),(321,'Ramgarh','Ramgarh','Ramgarh','Jharkhand','India',NULL,NULL,'CITY'),(322,'Tinsukia','Tinsukia','Tinsukia','Assam','India',NULL,NULL,'CITY'),(323,'Guntakal','Guntakal','Guntakal','Andhra Pradesh','India',NULL,NULL,'CITY'),(324,'Srikakulam','Srikakulam','Srikakulam','Andhra Pradesh','India',NULL,NULL,'CITY'),(325,'Motihari','Motihari','Motihari','Bihar','India',NULL,NULL,'CITY'),(326,'Dharmavaram','Dharmavaram','Dharmavaram','Andhra Pradesh','India',NULL,NULL,'CITY'),(327,'Medininagar','Medininagar','Medininagar','Jharkhand','India',NULL,NULL,'CITY'),(328,'Gudivada','Gudivada','Gudivada','Andhra Pradesh','India',NULL,NULL,'CITY'),(329,'Phagwara','Phagwara','Phagwara','Punjab','India',NULL,NULL,'CITY'),(330,'Hosur','Hosur','Hosur','Tamil Nadu','India',NULL,NULL,'CITY'),(331,'Narasaraopet','Narasaraopet','Narasaraopet','Andhra Pradesh','India',NULL,NULL,'CITY'),(332,'Suryapet','Suryapet','Suryapet','Telangana','India',NULL,NULL,'CITY'),(333,'Miryalaguda','Miryalaguda','Miryalaguda','Telangana','India',NULL,NULL,'CITY'),(334,'Tadipatri','Tadipatri','Tadipatri','Andhra Pradesh','India',NULL,NULL,'CITY'),(335,'Karaikudi','Karaikudi','Karaikudi','Tamil Nadu','India',NULL,NULL,'CITY'),(336,'Kishanganj','Kishanganj','Kishanganj','Bihar','India',NULL,NULL,'CITY'),(337,'Jamalpur','Jamalpur','Jamalpur','Bihar','India',NULL,NULL,'CITY'),(338,'Ballia','Ballia','Ballia','Uttar Pradesh','India',NULL,NULL,'CITY'),(339,'Kavali','Kavali','Kavali','Andhra Pradesh','India',NULL,NULL,'CITY'),(340,'Tadepalligudem','Tadepalligudem','Tadepalligudem','Andhra Pradesh','India',NULL,NULL,'CITY'),(341,'Amaravati','Amaravati','Amaravati','Andhra Pradesh','India',NULL,NULL,'CITY'),(342,'Buxar','Buxar','Buxar','Bihar','India',NULL,NULL,'CITY'),(343,'Tezpur','Tezpur','Tezpur','Assam','India',NULL,NULL,'CITY'),(344,'Jehanabad','Jehanabad','Jehanabad','Bihar','India',NULL,NULL,'CITY'),(345,'Aurangabad','Aurangabad','Aurangabad','Bihar','India',NULL,NULL,'CITY'),(346,'Gangtok','Gangtok','Gangtok','Sikkim','India',NULL,NULL,'CITY');
/*!40000 ALTER TABLE `jurst` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leafcategory`
--

DROP TABLE IF EXISTS `leafcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leafcategory` (
  `LeafCategoryId` int NOT NULL AUTO_INCREMENT,
  `Identifier` varchar(245) NOT NULL,
  `Name` varchar(245) DEFAULT NULL,
  `Description` varchar(1045) DEFAULT NULL,
  `Field1` varchar(745) DEFAULT NULL,
  `Field2` varchar(745) DEFAULT NULL,
  `TopCategoryId` int NOT NULL,
  `Status` varchar(20) NOT NULL,
  `ParentCategoryId` int DEFAULT NULL,
  PRIMARY KEY (`LeafCategoryId`),
  UNIQUE KEY `LeafCategoryId_UNIQUE` (`LeafCategoryId`),
  KEY `TopCategoryId_idx` (`TopCategoryId`),
  CONSTRAINT `TopCategoryId` FOREIGN KEY (`TopCategoryId`) REFERENCES `topcategory` (`TopCategoryId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leafcategory`
--

LOCK TABLES `leafcategory` WRITE;
/*!40000 ALTER TABLE `leafcategory` DISABLE KEYS */;
INSERT INTO `leafcategory` VALUES (3,'MBM001','Mesh Back',NULL,NULL,NULL,1,'1',NULL),(4,'MBM002','Yuva',NULL,NULL,NULL,1,'1',3),(5,'MBM202121','test','SDadsads',NULL,NULL,2,'1',3),(6,'MBM01021','Test','Test',NULL,NULL,1,'1',5),(7,'','','',NULL,NULL,3,'1',1);
/*!40000 ALTER TABLE `leafcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `notification_content` varchar(255) DEFAULT NULL,
  `CREATEDATE` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (81,3,10005,'You passed permissible payment due date, kindly payback!','2021-04-13 18:53:30'),(82,3,10009,'You passed permissible payment due date, kindly payback!','2021-04-13 18:53:30'),(83,4,10108,'You passed permissible payment due date, kindly payback!','2021-04-13 18:53:30'),(84,3,10005,'You passed permissible payment due date, kindly payback!','2021-04-13 18:54:30'),(85,3,10009,'You passed permissible payment due date, kindly payback!','2021-04-13 18:54:30'),(86,4,10108,'You passed permissible payment due date, kindly payback!','2021-04-13 18:54:30'),(87,3,10005,'You passed permissible payment due date, kindly payback!','2021-04-13 18:55:30'),(88,3,10009,'You passed permissible payment due date, kindly payback!','2021-04-13 18:55:30'),(89,4,10108,'You passed permissible payment due date, kindly payback!','2021-04-13 18:55:30'),(90,3,10005,'You passed permissible payment due date, kindly payback!','2021-04-13 18:56:30'),(91,3,10009,'You passed permissible payment due date, kindly payback!','2021-04-13 18:56:30'),(92,4,10108,'You passed permissible payment due date, kindly payback!','2021-04-13 18:56:30'),(93,3,10005,'You passed permissible payment due date, kindly payback!','2021-04-13 18:57:30'),(94,3,10009,'You passed permissible payment due date, kindly payback!','2021-04-13 18:57:30'),(95,4,10108,'You passed permissible payment due date, kindly payback!','2021-04-13 18:57:30'),(96,3,10005,'You passed permissible payment due date, kindly payback!','2021-04-13 18:58:30'),(97,3,10009,'You passed permissible payment due date, kindly payback!','2021-04-13 18:58:30'),(98,4,10108,'You passed permissible payment due date, kindly payback!','2021-04-13 18:58:30'),(99,3,10005,'You passed permissible payment due date, kindly payback!','2021-04-13 18:59:30'),(100,3,10009,'You passed permissible payment due date, kindly payback!','2021-04-13 18:59:30'),(101,4,10108,'You passed permissible payment due date, kindly payback!','2021-04-13 18:59:30'),(102,3,10005,'You passed permissible payment due date, kindly payback!','2021-04-13 19:00:30'),(103,3,10009,'You passed permissible payment due date, kindly payback!','2021-04-13 19:00:30'),(104,4,10108,'You passed permissible payment due date, kindly payback!','2021-04-13 19:00:30'),(105,3,10005,'You passed permissible payment due date, kindly payback!','2021-04-13 19:01:31'),(106,3,10009,'You passed permissible payment due date, kindly payback!','2021-04-13 19:01:31'),(107,4,10108,'You passed permissible payment due date, kindly payback!','2021-04-13 19:01:31'),(108,3,10005,'You passed permissible payment due date, kindly payback!','2021-04-13 19:02:30'),(109,3,10009,'You passed permissible payment due date, kindly payback!','2021-04-13 19:02:30'),(110,4,10108,'You passed permissible payment due date, kindly payback!','2021-04-13 19:02:30'),(111,3,10005,'You passed permissible payment due date, kindly payback!','2021-04-13 19:03:30'),(112,3,10009,'You passed permissible payment due date, kindly payback!','2021-04-13 19:03:30'),(113,4,10108,'You passed permissible payment due date, kindly payback!','2021-04-13 19:03:30'),(114,3,10005,'You passed permissible payment due date, kindly payback!','2021-04-13 19:04:30'),(115,3,10009,'You passed permissible payment due date, kindly payback!','2021-04-13 19:04:30'),(116,4,10108,'You passed permissible payment due date, kindly payback!','2021-04-13 19:04:30'),(117,3,10005,'You passed permissible payment due date, kindly payback!','2021-04-13 19:05:30'),(118,3,10009,'You passed permissible payment due date, kindly payback!','2021-04-13 19:05:30'),(119,4,10108,'You passed permissible payment due date, kindly payback!','2021-04-13 19:05:30'),(120,3,10005,'You passed permissible payment due date, kindly payback!','2021-04-13 19:06:30'),(121,3,10009,'You passed permissible payment due date, kindly payback!','2021-04-13 19:06:30'),(122,4,10108,'You passed permissible payment due date, kindly payback!','2021-04-13 19:06:30'),(123,3,10005,'You passed permissible payment due date, kindly payback!','2021-04-13 19:07:30'),(124,3,10009,'You passed permissible payment due date, kindly payback!','2021-04-13 19:07:30'),(125,4,10108,'You passed permissible payment due date, kindly payback!','2021-04-13 19:07:30'),(126,3,10005,'You passed permissible payment due date, kindly payback!','2021-04-13 19:08:30'),(127,3,10009,'You passed permissible payment due date, kindly payback!','2021-04-13 19:08:30'),(128,4,10108,'You passed permissible payment due date, kindly payback!','2021-04-13 19:08:30'),(129,3,10005,'You passed permissible payment due date, kindly payback!','2021-04-13 19:09:30'),(130,3,10009,'You passed permissible payment due date, kindly payback!','2021-04-13 19:09:30'),(131,4,10108,'You passed permissible payment due date, kindly payback!','2021-04-13 19:09:30'),(132,3,10009,'You passed permissible payment due date by 65, kindly payback!','2021-04-19 00:00:00'),(133,4,10108,'You passed permissible payment due date by 65, kindly payback!','2021-04-19 00:00:01');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitem`
--

DROP TABLE IF EXISTS `orderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitem` (
  `ORDERITEM_ID` int NOT NULL AUTO_INCREMENT,
  `ORDER_ID` int NOT NULL,
  `PRODUCT_ID` int NOT NULL,
  `ADDRESS_ID` int NOT NULL,
  `PRICE` varchar(45) DEFAULT NULL,
  `TAX` varchar(45) DEFAULT NULL,
  `DISCOUNT` varchar(45) DEFAULT NULL,
  `QUANTITY` varchar(45) DEFAULT NULL,
  `TOTAL` varchar(45) DEFAULT NULL,
  `STATUS` varchar(45) NOT NULL,
  `FIELD1` varchar(245) DEFAULT NULL,
  `FIELD2` varchar(245) DEFAULT NULL,
  `MEMBER_ID` int DEFAULT NULL,
  `MEMBER_ID_FOR` int DEFAULT NULL,
  `PSPARE_IDS` varchar(255) DEFAULT NULL,
  `PSPARE_PRICE` varchar(255) DEFAULT NULL,
  `PSPARE_TOTAL_PRICE` varchar(255) DEFAULT NULL,
  `STOTAL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ORDERITEM_ID`),
  KEY `ORDERITEM_FK1_idx` (`PRODUCT_ID`),
  KEY `ORDERITEM_FK2_idx` (`ADDRESS_ID`),
  KEY `ORDERITEM_FK3_idx` (`ORDER_ID`),
  CONSTRAINT `ORDERITEM_FK1` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `product` (`PRODUCT_ID`),
  CONSTRAINT `ORDERITEM_FK2` FOREIGN KEY (`ADDRESS_ID`) REFERENCES `address` (`ADDRESS_ID`),
  CONSTRAINT `ORDERITEM_FK3` FOREIGN KEY (`ORDER_ID`) REFERENCES `orders` (`ORDER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=255 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitem`
--

LOCK TABLES `orderitem` WRITE;
/*!40000 ALTER TABLE `orderitem` DISABLE KEYS */;
INSERT INTO `orderitem` VALUES (46,10000,1,3,'5198',NULL,NULL,'2','5198','P',NULL,NULL,3,3,'0','null','0','5198'),(47,10000,2,3,'7398',NULL,NULL,'2','7398','P',NULL,NULL,3,3,'3','3/150','150','7548'),(48,10001,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,2,4,'1','1/120','120','2719'),(49,10002,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,4,4,'0','null','0','2599'),(50,10002,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,4,4,'0','null','0','2599'),(51,10003,1,4,'23391',NULL,NULL,'9','23391','P',NULL,NULL,4,4,'0','null','0','23391'),(52,10004,1,4,'5198',NULL,NULL,'2','5198','P',NULL,NULL,4,4,'1','1/120','120','5318'),(53,10005,1,3,'5198',NULL,NULL,'2','5198','P',NULL,NULL,2,3,'2','2/130','130','5328'),(54,10006,2,4,'7398',NULL,NULL,'2','7398','P',NULL,NULL,4,4,'3','3/150','150','7548'),(55,10006,2,4,'11097',NULL,NULL,'3','11097','P',NULL,NULL,4,4,'0','null','0','11097'),(56,10007,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,2,4,'2','2/130','130','2729'),(57,10008,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,3,'0','null','0','2599'),(58,10010,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,3,'0','null','0','2599'),(59,10011,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,3,'0','null','0','2599'),(60,10012,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,3,'0','null','0','2599'),(61,10012,1,3,'5198',NULL,NULL,'2','5198','P',NULL,NULL,3,3,'0','null','0','5198'),(62,10013,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,3,'0','null','0','2599'),(63,10014,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,3,'0','null','0','2599'),(64,10015,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,3,'0','null','0','2599'),(65,10016,2,3,'3699',NULL,NULL,'1','3699','P',NULL,NULL,3,3,'0','null','0','3699'),(66,10017,1,3,'12995',NULL,NULL,'5','12995','P',NULL,NULL,3,3,'0','null','0','12995'),(67,10018,1,4,'31188',NULL,NULL,'12','31188','P',NULL,NULL,3,4,'0','null','0','31188'),(68,10020,1,4,'5198',NULL,NULL,'2','5198','P',NULL,NULL,3,4,'2','2/130','130','5328'),(69,10021,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,7,3,'1','1/120','120','2719'),(70,10021,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,7,3,'2','2/130','130','2729'),(71,10022,2,4,'7398',NULL,NULL,'2','7398','P',NULL,NULL,7,4,'3','3/150','150','7548'),(72,10023,2,4,'3699',NULL,NULL,'1','3699','P',NULL,NULL,4,4,'10','10/200','200','3899'),(73,10023,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,4,4,'1','1/120','120','2719'),(74,10024,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,7,4,'1','1/120','120','2719'),(75,10024,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,7,4,'1','1/120','120','2719'),(76,10025,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,7,3,'2','2/130','130','2729'),(77,10026,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,4,4,'1','1/120','120','2719'),(78,10027,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,7,4,'1','1/120','120','2719'),(79,10027,21,4,'1700',NULL,NULL,'1','1700','P',NULL,NULL,7,4,'0','null','0','1700'),(80,10028,21,4,'1700',NULL,NULL,'1','1700','P',NULL,NULL,7,4,'0','null','0','1700'),(81,10029,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,7,4,'0','null','0','2599'),(82,10030,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,7,4,'1','1/120','120','2719'),(83,10031,20,3,'6000',NULL,NULL,'2','6000','P',NULL,NULL,7,3,'6','6/450','450','6450'),(84,10032,2,4,'7398',NULL,NULL,'2','7398','P',NULL,NULL,7,4,'0','null','0','7398'),(85,10033,1,4,'12995',NULL,NULL,'5','12995','P',NULL,NULL,7,4,'1','1/120','120','13115'),(86,10033,20,4,'3000',NULL,NULL,'1','3000','P',NULL,NULL,7,4,'6','6/450','450','3450'),(87,10034,1,4,'5198',NULL,NULL,'2','5198','P',NULL,NULL,7,4,'0','null','0','5198'),(88,10035,2,4,'7398',NULL,NULL,'2','7398','P',NULL,NULL,7,4,'0','null','0','7398'),(89,10035,20,4,'6000',NULL,NULL,'2','6000','P',NULL,NULL,7,4,'0','null','0','6000'),(90,10036,1,4,'15594',NULL,NULL,'6','15594','P',NULL,NULL,7,4,'1','1/120','120','15714'),(91,10037,1,4,'7797',NULL,NULL,'3','7797','P',NULL,NULL,7,4,'0','null','0','7797'),(92,10037,2,4,'33291',NULL,NULL,'9','33291','P',NULL,NULL,7,4,'3','3/150','150','33441'),(93,10037,2,4,'11097',NULL,NULL,'3','11097','P',NULL,NULL,7,4,'0','null','0','11097'),(94,10038,1,3,'5198',NULL,NULL,'2','5198','P',NULL,NULL,7,3,'0','null','0','5198'),(95,10038,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,7,3,'0','null','0','2599'),(96,10038,20,3,'6000',NULL,NULL,'2','6000','P',NULL,NULL,7,3,'0','null','0','6000'),(97,10039,1,4,'7797',NULL,NULL,'3','7797','P',NULL,NULL,7,4,'0','null','0','7797'),(98,10039,2,4,'22194',NULL,NULL,'6','22194','P',NULL,NULL,7,4,'0','null','0','22194'),(99,10040,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,7,4,'0','null','0','2599'),(100,10040,2,4,'11097',NULL,NULL,'3','11097','P',NULL,NULL,7,4,'0','null','0','11097'),(101,10041,20,4,'12000',NULL,NULL,'4','12000','P',NULL,NULL,7,4,'0','null','0','12000'),(102,10042,2,4,'7398',NULL,NULL,'2','7398','P',NULL,NULL,7,4,'0','null','0','7398'),(103,10044,21,4,'34000',NULL,NULL,'20','34000','P',NULL,NULL,7,4,'0','null','0','34000'),(104,10044,20,4,'3000',NULL,NULL,'1','3000','P',NULL,NULL,7,4,'6','6/450','450','3450'),(105,10044,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,7,4,'2','2/130','130','2729'),(106,10045,21,4,'1700',NULL,NULL,'1','1700','P',NULL,NULL,7,4,'0','null','0','1700'),(107,10046,20,4,'3000',NULL,NULL,'1','3000','P',NULL,NULL,7,4,'0','null','0','3000'),(108,10047,2,4,'3699',NULL,NULL,'1','3699','P',NULL,NULL,7,4,'0','null','0','3699'),(109,10047,2,4,'3699',NULL,NULL,'1','3699','P',NULL,NULL,7,4,'0','null','0','3699'),(110,10048,2,4,'3699',NULL,NULL,'1','3699','P',NULL,NULL,7,4,'0','null','0','3699'),(111,10048,2,4,'3699',NULL,NULL,'1','3699','P',NULL,NULL,7,4,'0','null','0','3699'),(112,10048,20,4,'3000',NULL,NULL,'1','3000','P',NULL,NULL,7,4,'0','null','0','3000'),(113,10049,2,4,'7398',NULL,NULL,'2','7398','P',NULL,NULL,7,4,'0','null','0','7398'),(114,10050,2,4,'7398',NULL,NULL,'2','7398','P',NULL,NULL,7,4,'0','null','0','7398'),(115,10051,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,7,4,'1','1/120','120','2719'),(116,10052,2,4,'7398',NULL,NULL,'2','7398','P',NULL,NULL,7,4,'3','3/150','150','7548'),(117,10053,1,3,'5198',NULL,NULL,'2','5198','P',NULL,NULL,3,3,'0','null','0','5198'),(118,10054,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,3,'2,1','1/120,2/130','250','2849'),(119,10055,2,4,'3699',NULL,NULL,'1','3699','P',NULL,NULL,4,4,'3','3/150','150','3849'),(120,10056,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,7,3,'1','1/120','120','2719'),(121,10057,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,7,3,'1','1/120','120','2719'),(122,10058,2,3,'11097',NULL,NULL,'3','11097','P',NULL,NULL,7,3,'3','3/150','150','11247'),(123,10059,1,4,'7797',NULL,NULL,'3','7797','P',NULL,NULL,4,4,'0','null','0','7797'),(124,10060,1,4,'12995',NULL,NULL,'5','12995','P',NULL,NULL,7,4,'1','1/120','120','13115'),(125,10061,1,4,'15594',NULL,NULL,'6','15594','P',NULL,NULL,7,4,'1','1/120','120','15714'),(126,10061,21,4,'1700',NULL,NULL,'1','1700','P',NULL,NULL,7,4,'11','11/200','200','1900'),(127,10062,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,2,4,'1','1/120','120','2719'),(128,10063,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,4,4,'1','1/120','120','2719'),(129,10064,1,4,'5198',NULL,NULL,'2','5198','P',NULL,NULL,7,4,'0','null','0','5198'),(130,10065,1,4,'10396',NULL,NULL,'4','10396','P',NULL,NULL,2,4,'1','1/120','120','10516'),(131,10066,21,4,'3400',NULL,NULL,'2','3400','P',NULL,NULL,7,4,'0','null','0','3400'),(132,10067,1,4,'5198',NULL,NULL,'2','5198','P',NULL,NULL,7,4,'1','1/120','120','5318'),(133,10068,2,4,'3699',NULL,NULL,'1','3699','P',NULL,NULL,7,4,'0','null','0','3699'),(134,10069,21,4,'3400',NULL,NULL,'2','3400','P',NULL,NULL,7,4,'0','null','0','3400'),(135,10070,1,3,'5198',NULL,NULL,'2','5198','P',NULL,NULL,7,3,'0','null','0','5198'),(136,10070,1,3,'5198',NULL,NULL,'2','5198','P',NULL,NULL,7,3,'0','null','0','5198'),(137,10073,2,4,'7398',NULL,NULL,'2','7398','P',NULL,NULL,7,4,'0','null','0','7398'),(138,10074,21,3,'3400',NULL,NULL,'2','3400','P',NULL,NULL,7,3,'0','null','0','3400'),(139,10075,21,4,'17000',NULL,NULL,'10','17000','P',NULL,NULL,7,4,'11','11/200','200','17200'),(140,10076,20,4,'9000',NULL,NULL,'3','9000','P',NULL,NULL,7,4,'6','6/450','450','9450'),(141,10077,20,4,'6000',NULL,NULL,'2','6000','P',NULL,NULL,7,4,'0','null','0','6000'),(142,10078,1,4,'7797',NULL,NULL,'3','7797','P',NULL,NULL,7,4,'1','1/120','120','7917'),(143,10079,1,4,'10396',NULL,NULL,'4','10396','P',NULL,NULL,7,4,'1','1/120','120','10516'),(144,10080,1,3,'7797',NULL,NULL,'3','7797','P',NULL,NULL,2,3,'0','null','0','7797'),(145,10081,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,4,4,'1','1/120','120','2719'),(146,10081,2,4,'11097',NULL,NULL,'3','11097','P',NULL,NULL,4,4,'3','3/150','150','11247'),(147,10081,21,4,'3400',NULL,NULL,'2','3400','P',NULL,NULL,4,4,'11','11/200','200','3600'),(148,10082,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,2,3,'1','1/120','120','2719'),(149,10082,2,3,'3699',NULL,NULL,'1','3699','P',NULL,NULL,2,3,'3','3/150','150','3849'),(150,10082,20,3,'3000',NULL,NULL,'1','3000','P',NULL,NULL,2,3,'6','6/450','450','3450'),(151,10082,21,3,'1700',NULL,NULL,'1','1700','P',NULL,NULL,2,3,'11','11/200','200','1900'),(152,10082,21,3,'1700',NULL,NULL,'1','1700','P',NULL,NULL,2,3,'11','11/200','200','1900'),(153,10082,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,2,3,'1','1/120','120','2719'),(154,10082,2,3,'3699',NULL,NULL,'1','3699','P',NULL,NULL,2,3,'5','5/600','600','4299'),(155,10082,21,3,'1700',NULL,NULL,'1','1700','P',NULL,NULL,2,3,'11','11/200','200','1900'),(156,10083,21,3,'1700',NULL,NULL,'1','1700','P',NULL,NULL,2,3,'11','11/200','200','1900'),(157,10084,1,4,'5198',NULL,NULL,'2','5198','P',NULL,NULL,2,4,'1','1/120','120','5318'),(158,10084,21,4,'3400',NULL,NULL,'2','3400','P',NULL,NULL,2,4,'11','11/200','200','3600'),(159,10085,21,4,'3400',NULL,NULL,'2','3400','P',NULL,NULL,7,4,'0','null','0','3400'),(160,10085,21,4,'1700',NULL,NULL,'1','1700','P',NULL,NULL,7,4,'0','null','0','1700'),(161,10086,20,4,'6000',NULL,NULL,'2','6000','P',NULL,NULL,7,4,'0','null','0','6000'),(162,10087,21,4,'1700',NULL,NULL,'1','1700','P',NULL,NULL,2,4,'11','11/200','200','1900'),(163,10087,20,4,'3000',NULL,NULL,'1','3000','P',NULL,NULL,2,4,'6','6/450','450','3450'),(164,10087,20,4,'3000',NULL,NULL,'1','3000','P',NULL,NULL,2,4,'6','6/450','450','3450'),(165,10087,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,2,4,'1','1/120','120','2719'),(166,10087,1,4,'7797',NULL,NULL,'3','7797','P',NULL,NULL,2,4,'1','1/120','120','7917'),(167,10088,20,4,'6000',NULL,NULL,'2','6000','P',NULL,NULL,7,4,'0','null','0','6000'),(168,10089,1,4,'5198',NULL,NULL,'2','5198','P',NULL,NULL,2,4,'1','1/120','120','5318'),(169,10089,2,4,'7398',NULL,NULL,'2','7398','P',NULL,NULL,2,4,'0','null','0','7398'),(170,10090,1,3,'5198',NULL,NULL,'2','5198','P',NULL,NULL,2,3,'0','null','0','5198'),(171,10091,20,4,'3000',NULL,NULL,'1','3000','P',NULL,NULL,4,4,'6','6/450','450','3450'),(172,10091,2,4,'3699',NULL,NULL,'1','3699','P',NULL,NULL,4,4,'3','3/150','150','3849'),(173,10091,1,4,'5198',NULL,NULL,'2','5198','P',NULL,NULL,4,4,'0','null','0','5198'),(174,10092,2,4,'33291',NULL,NULL,'9','33291','P',NULL,NULL,4,4,'0','null','0','33291'),(175,10093,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,3,'2,1','1/120,2/130','250','2849'),(176,10093,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,3,'2,1','1/120,2/130','250','2849'),(177,10093,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,3,'0','null','0','2599'),(178,10093,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,3,'0','null','0','2599'),(179,10093,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,3,'2,1','1/120,2/130','250','2849'),(180,10094,20,3,'6000',NULL,NULL,'2','6000','P',NULL,NULL,7,3,'0','null','0','6000'),(181,10095,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,4,'1','1/120','120','2719'),(182,10095,2,4,'3699',NULL,NULL,'1','3699','P',NULL,NULL,3,4,'3','3/150','150','3849'),(183,10095,20,4,'4000',NULL,NULL,'1','4000','P',NULL,NULL,3,4,'6','6/450','450','4450'),(184,10096,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,4,'1','1/120','120','2719'),(185,10096,2,4,'3699',NULL,NULL,'1','3699','P',NULL,NULL,3,4,'3','3/150','150','3849'),(186,10097,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,4,'1','1/120','120','2719'),(187,10098,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,3,'1','1/120','120','2719'),(188,10098,2,3,'3699',NULL,NULL,'1','3699','P',NULL,NULL,3,3,'3','3/150','150','3849'),(189,10098,21,3,'1700',NULL,NULL,'1','1700','P',NULL,NULL,3,3,'11','11/200','200','1900'),(190,10099,1,3,'2599',NULL,NULL,'1','2599','P',NULL,NULL,3,3,'1','1/120','120','2719'),(191,10099,21,3,'1700',NULL,NULL,'1','1700','P',NULL,NULL,3,3,'11','11/200','200','1900'),(192,10100,21,4,'1700',NULL,NULL,'1','1700','P',NULL,NULL,4,4,'11','11/200','200','1900'),(193,10100,20,4,'4000',NULL,NULL,'1','4000','P',NULL,NULL,4,4,'6','6/450','450','4450'),(194,10100,20,4,'4000',NULL,NULL,'1','4000','P',NULL,NULL,4,4,'6','6/450','450','4450'),(195,10101,1,4,'7797',NULL,NULL,'3','7797','P',NULL,NULL,4,4,'0','null','0','7797'),(196,10102,21,3,'8500',NULL,NULL,'5','8500','P',NULL,NULL,2,3,'0','null','0','8500'),(197,10103,1,4,'2599',NULL,NULL,'1','2599','P',NULL,NULL,2,4,'1','1/120','120','2719'),(198,10104,2,4,'3699',NULL,NULL,'1','3699','P',NULL,NULL,4,4,'3','3/150','150','3849'),(199,10104,20,4,'4000',NULL,NULL,'1','4000','P',NULL,NULL,4,4,'6','6/450','450','4450'),(200,10105,1,3,'50',NULL,NULL,'1','50','P',NULL,NULL,2,3,'0','null','0','50'),(201,10106,2,3,'100',NULL,NULL,'1','100','P',NULL,NULL,2,3,'0','null','0','100'),(202,10106,2,3,'300',NULL,NULL,'3','300','P',NULL,NULL,2,3,'0','null','0','300'),(203,10107,25,3,'500',NULL,NULL,'10','500','P',NULL,NULL,2,3,'0','null','0','500'),(204,10108,1,4,'1000',NULL,NULL,'20','1000','P',NULL,NULL,2,4,'2','2/130','130','1130'),(205,10109,1,3,'50',NULL,NULL,'1','50','P',NULL,NULL,7,3,'0','null','0','50'),(206,10110,2,4,'400',NULL,NULL,'4','400','P',NULL,NULL,7,4,'0','null','0','400'),(207,10111,1,4,'50',NULL,NULL,'1','50','P',NULL,NULL,4,4,'0','null','0','50'),(208,10111,1,4,'50',NULL,NULL,'1','50','P',NULL,NULL,4,4,'0','null','0','50'),(209,10111,2,4,'100',NULL,NULL,'1','100','P',NULL,NULL,4,4,'0','null','0','100'),(210,10113,1,4,'50',NULL,NULL,'1','50','P',NULL,NULL,4,4,'0','null','0','50'),(211,10114,21,4,'200',NULL,NULL,'1','200','P',NULL,NULL,4,4,'0','null','0','200'),(212,10115,21,4,'200',NULL,NULL,'1','200','P',NULL,NULL,4,4,'0','null','0','200'),(213,10116,21,4,'200',NULL,NULL,'1','200','P',NULL,NULL,4,4,'0','null','0','200'),(214,10117,21,4,'200',NULL,NULL,'1','200','P',NULL,NULL,4,4,'0','null','0','200'),(215,10118,21,4,'200',NULL,NULL,'1','200','P',NULL,NULL,4,4,'0','null','0','200'),(216,10119,21,4,'200',NULL,NULL,'1','200','P',NULL,NULL,4,4,'0','null','0','200'),(217,10120,1,3,'50',NULL,NULL,'1','50','P',NULL,NULL,3,3,'0','null','0','50'),(218,10120,1,3,'50',NULL,NULL,'1','50','P',NULL,NULL,3,3,'0','null','0','50'),(219,10120,21,3,'200',NULL,NULL,'1','200','P',NULL,NULL,3,3,'0','null','0','200'),(220,10121,21,3,'200',NULL,NULL,'1','200','P',NULL,NULL,3,3,'0','null','0','200'),(221,10122,21,3,'200',NULL,NULL,'1','200','P',NULL,NULL,3,3,'0','null','0','200'),(222,10123,21,4,'200',NULL,NULL,'1','200','P',NULL,NULL,4,4,'0','null','0','200'),(223,10124,1,4,'50',NULL,NULL,'1','50','P',NULL,NULL,4,4,'0','null','0','50'),(224,10125,2,3,'100',NULL,NULL,'1','100','P',NULL,NULL,3,3,'0','null','0','100'),(225,10126,1,3,'50',NULL,NULL,'1','50','P',NULL,NULL,3,3,'0','null','0','50'),(226,10127,21,4,'200',NULL,NULL,'1','200','P',NULL,NULL,4,4,'0','null','0','200'),(227,10127,1,4,'50',NULL,NULL,'1','50','P',NULL,NULL,4,4,'0','null','0','50'),(228,10128,1,3,'50',NULL,NULL,'1','50','P',NULL,NULL,3,3,'1,2,2,1','1/120,2/130','250','300'),(229,10129,2,3,'500',NULL,NULL,'5','500','P',NULL,NULL,3,3,'3,10,3','3/150,10/200','350','850'),(230,10130,1,4,'150',NULL,NULL,'3','150','P',NULL,NULL,2,4,'1','1/120','120','270'),(231,10131,2,3,'1000',NULL,NULL,'10','1000','P',NULL,NULL,2,3,'0','null','0','1000'),(232,10132,1,3,'300',NULL,NULL,'6','300','P',NULL,NULL,2,3,'1,2','1/120,2/130','250','550'),(233,10133,1,3,'350',NULL,NULL,'7','350','P',NULL,NULL,2,3,'0','null','0','350'),(234,10134,2,3,'100',NULL,NULL,'1','100','P',NULL,NULL,2,3,'5','5/600','600','700'),(235,10134,21,3,'600',NULL,NULL,'3','600','P',NULL,NULL,2,3,'0','null','0','600'),(236,10134,2,3,'100',NULL,NULL,'1','100','P',NULL,NULL,2,3,'0','null','0','100'),(237,10134,2,3,'0',NULL,NULL,'0','0','P',NULL,NULL,2,3,'0','null','0','0'),(238,10134,2,3,'300',NULL,NULL,'3','300','P',NULL,NULL,2,3,'0','null','0','300'),(239,10138,2,4,'100',NULL,NULL,'1','100','P',NULL,NULL,2,4,'0','null','0','100'),(240,10138,1,4,'50',NULL,NULL,'1','50','P',NULL,NULL,2,4,'0','null','0','50'),(241,10142,1,3,'300',NULL,NULL,'6','300','P',NULL,NULL,2,3,'2','2/130','130','430'),(242,10143,2,4,'100',NULL,NULL,'1','100','P',NULL,NULL,2,4,'0','null','0','100'),(243,10143,1,4,'100',NULL,NULL,'2','100','P',NULL,NULL,2,4,'0','null','0','100'),(244,10144,1,4,'50',NULL,NULL,'1','50','P',NULL,NULL,2,4,'0','null','0','50'),(245,10145,21,3,'200',NULL,NULL,'1','200','P',NULL,NULL,2,3,'0','null','0','200'),(246,10145,20,3,'1500',NULL,NULL,'10','1500','P',NULL,NULL,2,3,'0','null','0','1500'),(247,10146,2,4,'300',NULL,NULL,'3','300','P',NULL,NULL,4,4,'0','null','0','300'),(248,10147,2,4,'300',NULL,NULL,'3','300','P',NULL,NULL,4,4,'0','null','0','300'),(249,10148,1,4,'50',NULL,NULL,'1','50','P',NULL,NULL,4,4,'1,2','1/120,2/130','250','300'),(250,10149,2,4,'100',NULL,NULL,'1','100','P',NULL,NULL,4,4,'10,3','3/150,10/200','350','450'),(251,10150,1,4,'50',NULL,NULL,'1','50','P',NULL,NULL,4,4,'2','2/130','130','180'),(252,10151,1,12,'50',NULL,NULL,'1','50','P',NULL,NULL,60,20,'1,2','1/120,2/130','250','300'),(253,10152,1,12,'50',NULL,NULL,'1','50','P',NULL,NULL,60,20,'1,2','1/120,2/130','250','300'),(254,10153,1,12,'500',NULL,NULL,'10','500','P',NULL,NULL,60,20,'1,2','1/120,2/130','250','750');
/*!40000 ALTER TABLE `orderitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `ORDER_ID` int NOT NULL AUTO_INCREMENT,
  `ADDRESS_ID` int NOT NULL,
  `PRICE` varchar(45) DEFAULT NULL,
  `TAX` varchar(45) DEFAULT NULL,
  `DISCOUNT` varchar(45) DEFAULT NULL,
  `QUANTITY` varchar(45) DEFAULT NULL,
  `TOTAL` varchar(45) DEFAULT NULL,
  `STATUS` varchar(45) NOT NULL,
  `FIELD1` varchar(245) DEFAULT NULL,
  `FIELD2` varchar(245) DEFAULT NULL,
  `MEMBER_ID` int DEFAULT NULL,
  `PRODUCT_ID` int DEFAULT NULL,
  `MEMBER_ID_FOR` int DEFAULT NULL,
  `CREATETIME` timestamp NULL DEFAULT NULL,
  `UPDATETIME` timestamp NULL DEFAULT NULL,
  `REDEEM_POINTS` int DEFAULT '0',
  `PAYMENT_DUE_DAYS_COUNT` int DEFAULT '0',
  `PAYMENT_CLEARANCE_STATUS` int DEFAULT '0',
  PRIMARY KEY (`ORDER_ID`),
  KEY `ORDER_FK2_idx` (`ADDRESS_ID`),
  CONSTRAINT `ORDER_FK2` FOREIGN KEY (`ADDRESS_ID`) REFERENCES `address` (`ADDRESS_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10154 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (10000,3,NULL,'2230.5499999999997','',NULL,'14976.55','D','12746',NULL,3,NULL,3,'2020-10-21 22:05:11','2021-04-13 08:55:19',0,0,1),(10001,4,NULL,'475.825','',NULL,'3194.825','S','2719',NULL,2,NULL,4,'2020-10-23 06:43:38','2021-03-31 05:01:55',0,0,0),(10002,4,NULL,'909.65','',NULL,'6107.65','R','5198',NULL,4,NULL,4,'2020-10-27 05:55:07','2020-10-31 15:59:30',0,0,0),(10003,4,NULL,'4093.4249999999997','',NULL,'27484.425','S','23391',NULL,4,NULL,4,'2020-11-03 10:59:00','2021-03-31 05:06:31',0,0,0),(10004,4,NULL,'930.65','',NULL,'6248.65','D','5318',NULL,4,NULL,4,'2020-11-05 11:49:44','2020-12-03 09:42:19',0,137,0),(10005,3,NULL,'932.4','',NULL,'6260.4','D','5328',NULL,2,NULL,3,'2020-11-05 12:00:37','2021-02-12 17:16:28',0,66,0),(10006,4,NULL,'3262.875','',NULL,'21907.875','S','18645',NULL,4,NULL,4,'2020-11-05 12:10:58','2021-03-31 05:08:16',0,0,0),(10007,4,NULL,'477.575','',NULL,'3206.575','S','2729',NULL,2,NULL,4,'2020-11-05 12:23:49','2021-03-31 05:09:03',0,0,0),(10008,3,NULL,'454.825','',NULL,'3053.825','D','2599',NULL,3,NULL,3,'2020-11-06 04:33:58','2021-04-13 08:37:43',0,0,1),(10009,3,NULL,NULL,'',NULL,NULL,'D',NULL,NULL,3,NULL,3,'2020-11-06 04:35:08','2021-02-13 08:26:37',0,65,0),(10010,3,NULL,'454.825','',NULL,'3053.825','S','2599',NULL,3,NULL,3,'2020-11-06 04:36:15','2021-03-31 05:10:44',0,0,0),(10011,3,NULL,'454.825','',NULL,'3053.825','S','2599',NULL,3,NULL,3,'2020-11-06 04:45:30','2021-03-31 05:11:48',0,0,0),(10012,3,NULL,'1364.475','',NULL,'9161.475','S','7797',NULL,3,NULL,3,'2020-11-06 04:46:29','2021-03-31 05:35:24',0,0,0),(10013,3,NULL,'454.825','',NULL,'3053.825','S','2599',NULL,3,NULL,3,'2020-11-06 04:58:22','2021-03-31 10:35:20',0,0,0),(10014,3,NULL,'454.825','',NULL,'3053.825','P','2599',NULL,3,NULL,3,'2020-11-06 04:58:55',NULL,0,0,0),(10015,3,NULL,'454.825','',NULL,'3053.825','P','2599',NULL,3,NULL,3,'2020-11-06 05:00:34',NULL,0,0,0),(10016,3,NULL,'647.3249999999999','',NULL,'4346.325','P','3699',NULL,3,NULL,3,'2020-11-06 05:00:44',NULL,0,0,0),(10017,3,NULL,'2274.125','',NULL,'15269.125','P','12995',NULL,3,NULL,3,'2020-11-06 05:01:12',NULL,0,0,0),(10018,4,NULL,'5457.9','',NULL,'36645.9','P','31188',NULL,3,NULL,4,'2020-11-06 05:01:30',NULL,0,0,0),(10019,4,NULL,NULL,'',NULL,NULL,'P',NULL,NULL,3,NULL,4,'2020-11-06 05:01:30',NULL,0,0,0),(10020,4,NULL,'932.4','',NULL,'6260.4','P','5328',NULL,3,NULL,4,'2020-11-06 06:06:59',NULL,0,0,0),(10021,3,NULL,'953.4','',NULL,'6401.4','P','5448',NULL,7,NULL,3,'2020-11-06 07:45:16',NULL,0,0,0),(10022,4,NULL,'1320.8999999999999','',NULL,'8868.9','P','7548',NULL,7,NULL,4,'2020-11-06 07:45:51',NULL,0,0,0),(10023,4,NULL,'1158.1499999999999','',NULL,'7776.15','P','6618',NULL,4,NULL,4,'2020-11-06 07:47:04',NULL,0,0,0),(10024,4,NULL,'951.65','',NULL,'6389.65','P','5438',NULL,7,NULL,4,'2020-11-06 08:09:17',NULL,0,0,0),(10025,3,NULL,'477.575','',NULL,'3206.575','P','2729',NULL,7,NULL,3,'2020-11-06 08:09:54',NULL,0,0,0),(10026,4,NULL,'475.825','',NULL,'3194.825','P','2719',NULL,4,NULL,4,'2020-11-06 08:11:07',NULL,0,0,0),(10027,4,NULL,'773.3249999999999','',NULL,'5192.325','P','4419',NULL,7,NULL,4,'2020-11-06 08:27:55',NULL,0,0,0),(10028,4,NULL,'297.5','',NULL,'1997.5','P','1700',NULL,7,NULL,4,'2020-11-06 08:29:42',NULL,0,0,0),(10029,4,NULL,'454.825','',NULL,'3053.825','P','2599',NULL,7,NULL,4,'2020-11-06 08:46:56',NULL,0,0,0),(10030,4,NULL,'475.825','',NULL,'3194.825','P','2719',NULL,7,NULL,4,'2020-11-06 08:47:13',NULL,0,0,0),(10031,3,NULL,'1128.75','',NULL,'7578.75','P','6450',NULL,7,NULL,3,'2020-11-06 08:47:45','2020-11-06 08:50:49',0,0,0),(10032,4,NULL,'1294.6499999999999','',NULL,'8692.65','P','7398',NULL,7,NULL,4,'2020-11-06 08:52:01',NULL,0,0,0),(10033,4,NULL,'2898.875','',NULL,'19463.875','P','16565',NULL,7,NULL,4,'2020-11-06 09:16:08',NULL,0,0,0),(10034,4,NULL,'909.65','',NULL,'6107.65','p','5198',NULL,7,NULL,4,'2020-11-06 09:38:46','2020-11-06 09:40:55',0,0,0),(10035,4,NULL,'2344.6499999999996','',NULL,'15742.65','P','13398',NULL,7,NULL,4,'2020-11-06 09:58:02',NULL,0,0,0),(10036,4,NULL,'2749.95','',NULL,'18463.95','P','15714',NULL,7,NULL,4,'2020-11-06 10:10:23',NULL,0,0,0),(10037,4,NULL,'9158.625','',NULL,'61493.625','P','52335',NULL,7,NULL,4,'2020-11-06 10:10:52',NULL,0,0,0),(10038,3,NULL,'2414.475','',NULL,'16211.475','P','13797',NULL,7,NULL,3,'2020-11-06 10:12:22',NULL,0,0,0),(10039,4,NULL,'5248.424999999999','',NULL,'35239.425','P','29991',NULL,7,NULL,4,'2020-11-06 10:13:39',NULL,0,0,0),(10040,4,NULL,'2396.7999999999997','',NULL,'16092.8','P','13696',NULL,7,NULL,4,'2020-11-06 10:14:38',NULL,0,0,0),(10041,4,NULL,'2100','',NULL,'14100','P','12000',NULL,7,NULL,4,'2020-11-06 10:14:56',NULL,0,0,0),(10042,4,NULL,'1294.6499999999999','',NULL,'8692.65','P','7398',NULL,7,NULL,4,'2020-11-06 10:16:05',NULL,0,0,0),(10043,3,NULL,NULL,'',NULL,NULL,'P',NULL,NULL,3,NULL,3,'2020-11-06 10:33:12',NULL,0,0,0),(10044,4,NULL,'7031.325','',NULL,'47210.325','P','40179',NULL,7,NULL,4,'2020-11-06 10:35:00',NULL,0,0,0),(10045,4,NULL,'297.5','',NULL,'1997.5','P','1700',NULL,7,NULL,4,'2020-11-06 10:35:23',NULL,0,0,0),(10046,4,NULL,'525','',NULL,'3525','P','3000',NULL,7,NULL,4,'2020-11-06 10:36:02',NULL,0,0,0),(10047,4,NULL,'1294.6499999999999','',NULL,'8692.65','P','7398',NULL,7,NULL,4,'2020-11-06 10:36:49',NULL,0,0,0),(10048,4,NULL,'1819.6499999999999','',NULL,'12217.65','A','10398',NULL,7,NULL,4,'2020-11-06 10:37:32','2020-11-06 10:48:15',0,0,0),(10049,4,NULL,'1294.6499999999999','',NULL,'8692.65','A','7398',NULL,7,NULL,4,'2020-11-06 10:50:32','2020-11-06 10:50:41',0,0,0),(10050,4,NULL,'1294.6499999999999','',NULL,'8692.65','P','7398',NULL,7,NULL,4,'2020-11-09 08:02:10',NULL,0,0,0),(10051,4,NULL,'475.825','',NULL,'3194.825','P','2719',NULL,7,NULL,4,'2020-11-09 08:08:03',NULL,0,0,0),(10052,4,NULL,'1320.8999999999999','',NULL,'8868.9','p','7548',NULL,7,NULL,4,'2020-11-09 08:08:44','2020-11-10 09:44:51',0,0,0),(10053,3,NULL,'909.65','',NULL,'6107.65','P','5198',NULL,3,NULL,3,'2020-11-13 13:06:46',NULL,0,0,0),(10054,3,NULL,'498.575','',NULL,'3347.575','P','2849',NULL,3,NULL,3,'2020-11-13 14:25:03',NULL,0,0,0),(10055,4,NULL,'673.5749999999999','',NULL,'4522.575','P','3849',NULL,4,NULL,4,'2020-11-28 09:59:03',NULL,0,0,0),(10056,3,NULL,'475.825','',NULL,'3194.825','P','2719',NULL,7,NULL,3,'2020-11-29 23:20:52',NULL,0,0,0),(10057,3,NULL,'475.825','',NULL,'3194.825','P','2719',NULL,7,NULL,3,'2020-11-30 00:00:39',NULL,0,0,0),(10058,3,NULL,'1968.225','',NULL,'13215.225','P','11247',NULL,7,NULL,3,'2020-11-30 00:01:21',NULL,0,0,0),(10059,4,NULL,'1364.475','',NULL,'9161.475','P','7797',NULL,4,NULL,4,'2020-11-30 05:27:54',NULL,0,0,0),(10060,4,NULL,'2295.125','',NULL,'15410.125','P','13115',NULL,7,NULL,4,'2020-11-30 05:29:51',NULL,0,0,0),(10061,4,NULL,'3082.45','',NULL,'20696.45','P','17614',NULL,7,NULL,4,'2020-11-30 05:31:08',NULL,0,0,0),(10062,4,NULL,'475.825','',NULL,'3194.825','P','2719',NULL,2,NULL,4,'2020-11-30 09:45:37',NULL,0,0,0),(10063,4,NULL,'475.825','',NULL,'3194.825','P','2719',NULL,4,NULL,4,'2020-11-30 09:46:09',NULL,0,0,0),(10064,4,NULL,'909.65','',NULL,'6107.65','P','5198',NULL,7,NULL,4,'2020-11-30 09:46:54','2020-11-30 10:17:27',0,0,0),(10065,4,NULL,'1840.3','',NULL,'12356.3','P','10516',NULL,2,NULL,4,'2020-11-30 09:47:47',NULL,0,0,0),(10066,4,NULL,'595','',NULL,'3995','P','3400',NULL,7,NULL,4,'2020-11-30 10:24:25',NULL,0,0,0),(10067,4,NULL,'930.65','',NULL,'6248.65','P','5318',NULL,7,NULL,4,'2020-11-30 10:25:39',NULL,0,0,0),(10068,4,NULL,'647.3249999999999','',NULL,'4346.325','P','3699',NULL,7,NULL,4,'2020-11-30 10:26:57',NULL,0,0,0),(10069,4,NULL,'595','',NULL,'3995','P','3400',NULL,7,NULL,4,'2020-11-30 10:28:31',NULL,0,0,0),(10070,3,NULL,'1819.3','',NULL,'12215.3','P','10396',NULL,7,NULL,3,'2020-11-30 10:29:07','2020-11-30 10:41:17',0,0,0),(10071,3,NULL,NULL,'',NULL,NULL,'P',NULL,NULL,7,NULL,3,'2020-11-30 10:29:25',NULL,0,0,0),(10072,4,NULL,NULL,'',NULL,NULL,'P',NULL,NULL,7,NULL,4,'2020-11-30 10:29:38',NULL,0,0,0),(10073,4,NULL,'1294.6499999999999','',NULL,'8692.65','P','7398',NULL,7,NULL,4,'2020-11-30 10:47:27','2020-11-30 10:48:51',0,0,0),(10074,3,NULL,'595','',NULL,'3995','P','3400',NULL,7,NULL,3,'2020-11-30 10:47:52','2020-11-30 10:49:01',0,0,0),(10075,4,NULL,'3010','',NULL,'20210','P','17200',NULL,7,NULL,4,'2020-11-30 10:48:54','2020-11-30 10:49:12',0,0,0),(10076,4,NULL,'1653.75','',NULL,'11103.75','P','9450',NULL,7,NULL,4,'2020-11-30 10:56:17',NULL,0,0,0),(10077,4,NULL,'1050','',NULL,'7050','P','6000',NULL,7,NULL,4,'2020-11-30 11:05:43',NULL,0,0,0),(10078,4,NULL,'1385.475','',NULL,'9302.475','P','7917',NULL,7,NULL,4,'2020-11-30 11:21:33',NULL,0,0,0),(10079,4,NULL,'1840.3','',NULL,'12356.3','P','10516',NULL,7,NULL,4,'2020-11-30 11:28:36','2020-11-30 13:43:17',0,0,0),(10080,3,NULL,'1364.475','',NULL,'9161.475','D','7797',NULL,2,NULL,3,'2020-11-30 13:09:20','2020-12-03 09:42:12',0,137,0),(10081,4,NULL,'3074.0499999999997','',NULL,'20640.05','R','17566',NULL,4,NULL,4,'2020-11-30 13:12:51','2021-01-05 11:36:40',0,0,0),(10082,3,NULL,'3978.7999999999997','',NULL,'26714.8','P','22736',NULL,2,NULL,3,'2020-12-01 21:51:31',NULL,0,0,0),(10083,3,NULL,'332.5','',NULL,'2232.5','A','1900',NULL,2,NULL,3,'2020-12-01 21:54:32','2020-12-02 07:33:57',0,0,0),(10084,4,NULL,'1560.6499999999999','',NULL,'10478.65','A','8918',NULL,2,NULL,4,'2020-12-01 22:30:51','2020-12-02 07:33:31',0,0,0),(10085,4,NULL,'892.5','',NULL,'5992.5','undefined','5100',NULL,7,NULL,4,'2020-12-02 07:35:50','2020-12-02 07:36:45',0,0,0),(10086,4,NULL,'1050','',NULL,'7050','A','6000',NULL,7,NULL,4,'2020-12-02 07:37:54','2020-12-02 07:38:08',0,0,0),(10087,4,NULL,'3401.2999999999997','',NULL,'22837.3','P','19436',NULL,2,NULL,4,'2020-12-02 07:53:57',NULL,0,0,0),(10088,4,NULL,'1050','',NULL,'7050','A','6000',NULL,7,NULL,4,'2020-12-02 08:59:39','2020-12-02 09:00:06',0,0,0),(10089,4,NULL,'2225.2999999999997','',NULL,'14941.3','I','12716',NULL,2,NULL,4,'2020-12-03 07:55:56','2021-01-05 11:36:47',0,0,0),(10090,3,NULL,'909.65','',NULL,'6107.65','R','5198',NULL,2,NULL,3,'2020-12-03 07:56:15','2020-12-03 07:57:32',0,0,0),(10091,4,NULL,'2186.975','',NULL,'14683.975','D','12497',NULL,4,NULL,4,'2020-12-03 07:59:19','2020-12-03 09:41:15',0,137,0),(10092,4,NULL,'5825.924999999999','',NULL,'39116.925','undefined','33291',NULL,4,NULL,4,'2020-12-03 08:01:37','2020-12-03 08:03:19',0,0,0),(10093,3,NULL,'2405.375','',NULL,'16150.375','P','13745',NULL,3,NULL,3,'2020-12-05 16:35:11',NULL,0,0,0),(10094,3,NULL,'1050','',NULL,'7050','D','6000',NULL,7,NULL,3,'2020-12-07 12:44:13','2021-01-05 12:03:49',0,104,0),(10095,4,NULL,'1928.1499999999999','',NULL,'12946.15','D','11018',NULL,3,NULL,4,'2020-12-08 06:01:29','2021-04-13 14:14:13',0,99,1),(10096,4,NULL,'1149.3999999999999','',NULL,'7717.4','D','6568',NULL,3,NULL,4,'2020-12-08 06:02:20','2021-01-06 05:03:04',0,103,0),(10097,4,NULL,'475.825','',NULL,'3194.825','D','2719',NULL,3,NULL,4,'2020-12-08 06:07:15','2021-01-12 10:58:39',0,97,0),(10098,3,NULL,'1481.8999999999999','',NULL,'9949.9','D','8468',NULL,3,NULL,3,'2020-12-08 06:09:26','2020-12-15 20:57:24',0,124,0),(10099,3,NULL,'808.3249999999999','',NULL,'5427.325','D','4619',NULL,3,NULL,3,'2020-12-08 06:10:37','2021-01-12 10:58:32',0,97,0),(10100,4,NULL,'1889.9999999999998','',NULL,'12690','D','10800',NULL,4,NULL,4,'2020-12-08 06:37:09','2021-04-13 14:14:03',0,98,1),(10101,4,NULL,'1364.475','',NULL,'9161.475','D','7797',NULL,4,NULL,4,'2020-12-08 09:39:17','2021-01-12 10:59:13',0,97,0),(10102,3,NULL,'1487.5','',NULL,'9987.5','D','8500',NULL,2,NULL,3,'2020-12-11 08:10:35','2021-01-05 12:03:05',0,104,0),(10103,4,NULL,'475.825','',NULL,'3194.825','D','2719',NULL,2,NULL,4,'2020-12-17 05:59:29','2021-04-13 08:35:49',0,0,1),(10104,4,NULL,'1452.3249999999998','',NULL,'9751.325','D','8299',NULL,4,NULL,4,'2021-01-06 11:07:51','2021-01-12 10:58:45',0,97,0),(10105,3,NULL,'8.75','',NULL,'58.75','D','50',NULL,2,NULL,3,'2021-01-08 09:44:46','2021-01-12 10:59:27',0,97,0),(10106,3,NULL,'70','',NULL,'470','P','400',NULL,2,NULL,3,'2021-01-13 02:29:14',NULL,0,0,0),(10107,3,NULL,'87.5','',NULL,'587.5','P','500',NULL,2,NULL,3,'2021-01-13 02:29:37',NULL,0,0,0),(10108,4,NULL,'197.75','',NULL,'1327.75','D','1130',NULL,2,NULL,4,'2021-01-13 02:30:41','2021-02-13 11:18:40',0,65,0),(10109,3,NULL,'8.75','',NULL,'58.75','P','50',NULL,7,NULL,3,'2021-01-13 03:10:20',NULL,0,0,0),(10110,4,NULL,'70','',NULL,'470','P','400',NULL,7,NULL,4,'2021-01-13 03:10:46',NULL,0,0,0),(10111,4,NULL,'35','',NULL,'235','P','200',NULL,4,NULL,4,'2021-02-22 11:40:53',NULL,0,0,0),(10112,4,NULL,'8.75','',NULL,'58.75','P','50',NULL,4,NULL,4,'2021-02-22 11:44:15',NULL,0,0,0),(10113,4,NULL,'8.75','',NULL,'58.75','P','50',NULL,4,NULL,4,'2021-02-22 11:45:20',NULL,0,0,0),(10114,4,NULL,'35','',NULL,'235','P','200',NULL,4,NULL,4,'2021-02-22 11:47:45',NULL,0,0,0),(10115,4,NULL,'35','',NULL,'235','P','200',NULL,4,NULL,4,'2021-02-22 11:48:52',NULL,0,0,0),(10116,4,NULL,'35','',NULL,'235','P','200',NULL,4,NULL,4,'2021-02-22 11:52:59',NULL,0,0,0),(10117,4,NULL,'35','',NULL,'235','P','200',NULL,4,NULL,4,'2021-02-22 12:10:42',NULL,0,0,0),(10118,4,NULL,'35','',NULL,'235','P','200',NULL,4,NULL,4,'2021-02-22 12:14:47',NULL,0,0,0),(10119,4,NULL,'35','',NULL,'235','P','200',NULL,4,NULL,4,'2021-02-22 12:18:14',NULL,0,0,0),(10120,3,NULL,'52.5','',NULL,'352.5','P','300',NULL,3,NULL,3,'2021-02-22 12:21:33',NULL,0,0,0),(10121,3,NULL,'35','',NULL,'235','P','200',NULL,3,NULL,3,'2021-02-22 12:21:44',NULL,0,0,0),(10122,3,NULL,'35','',NULL,'235','P','200',NULL,3,NULL,3,'2021-02-22 13:38:50',NULL,0,0,0),(10123,4,NULL,'35','',NULL,'235','P','200',NULL,4,NULL,4,'2021-02-22 13:41:30',NULL,0,0,0),(10124,4,NULL,'8.75','',NULL,'58.75','P','50',NULL,4,NULL,4,'2021-02-22 13:42:16',NULL,0,0,0),(10125,3,NULL,'17.5','',NULL,'17','P','100',NULL,3,NULL,3,'2021-02-27 19:19:41',NULL,0,0,0),(10126,3,NULL,'8.75','',NULL,'8.75','P','50',NULL,3,NULL,3,'2021-02-27 20:30:43',NULL,50,0,0),(10127,4,NULL,'43.75','',NULL,'243.75','P','250',NULL,4,NULL,4,'2021-02-27 20:37:30',NULL,50,0,0),(10128,3,NULL,'52.5','',NULL,'302.5','P','300',NULL,3,NULL,3,'2021-03-02 07:13:56',NULL,50,0,0),(10129,3,NULL,'148.75','',NULL,'948','P','850',NULL,3,NULL,3,'2021-03-02 07:56:18',NULL,50,0,0),(10130,4,NULL,'47.25','',NULL,'317.25','A','270',NULL,2,NULL,4,'2021-03-03 09:00:47','2021-03-03 09:02:41',0,0,0),(10131,3,NULL,'175','',NULL,'1175','P','1000',NULL,2,NULL,3,'2021-03-03 09:05:03',NULL,0,0,0),(10132,3,NULL,'96.25','',NULL,'646.25','D','550',NULL,2,NULL,3,'2021-03-03 12:38:42','2021-03-03 12:55:56',50,47,0),(10133,3,NULL,'61.24999999999999','',NULL,'411.25','P','350',NULL,2,NULL,3,'2021-03-04 06:54:00',NULL,0,0,0),(10134,3,NULL,'297.5','',NULL,'1997.5','P','1700',NULL,2,NULL,3,'2021-03-04 07:00:21',NULL,0,0,0),(10135,4,NULL,NULL,'',NULL,NULL,'P',NULL,NULL,2,NULL,4,'2021-03-04 07:00:25',NULL,0,0,0),(10136,4,NULL,NULL,'',NULL,NULL,'P',NULL,NULL,2,NULL,4,'2021-03-04 07:00:27',NULL,0,0,0),(10137,4,NULL,NULL,'',NULL,NULL,'A',NULL,NULL,2,NULL,4,'2021-03-04 07:00:35','2021-03-04 07:01:56',0,0,0),(10138,4,NULL,'26.25','',NULL,'176.25','P','150',NULL,2,NULL,4,'2021-03-04 07:01:01',NULL,0,0,0),(10139,4,NULL,NULL,'',NULL,NULL,'P',NULL,NULL,2,NULL,4,'2021-03-04 07:01:06',NULL,0,0,0),(10140,3,NULL,NULL,'',NULL,NULL,'P',NULL,NULL,2,NULL,3,'2021-03-04 07:01:16',NULL,0,0,0),(10141,4,NULL,NULL,'',NULL,NULL,'P',NULL,NULL,2,NULL,4,'2021-03-04 07:01:24',NULL,0,0,0),(10142,3,NULL,'75.25','',NULL,'505.25','A','430',NULL,2,NULL,3,'2021-03-04 07:03:33','2021-03-04 07:04:25',0,0,0),(10143,4,NULL,'35','',NULL,'235','P','200',NULL,2,NULL,4,'2021-03-04 07:22:46',NULL,0,0,0),(10144,4,NULL,'8.75','',NULL,'58.75','P','50',NULL,2,NULL,4,'2021-03-04 07:23:16',NULL,0,0,0),(10145,3,NULL,'297.5','',NULL,'1997.5','D','1700',NULL,2,NULL,3,'2021-03-11 11:30:32','2021-04-13 08:34:39',0,0,1),(10146,4,NULL,'52.5','',NULL,'352.5','A','300',NULL,4,NULL,4,'2021-03-15 04:44:41','2021-03-15 04:45:43',0,0,0),(10147,4,NULL,'52.5','',NULL,'352.5','P','300',NULL,4,NULL,4,'2021-03-15 06:50:22',NULL,0,0,0),(10148,4,NULL,'52.5','',NULL,'352.5','D','300',NULL,4,NULL,4,'2021-03-31 01:38:39','2021-04-13 08:55:55',0,6,0),(10149,4,NULL,'78.75','',NULL,'478.75','D','450',NULL,4,NULL,4,'2021-03-31 01:40:32','2021-03-31 02:28:01',50,0,1),(10150,4,NULL,'31.499999999999996','',NULL,'261','P','180',NULL,4,NULL,4,'2021-04-18 21:25:38',NULL,50,0,0),(10151,12,NULL,'52.5','',NULL,'352.5','A','300',NULL,60,NULL,20,'2021-04-19 01:23:14','2021-04-19 02:02:01',0,0,0),(10152,12,NULL,'52.5','',NULL,'302.5','A','300',NULL,60,NULL,20,'2021-04-19 02:11:28','2021-04-19 02:11:41',50,0,0),(10153,12,NULL,'131.25','',NULL,'831','A','750',NULL,60,NULL,20,'2021-04-19 02:20:40','2021-04-19 02:21:00',50,0,0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordersattr`
--

DROP TABLE IF EXISTS `ordersattr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordersattr` (
  `ORDERSATTR_ID` int NOT NULL AUTO_INCREMENT,
  `ORDER_ID` int NOT NULL,
  `SHIPADDRESS` varchar(255) DEFAULT NULL,
  `SHIPPARTNER` varchar(255) DEFAULT NULL,
  `SHIPNUMBER` varchar(255) DEFAULT NULL,
  `SHIPTYPE` varchar(255) DEFAULT NULL,
  `SHIPWEIGHT` varchar(255) DEFAULT NULL,
  `SHIPQUANTITY` varchar(255) DEFAULT NULL,
  `STATUS` varchar(255) DEFAULT NULL,
  `DELDQUANTITY` varchar(255) DEFAULT NULL,
  `SHIPDATE` varchar(255) DEFAULT NULL,
  `DELDATE` varchar(255) DEFAULT NULL,
  `PACKAGE` varchar(255) DEFAULT NULL,
  `CITY` varchar(255) DEFAULT NULL,
  `FIELD1` varchar(245) DEFAULT NULL,
  `FIELD2` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`ORDERSATTR_ID`),
  KEY `ORDERSATTR_FK1_idx` (`ORDER_ID`),
  CONSTRAINT `ORDERSATTR_FK1` FOREIGN KEY (`ORDER_ID`) REFERENCES `orders` (`ORDER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordersattr`
--

LOCK TABLES `ordersattr` WRITE;
/*!40000 ALTER TABLE `ordersattr` DISABLE KEYS */;
INSERT INTO `ordersattr` VALUES (1,10098,'ahsagsagjakgds','DHL','45454','Cargo','5KG','100','D','30','12/15/2020','12/16/2020','Box','Noida',NULL,NULL),(2,10102,'sdsd','DHL','4545454545','Cargo','25kg','100','D','10','12/16/2020','01/05/2021','Box','Noida',NULL,NULL),(3,10103,'sdfef','sdvsf','dvs','sdvsdvf','vsdvs','vdsvsfv','D','2','12/22/2020','12/30/2020','Box','Noida',NULL,NULL),(4,10096,'23','23','23','23','23','23','D','10','01/06/2021','01/06/2021','Box','Noida',NULL,NULL),(5,10097,'213213','213213','213','213213','213','213','D','','213','','Box','Noida',NULL,NULL),(6,10099,'12321','21321','213213','123213','21321','123213','D','','01/06/2021','','Box','Noida',NULL,NULL),(7,10104,'sdfef','sdvsf','dwsdx','tehgrthb','dvd','ssddc','D','','07/01/2021','','Box','Noida',NULL,NULL),(8,10105,'','','','','','','D','','','','Box','Noida',NULL,NULL),(9,10108,'510 Townsend st','test','1245677','test','6788','5','D','','13/2/2021','','Box','Pune',NULL,NULL),(10,10132,'PNT COLONY , SILIGURI','DTDCAVINASH','12346','TRANSPORT','100 kg','100','D','50','02/03/2021','03/03/2021','Box','Noida',NULL,NULL),(11,10001,'','','','','','','S',NULL,'',NULL,'Box','Pune',NULL,NULL),(12,10003,'','','','','','','S',NULL,'',NULL,'Box','Pune',NULL,NULL),(13,10006,'','','','','','','S',NULL,'',NULL,'Box','Pune',NULL,NULL),(14,10007,'','','','','','','S',NULL,'',NULL,'Box','Pune',NULL,NULL),(15,10010,'','','','','','','S',NULL,'',NULL,'Box','Noida',NULL,NULL),(16,10011,'','','','','','','S',NULL,'',NULL,'Box','Noida',NULL,NULL),(17,10012,'','','','','','','S',NULL,'',NULL,'Box','Noida',NULL,NULL),(18,10013,'','','','','','','S',NULL,'',NULL,'Box','Noida',NULL,NULL),(19,10148,'','','','','','','D','10','','04/13/2021','Box','Pune',NULL,NULL);
/*!40000 ALTER TABLE `ordersattr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `PAYMENT_ID` int NOT NULL AUTO_INCREMENT,
  `ORDER_ID` int NOT NULL,
  `STATUS` varchar(255) DEFAULT NULL,
  `PENDINGFROMDATE` varchar(255) DEFAULT NULL,
  `PAYDATE` varchar(255) DEFAULT NULL,
  `DELAY` varchar(255) DEFAULT NULL,
  `FIELD1` varchar(245) DEFAULT NULL,
  `FIELD2` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`PAYMENT_ID`),
  KEY `PAYMENT_FK1_idx` (`ORDER_ID`),
  CONSTRAINT `PAYMENT_FK1` FOREIGN KEY (`ORDER_ID`) REFERENCES `orders` (`ORDER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,10098,'P','12/16/2020',NULL,'1',NULL,NULL),(2,10103,'P','12/30/2020',NULL,'1',NULL,NULL),(3,10102,'P','01/05/2021',NULL,'1',NULL,NULL),(4,10094,'P','',NULL,'1',NULL,NULL),(5,10095,'P','01/05/2021',NULL,'1',NULL,NULL),(6,10100,'P','01/07/2021',NULL,'1',NULL,NULL),(7,10096,'P','01/06/2021',NULL,'1',NULL,NULL),(8,10099,'P','',NULL,'1',NULL,NULL),(9,10097,'P','',NULL,'1',NULL,NULL),(10,10104,'P','',NULL,'1',NULL,NULL),(11,10101,'P','',NULL,'1',NULL,NULL),(12,10105,'P','',NULL,'1',NULL,NULL),(13,10005,'P','',NULL,'1',NULL,NULL),(14,10008,'P','',NULL,'1',NULL,NULL),(15,10009,'P','',NULL,'1',NULL,NULL),(16,10108,'P','',NULL,'1',NULL,NULL),(17,10132,'P','03/03/2021',NULL,'1',NULL,NULL),(18,10149,'P','',NULL,'1',NULL,NULL),(19,10145,'P','',NULL,'1',NULL,NULL),(20,10148,'P','04/13/2021',NULL,'1',NULL,NULL);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prdattrrel`
--

DROP TABLE IF EXISTS `prdattrrel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prdattrrel` (
  `PRDATTRREL_ID` int NOT NULL AUTO_INCREMENT,
  `PRODUCT_ID` int NOT NULL,
  `ATTR_ID` int NOT NULL,
  `ATTRVAL_ID` int NOT NULL,
  `SEQUENCE` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`PRDATTRREL_ID`),
  KEY `PRDATTRREL_FK1_idx` (`ATTR_ID`),
  KEY `PRDATTRREL_FK2_idx` (`ATTRVAL_ID`),
  KEY `PRDATTRREL_FK3_idx` (`PRODUCT_ID`),
  CONSTRAINT `PRDATTRREL_FK1` FOREIGN KEY (`ATTR_ID`) REFERENCES `attr` (`ATTR_ID`),
  CONSTRAINT `PRDATTRREL_FK2` FOREIGN KEY (`ATTRVAL_ID`) REFERENCES `attrval` (`ATTRVAL_ID`),
  CONSTRAINT `PRDATTRREL_FK3` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `product` (`PRODUCT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prdattrrel`
--

LOCK TABLES `prdattrrel` WRITE;
/*!40000 ALTER TABLE `prdattrrel` DISABLE KEYS */;
/*!40000 ALTER TABLE `prdattrrel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prdcatrel`
--

DROP TABLE IF EXISTS `prdcatrel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prdcatrel` (
  `PRODUCT_ID` int NOT NULL,
  `CATEGORY_ID` int NOT NULL,
  KEY `PRDCATREL_FK1_idx` (`PRODUCT_ID`),
  CONSTRAINT `PRDCATREL_FK1` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `product` (`PRODUCT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prdcatrel`
--

LOCK TABLES `prdcatrel` WRITE;
/*!40000 ALTER TABLE `prdcatrel` DISABLE KEYS */;
INSERT INTO `prdcatrel` VALUES (1,4),(2,3),(20,6),(21,3),(25,3);
/*!40000 ALTER TABLE `prdcatrel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `PRODUCT_ID` int NOT NULL AUTO_INCREMENT,
  `PRODUCT_TYPE` varchar(45) NOT NULL,
  `NAME` varchar(750) DEFAULT NULL,
  `DESCRIPTION` varchar(2045) DEFAULT NULL,
  `PUBLISHED` varchar(45) NOT NULL,
  `THUMBNAIL` varchar(245) DEFAULT NULL,
  `FULLIMAGE` varchar(245) DEFAULT NULL,
  `PRODUCTcol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`PRODUCT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'SKU','Axis Shell Green Back copy ( Red )','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem','1','variant_1601034369YANlXU3P9t.jpg','variant_1601034369YANlXU3P9t.jpg',NULL),(2,'SKU','802 MESH ( Red )','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem','1','variant_16010339383yX9C4M1bt.jpg','variant_16010339383yX9C4M1bt.jpg',NULL),(20,'SKU','Any Desk (Red)','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem','1','variant_1601034369YANlXU3P9t.jpg','variant_1601034369YANlXU3P9t.jpg',NULL),(21,'SKU','802 NETTED (Red)','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem','1','variant_16010339383yX9C4M1bt.jpg','variant_16010339383yX9C4M1bt.jpg',NULL),(22,'SKU','Test','Test123','1','','',NULL),(23,'SKU','Wheel Chair','	Wheel Chair						','1','','',NULL),(24,'SKU','NEWCB','		ddd					','1','','',NULL),(25,'SKU','NEWCB','								On the Insert tab, the galleries include items that are designed to coordinate with the overall look of your document.\r\nYou can use these galleries to insert tables, headers, footers, lists, cover pages, and other document building blocks.\r\nWhen you create pictures, charts, or diagrams, they also coordinate with your current document look.\r\nYou can easily change the formatting of selected text in the document text by choosing a look for the selected text from the Quick Styles gallery on the Home tab.\r\nYou can also format text directly by using the other controls on the Home tab.\r\nMost controls offer a choice of using the look from the current theme or using a format that you specify directly.\r\nTo change the overall look of your document, choose new Theme elements on the Page Layout tab.\r\nTo change the looks available in the Quick Style gallery, use the Change Current Quick Style Set command.\r\nBoth the Themes gallery and the Quick Styles gallery provide reset commands so that you can always restore the look of your document to the original contained in your current template.\r\nOn the Insert tab, the galleries include items that are designed to coordinate with the overall look of your document.\r\n\r\n\r\n							','1','variant_1601034369YANlXU3P9t.jpg','variant_1601034369YANlXU3P9t.jpg',NULL),(26,'SKU','ss','							','1','','',NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productconf`
--

DROP TABLE IF EXISTS `productconf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productconf` (
  `PRODUCTCONF_ID` int NOT NULL AUTO_INCREMENT,
  `PRODUCT_ID` int NOT NULL,
  `INVENTORY` int NOT NULL,
  `LISTPRICE` varchar(2045) NOT NULL,
  `OFFERPRICE` varchar(2045) NOT NULL,
  `LENGTH` varchar(2045) DEFAULT NULL,
  `WIDTH` varchar(2045) DEFAULT NULL,
  `HEIGHT` varchar(2045) DEFAULT NULL,
  `MAX_ORDER_QTY` varchar(245) DEFAULT NULL,
  `MIN_ORDER_QTY` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`PRODUCTCONF_ID`),
  KEY `PRODUCTCONF_FK1_idx` (`PRODUCT_ID`),
  CONSTRAINT `PRODUCTCONF_FK1` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `product` (`PRODUCT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productconf`
--

LOCK TABLES `productconf` WRITE;
/*!40000 ALTER TABLE `productconf` DISABLE KEYS */;
INSERT INTO `productconf` VALUES (1,1,260,'100','50',NULL,NULL,NULL,NULL,NULL),(2,2,385,'200','100',NULL,NULL,NULL,NULL,NULL),(13,20,0,'300','150',NULL,NULL,NULL,NULL,NULL),(14,21,27,'400','200',NULL,NULL,NULL,NULL,NULL),(15,25,10,'100','50',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `productconf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pspare`
--

DROP TABLE IF EXISTS `pspare`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pspare` (
  `PSPARE_ID` int NOT NULL AUTO_INCREMENT,
  `PRODUCT_ID` int NOT NULL,
  `NAME` varchar(750) NOT NULL,
  `DESCRIPTION` varchar(1000) DEFAULT NULL,
  `IMAGE1` varchar(245) DEFAULT NULL,
  `IMAGE2` varchar(245) DEFAULT NULL,
  `STATUS` varchar(45) NOT NULL,
  `PRICE` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`PSPARE_ID`),
  KEY `PSPARE_idx` (`PRODUCT_ID`),
  CONSTRAINT `PSPARE_FK2` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `product` (`PRODUCT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pspare`
--

LOCK TABLES `pspare` WRITE;
/*!40000 ALTER TABLE `pspare` DISABLE KEYS */;
INSERT INTO `pspare` VALUES (1,1,'Leg','Legs with wheel',NULL,NULL,'1','120'),(2,1,'Cover','Soft Covers',NULL,NULL,'1','130'),(3,2,'test','sdsdas',NULL,NULL,'1','150'),(5,2,'test','test test',NULL,NULL,'1','600'),(6,20,'Handle','Silver molded Handle',NULL,NULL,'1','450'),(10,2,'TEST03','               TEST TEST TEST',NULL,NULL,'1','200'),(11,21,'new','			new			 ',NULL,NULL,'1','200'),(15,1,'svv','vsdvfdvs						 ',NULL,NULL,'1','452');
/*!40000 ALTER TABLE `pspare` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rewards`
--

DROP TABLE IF EXISTS `rewards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rewards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reward_point` int DEFAULT '1',
  `cost_per_reward` int DEFAULT '1',
  `CREATETIME` timestamp NULL DEFAULT NULL,
  `UPDATETIME` timestamp NULL DEFAULT NULL,
  `STATUS` varchar(45) DEFAULT NULL,
  `ALLOWED_REWARD_POINTS` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rewards`
--

LOCK TABLES `rewards` WRITE;
/*!40000 ALTER TABLE `rewards` DISABLE KEYS */;
INSERT INTO `rewards` VALUES (1,1,1,'2021-02-19 08:09:27','2021-02-27 21:00:12','A',50);
/*!40000 ALTER TABLE `rewards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `ROLE_ID` int NOT NULL AUTO_INCREMENT,
  `IDENTIFIER` varchar(245) NOT NULL,
  `NAME` varchar(245) DEFAULT NULL,
  `DESCRIPTION` varchar(745) DEFAULT NULL,
  `FILED1` varchar(545) DEFAULT NULL,
  PRIMARY KEY (`ROLE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'HOD','Head Of the Department','Root Admin',NULL),(2,'A','Admin','Admin',NULL),(3,'DT','Distributor','Distributor',NULL),(4,'SE','Sales Executive','Sales Executive',NULL),(5,'DL','Dealer','Dealer',NULL),(6,'M','Member','Member',NULL),(7,'HM','Hr Manager','Hr Manager',NULL),(8,'FM','Finance Manager','Manager',NULL),(9,'AM','Account Manager','Account Manager',NULL),(10,'PM','Procurement Manager','Procurement Manager',NULL),(11,'OT','Other','Other',NULL),(12,'ST','Store','Store',NULL);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_target`
--

DROP TABLE IF EXISTS `sales_target`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_target` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `SALES_TARGET` varchar(45) DEFAULT NULL,
  `SALES_ACHIEVED` varchar(45) DEFAULT NULL,
  `SALES_TARGET_STATUS` int DEFAULT '0',
  `CREATETIME` timestamp NULL DEFAULT NULL,
  `UPDATETIME` timestamp NULL DEFAULT NULL,
  `USER_LOGIN_ID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_target`
--

LOCK TABLES `sales_target` WRITE;
/*!40000 ALTER TABLE `sales_target` DISABLE KEYS */;
INSERT INTO `sales_target` VALUES (1,2,'20533.65','13533.65',0,'2021-04-18 21:25:38','2021-04-18 21:25:38','mbm_sales_executive1'),(2,3,'20500.00','2737.75',0,'2021-04-18 21:25:38','2021-04-18 21:25:38','mbm_dealer1'),(3,4,'45000.00','46158.70',1,'2021-04-18 21:25:38','2021-04-19 00:19:48','mbm_distributor1'),(4,60,'20000','1486',0,'2021-04-19 01:21:29','2021-04-19 01:21:29','sales_boris_testco'),(5,39,'40000','0',0,'2021-04-23 03:07:34','2021-04-23 03:07:34','aaa'),(6,13,'60000','0',0,'2021-04-23 03:15:44','2021-04-23 03:15:44','CB_Sales'),(7,47,'6000000','0',0,'2021-04-23 03:38:12','2021-04-23 03:38:12','546456'),(8,38,'70000','0',0,'2021-04-23 03:38:29','2021-04-23 03:38:29','jsdn');
/*!40000 ALTER TABLE `sales_target` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `table_listnames`
--

DROP TABLE IF EXISTS `table_listnames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `table_listnames` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `tele` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table_listnames`
--

LOCK TABLES `table_listnames` WRITE;
/*!40000 ALTER TABLE `table_listnames` DISABLE KEYS */;
INSERT INTO `table_listnames` VALUES (1,'Rupert','Somewhere','022');
/*!40000 ALTER TABLE `table_listnames` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topcategory`
--

DROP TABLE IF EXISTS `topcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topcategory` (
  `TopCategoryId` int NOT NULL AUTO_INCREMENT,
  `Identifier` varchar(245) NOT NULL,
  `Name` varchar(245) DEFAULT NULL,
  `Description` varchar(1045) DEFAULT NULL,
  `Field1` varchar(750) DEFAULT NULL,
  `Field2` varchar(745) DEFAULT NULL,
  `Status` varchar(20) NOT NULL,
  PRIMARY KEY (`TopCategoryId`),
  UNIQUE KEY `TopCategoryId_UNIQUE` (`TopCategoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topcategory`
--

LOCK TABLES `topcategory` WRITE;
/*!40000 ALTER TABLE `topcategory` DISABLE KEYS */;
INSERT INTO `topcategory` VALUES (1,'MBM001','Chair Parts',NULL,NULL,NULL,'1'),(2,'MBM2003','Test','tegee',NULL,NULL,'1'),(3,'Handle ','Silver Handle','Silver Handle',NULL,NULL,'1'),(4,'','','',NULL,NULL,'1'),(5,'','','',NULL,NULL,'1'),(6,'','','new2',NULL,NULL,'1'),(7,'MBM202012','WHEEL CHAIRS','WHEEL CHAIRS',NULL,NULL,'1'),(8,'its.jaiganesh@gmail.com','Category','Description',NULL,NULL,'1'),(9,'','','',NULL,NULL,'1'),(10,'AA','CB','ssdf',NULL,NULL,'1');
/*!40000 ALTER TABLE `topcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `TRANSACTION_ID` int NOT NULL AUTO_INCREMENT,
  `ORDER_ID` int NOT NULL,
  `TRANSACTIONNO` varchar(255) DEFAULT NULL,
  `REFERENCE` varchar(255) DEFAULT NULL,
  `DESCRIPTION` varchar(1000) DEFAULT NULL,
  `STATUS` varchar(45) NOT NULL,
  `FIELD1` varchar(245) DEFAULT NULL,
  `FIELD2` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`TRANSACTION_ID`),
  KEY `TRANSACTIONS_FK2_idx` (`ORDER_ID`),
  CONSTRAINT `TRANSACTIONS_FK2` FOREIGN KEY (`ORDER_ID`) REFERENCES `orders` (`ORDER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `USER_ID` int NOT NULL AUTO_INCREMENT,
  `USER_TYPE` varchar(45) NOT NULL,
  `STATUS` varchar(45) NOT NULL,
  `LOGON_ID1` varchar(245) NOT NULL,
  `LOGON_ID2` varchar(255) DEFAULT NULL,
  `LOGON_ID3` varchar(255) DEFAULT NULL,
  `PASSWORD` varchar(245) NOT NULL,
  `PASSWORDSTATE` varchar(45) NOT NULL,
  `RETRYCOUNT` varchar(45) NOT NULL,
  `FIELD1` varchar(245) DEFAULT NULL,
  `FIELD2` varchar(245) DEFAULT NULL,
  `FIELD3` varchar(245) DEFAULT NULL,
  `usr_reward_points` int DEFAULT '0',
  PRIMARY KEY (`USER_ID`,`STATUS`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'A','1','mbm_hod1','',NULL,'UEBzc3cwcmQ=','1','0',NULL,NULL,NULL,0),(2,'A','1','mbm_sales_executive1',NULL,NULL,'UEBzc3cwcmQ=','1','0',NULL,NULL,NULL,647),(3,'A','1','mbm_dealer1',NULL,NULL,'UEBzc3cwcmQ=','1','0','emiratesId.jpg',NULL,NULL,1319),(4,'A','1','mbm_distributor1',NULL,NULL,'UEBzc3cwcmQ=','1','0',NULL,NULL,NULL,1637),(5,'A','0','vipin_se','98989898989','vipin@gmail.com','UEBzc3cwcmQ=','1','0',NULL,NULL,NULL,0),(6,'A','1','mbm_admin1',NULL,NULL,'UEBzc3cwcmQ=','1','0','Icon 3.jpg',NULL,NULL,0),(7,'A','1','uma_se','9178513603','uma@gmail.com','UEBzc3cwcmQ=','1','0',NULL,NULL,NULL,0),(8,'A','1','8056805053','8056805053','TEST0011@gmail.com','UXdlcnR5QDEyMzQ1','1','0',NULL,NULL,NULL,0),(10,'A','1','8056805053','8056805053','ba@gmail.com','UXdlcnR5QDEyMzQ1','1','0',NULL,NULL,NULL,0),(11,'A','1','8056805053','8056805053','sp.jothishkumar29@gmail.com','UXdlcnR5QDEyMzQ1','1','0',NULL,NULL,NULL,0),(12,'A','1','mbmchair_12_SE','','mbmchairavinash@gmail.com','UEBzc3cwcmQ=','1','0',NULL,NULL,NULL,0),(13,'A','1','CB_Sales ','9710942522','test@gmail.com','cGFzcyRxMTIz','1','0',NULL,NULL,NULL,0),(14,'A','1','8056805053','8056805053','sp.jothishkumar29@gmail.com','UXdlcnR5QDEyMzQ1','1','0',NULL,NULL,NULL,0),(15,'A','1','8056805053','8056805053','sp.jothishkumar29@gmail.com','UXdlcnR5QDEyMzQ1','1','0',NULL,NULL,NULL,0),(16,'A','1','8056805053','8056805053','sp.jothishkumar29@gmail.com','UXdlcnR5QDEyMzQ1','1','0',NULL,NULL,NULL,0),(17,'A','1','8056805053','8056805053','sp.jothishkumar29@gmail.com','UXdlcnR5QDEyMzQ1','1','0',NULL,NULL,NULL,0),(18,'A','1','8056805053','8056805053','sp.jothishkumar29@gmail.com','UXdlcnR5QDEyMzQ1','1','0',NULL,NULL,NULL,0),(19,'A','1','8056805053','8056805053','test@mail.com','UXdlcnR5QDEyMzQ1','1','0',NULL,NULL,NULL,0),(20,'A','1','jai','','','','1','0',NULL,NULL,NULL,0),(21,'A','1','jai','','','','1','0',NULL,NULL,NULL,0),(22,'A','1','jai','','','','1','0',NULL,NULL,NULL,0),(23,'A','1','jai','','','cGFzczEyMTI=','1','0',NULL,NULL,NULL,0),(24,'A','1','uss005','9178513603','uma@gmail.com','UEBzc3cwcmQ=','1','0',NULL,'L','2',0),(25,'A','1','other1','9178513603','uma@gmail.com','UEBzc3cwcmQ=','1','0',NULL,'L','2',0),(26,'A','1','mbmchairs_123','','abc@gmail.com','MTIzNDU2Nzg5','1','0',NULL,'L','2',0),(27,'A','1','aomdevuser_id','9178513603','uma@gmail.com','UEBzc3cwcmQ=','1','0',NULL,'L','2',0),(28,'A','0','nmlkjh','07384134971','abc@gmail.com','cXdlcnR5','1','0',NULL,'L',NULL,0),(29,'A','1','itsjaiganesh','','','cGFzcw==','1','0',NULL,'M',NULL,0),(30,'A','0','loginid','','','cGFzcw==','1','0',NULL,'L','2',0),(31,'A','0','itsjaiganesh','','','','1','0',NULL,'L','2',0),(32,'A','1','bakya','','backiyavalli@gmail.com','MTIzNA==','1','0',NULL,'M',NULL,0),(33,'A','1','test','','','MTIzNA==','1','0',NULL,'M',NULL,0),(34,'A','1','dealer','','cb@gmail.com','MTIzNA==','1','0',NULL,'M',NULL,0),(35,'A','1','distributor','','','MTIzNA==','1','0',NULL,'M',NULL,0),(36,'A','0','CB','9846466565','test@gmail.com','MTIzNA==','1','0',NULL,'L','32',0),(37,'A','1','ABC','','abc@gmail.com','MTIzNA==','1','0',NULL,'M',NULL,0),(38,'A','1','jsdn','','','MTIzNA==','1','0',NULL,'M',NULL,0),(39,'A','1','aaa','','vjdb@gmail.com','MTIz','1','0',NULL,'M',NULL,0),(40,'A','1','CB','','cb@gmail.om','MTIzNA==','1','0',NULL,'M',NULL,0),(41,'A','1','sdvdsv','','badhab@gmail.com','c3ZkZHM=','1','0',NULL,'M',NULL,0),(42,'A','1','213','','','','1','0',NULL,'M',NULL,0),(43,'A','1','sdf','','','','1','0',NULL,'M',NULL,0),(44,'A','1','sdf','','','','1','0',NULL,'M',NULL,0),(45,'A','1','1212213','','','','1','0',NULL,'M',NULL,0),(46,'A','1','hjkhjk','','','','1','0',NULL,'M',NULL,0),(47,'A','1','546456','','','','1','0',NULL,'M',NULL,0),(48,'A','1','ghkghkjhk','','','','1','0',NULL,'M',NULL,0),(49,'A','0','','','','','1','0',NULL,'L','2',0),(50,'A','1','itsjaiganesh','','','','1','0',NULL,'M',NULL,0),(51,'A','0','','','','','1','0',NULL,'L','2',0),(52,'A','0','','0987654321','sp.jothishkumar@gmail.com','','1','0',NULL,'L','2',0),(53,'A','0','','undefined','undefined','','1','0',NULL,'L','3',0),(54,'A','0','','undefined','undefined','','1','0',NULL,'L','2',0),(55,'A','0','','9051547754','test@mail.com','','1','0',NULL,'L','2',0),(56,'A','0','','9051547754','test@mail.com','','1','0',NULL,'L','2',0),(57,'A','0','mbm_sales_executive1','9051547754','test@mail.com','','1','0',NULL,'L','2',0),(58,'A','0','test@mail.com','9051547754','test@mail.com','','1','0',NULL,'L','2',0),(59,'A','1','sales_boris_1','9051547754','boris.biswas@gmail.com','dGVzdDEyMzQ=','1','0',NULL,'M',NULL,0),(60,'A','1','sales_boris_testco','90515477654','boris.biswas+1@gmail.com','dGVzdDEyMzQ=','1','0',NULL,'M',NULL,1387);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usrrel`
--

DROP TABLE IF EXISTS `usrrel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usrrel` (
  `USRREL_ID` int NOT NULL AUTO_INCREMENT,
  `USER_ID_FROM` int NOT NULL,
  `USER_ID_TO` int NOT NULL,
  PRIMARY KEY (`USRREL_ID`),
  KEY `USRREL_FK1_idx` (`USER_ID_FROM`),
  KEY `USRREL_FK2_idx` (`USER_ID_TO`),
  CONSTRAINT `USRREL_FK1` FOREIGN KEY (`USER_ID_FROM`) REFERENCES `user` (`USER_ID`),
  CONSTRAINT `USRREL_FK2` FOREIGN KEY (`USER_ID_TO`) REFERENCES `user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usrrel`
--

LOCK TABLES `usrrel` WRITE;
/*!40000 ALTER TABLE `usrrel` DISABLE KEYS */;
INSERT INTO `usrrel` VALUES (1,3,2),(2,4,2),(3,4,7),(4,3,8),(5,4,7),(6,4,8),(7,4,7),(8,20,8),(9,20,29),(10,34,32),(11,20,12),(12,3,13),(13,20,2),(14,4,12),(15,20,59),(16,20,60);
/*!40000 ALTER TABLE `usrrel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usrrole`
--

DROP TABLE IF EXISTS `usrrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usrrole` (
  `USRROLE_ID` int NOT NULL AUTO_INCREMENT,
  `USER_ID` int NOT NULL,
  `ROLE_ID` int NOT NULL,
  PRIMARY KEY (`USRROLE_ID`),
  KEY `USRROLE_FK1_idx` (`USER_ID`),
  KEY `USRROLE_FK2_idx` (`ROLE_ID`),
  CONSTRAINT `USRROLE_FK1` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`),
  CONSTRAINT `USRROLE_FK2` FOREIGN KEY (`ROLE_ID`) REFERENCES `role` (`ROLE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usrrole`
--

LOCK TABLES `usrrole` WRITE;
/*!40000 ALTER TABLE `usrrole` DISABLE KEYS */;
INSERT INTO `usrrole` VALUES (1,1,1),(2,2,4),(3,3,5),(4,4,3),(5,5,5),(6,6,2),(7,7,4),(8,8,4),(10,12,4),(11,13,4),(12,20,5),(13,24,11),(14,25,11),(15,26,11),(16,27,12),(17,28,11),(18,29,4),(19,30,3),(20,32,4),(21,33,4),(22,34,5),(23,35,3),(24,36,5),(25,37,5),(26,38,5),(27,39,3),(28,41,4),(29,42,5),(30,43,5),(31,45,5),(32,46,5),(33,47,5),(34,48,5),(35,49,5),(36,58,5),(37,59,4),(38,60,4);
/*!40000 ALTER TABLE `usrrole` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-25 10:00:50
