-- MySQL dump 10.13  Distrib 5.5.24, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: wordnet31_snapshot
-- ------------------------------------------------------
-- Server version	5.5.24-0ubuntu0.12.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `words`
--

DROP TABLE IF EXISTS `words`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `words` (
  `wordid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `lemma` varchar(80) NOT NULL,
  PRIMARY KEY (`wordid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `casedwords`
--

DROP TABLE IF EXISTS `casedwords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `casedwords` (
  `casedwordid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `wordid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `cased` varchar(80) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`casedwordid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `senses`
--

DROP TABLE IF EXISTS `senses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `senses` (
  `wordid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `casedwordid` mediumint(8) unsigned DEFAULT NULL,
  `synsetid` int(10) unsigned NOT NULL DEFAULT '0',
  `senseid` mediumint(8) unsigned DEFAULT NULL,
  `sensenum` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `lexid` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `tagcount` mediumint(8) unsigned DEFAULT NULL,
  `sensekey` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`wordid`,`synsetid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `synsets`
--

DROP TABLE IF EXISTS `synsets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `synsets` (
  `synsetid` int(10) unsigned NOT NULL DEFAULT '0',
  `pos` enum('n','v','a','r','s') DEFAULT NULL,
  `lexdomainid` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `definition` mediumtext,
  PRIMARY KEY (`synsetid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `linktypes`
--

DROP TABLE IF EXISTS `linktypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `linktypes` (
  `linkid` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `link` varchar(50) DEFAULT NULL,
  `recurses` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`linkid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `semlinks`
--

DROP TABLE IF EXISTS `semlinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `semlinks` (
  `synset1id` int(10) unsigned NOT NULL DEFAULT '0',
  `synset2id` int(10) unsigned NOT NULL DEFAULT '0',
  `linkid` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`synset1id`,`synset2id`,`linkid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lexlinks`
--

DROP TABLE IF EXISTS `lexlinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lexlinks` (
  `synset1id` int(10) unsigned NOT NULL DEFAULT '0',
  `word1id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `synset2id` int(10) unsigned NOT NULL DEFAULT '0',
  `word2id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `linkid` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`word1id`,`synset1id`,`word2id`,`synset2id`,`linkid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `postypes`
--

DROP TABLE IF EXISTS `postypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `postypes` (
  `pos` enum('n','v','a','r','s') NOT NULL,
  `posname` varchar(20) NOT NULL,
  PRIMARY KEY (`pos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lexdomains`
--

DROP TABLE IF EXISTS `lexdomains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lexdomains` (
  `lexdomainid` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `lexdomainname` varchar(32) DEFAULT NULL,
  `pos` enum('n','v','a','r','s') DEFAULT NULL,
  PRIMARY KEY (`lexdomainid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `morphmaps`
--

DROP TABLE IF EXISTS `morphmaps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `morphmaps` (
  `wordid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `pos` enum('n','v','a','r','s') NOT NULL DEFAULT 'n',
  `morphid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`morphid`,`pos`,`wordid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `morphs`
--

DROP TABLE IF EXISTS `morphs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `morphs` (
  `morphid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `morph` varchar(70) NOT NULL,
  PRIMARY KEY (`morphid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `samples`
--

DROP TABLE IF EXISTS `samples`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `samples` (
  `synsetid` int(10) unsigned NOT NULL DEFAULT '0',
  `sampleid` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `sample` mediumtext NOT NULL,
  PRIMARY KEY (`synsetid`,`sampleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vframemaps`
--

DROP TABLE IF EXISTS `vframemaps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vframemaps` (
  `synsetid` int(10) unsigned NOT NULL DEFAULT '0',
  `wordid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `frameid` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`synsetid`,`wordid`,`frameid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vframes`
--

DROP TABLE IF EXISTS `vframes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vframes` (
  `frameid` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `frame` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`frameid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vframesentencemaps`
--

DROP TABLE IF EXISTS `vframesentencemaps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vframesentencemaps` (
  `synsetid` int(10) unsigned NOT NULL DEFAULT '0',
  `wordid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `sentenceid` smallint(5) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`synsetid`,`wordid`,`sentenceid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vframesentences`
--

DROP TABLE IF EXISTS `vframesentences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vframesentences` (
  `sentenceid` smallint(5) unsigned NOT NULL DEFAULT '0',
  `sentence` mediumtext,
  PRIMARY KEY (`sentenceid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `adjpositions`
--

DROP TABLE IF EXISTS `adjpositions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adjpositions` (
  `synsetid` int(10) unsigned NOT NULL DEFAULT '0',
  `wordid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `position` enum('a','p','ip') NOT NULL DEFAULT 'a',
  PRIMARY KEY (`synsetid`,`wordid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `adjpositiontypes`
--

DROP TABLE IF EXISTS `adjpositiontypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adjpositiontypes` (
  `position` enum('a','p','ip') NOT NULL,
  `positionname` varchar(24) NOT NULL,
  PRIMARY KEY (`position`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2012-07-11  1:50:43
