PRAGMA synchronous = OFF;
PRAGMA journal_mode = MEMORY;
BEGIN TRANSACTION;
CREATE TABLE `words` (
  `wordid` integer  NOT NULL DEFAULT '0'
,  `lemma` varchar(80) NOT NULL
,  PRIMARY KEY (`wordid`)
);
CREATE TABLE `casedwords` (
  `casedwordid` integer  NOT NULL DEFAULT '0'
,  `wordid` integer  NOT NULL DEFAULT '0'
,  `cased` varchar(80) NOT NULL
,  PRIMARY KEY (`casedwordid`)
);
CREATE TABLE `senses` (
  `wordid` integer  NOT NULL DEFAULT '0'
,  `casedwordid` integer  DEFAULT NULL
,  `synsetid` integer  NOT NULL DEFAULT '0'
,  `senseid` integer  DEFAULT NULL
,  `senstext`   NOT NULL DEFAULT '0'
,  `lexid` integer  NOT NULL DEFAULT '0'
,  `tagcount` integer  DEFAULT NULL
,  `sensekey` varchar(100) DEFAULT NULL
,  PRIMARY KEY (`wordid`,`synsetid`)
);
CREATE TABLE `synsets` (
  `synsetid` integer  NOT NULL DEFAULT '0'
,  `pos` text  DEFAULT NULL
,  `lexdomainid` integer  NOT NULL DEFAULT '0'
,  `definition` mediumtext
,  PRIMARY KEY (`synsetid`)
);
CREATE TABLE `linktypes` (
  `linkid` integer  NOT NULL DEFAULT '0'
,  `link` varchar(50) DEFAULT NULL
,  `recurses` integer NOT NULL DEFAULT '0'
,  PRIMARY KEY (`linkid`)
);
CREATE TABLE `semlinks` (
  `synset1id` integer  NOT NULL DEFAULT '0'
,  `synset2id` integer  NOT NULL DEFAULT '0'
,  `linkid` integer  NOT NULL DEFAULT '0'
,  PRIMARY KEY (`synset1id`,`synset2id`,`linkid`)
);
CREATE TABLE `lexlinks` (
  `synset1id` integer  NOT NULL DEFAULT '0'
,  `word1id` integer  NOT NULL DEFAULT '0'
,  `synset2id` integer  NOT NULL DEFAULT '0'
,  `word2id` integer  NOT NULL DEFAULT '0'
,  `linkid` integer  NOT NULL DEFAULT '0'
,  PRIMARY KEY (`word1id`,`synset1id`,`word2id`,`synset2id`,`linkid`)
);
CREATE TABLE `postypes` (
  `pos` text  NOT NULL
,  `posname` varchar(20) NOT NULL
,  PRIMARY KEY (`pos`)
);
CREATE TABLE `lexdomains` (
  `lexdomainid` integer  NOT NULL DEFAULT '0'
,  `lexdomainname` varchar(32) DEFAULT NULL
,  `pos` text  DEFAULT NULL
,  PRIMARY KEY (`lexdomainid`)
);
CREATE TABLE `morphmaps` (
  `wordid` integer  NOT NULL DEFAULT '0'
,  `pos` text  NOT NULL DEFAULT 'n'
,  `morphid` integer  NOT NULL DEFAULT '0'
,  PRIMARY KEY (`morphid`,`pos`,`wordid`)
);
CREATE TABLE `morphs` (
  `morphid` integer  NOT NULL DEFAULT '0'
,  `morph` varchar(70) NOT NULL
,  PRIMARY KEY (`morphid`)
);
CREATE TABLE `samples` (
  `synsetid` integer  NOT NULL DEFAULT '0'
,  `sampleid` integer  NOT NULL DEFAULT '0'
,  `sample` mediumtext NOT NULL
,  PRIMARY KEY (`synsetid`,`sampleid`)
);
CREATE TABLE `vframemaps` (
  `synsetid` integer  NOT NULL DEFAULT '0'
,  `wordid` integer  NOT NULL DEFAULT '0'
,  `frameid` integer  NOT NULL DEFAULT '0'
,  PRIMARY KEY (`synsetid`,`wordid`,`frameid`)
);
CREATE TABLE `vframes` (
  `frameid` integer  NOT NULL DEFAULT '0'
,  `frame` varchar(50) DEFAULT NULL
,  PRIMARY KEY (`frameid`)
);
CREATE TABLE `vframesentencemaps` (
  `synsetid` integer  NOT NULL DEFAULT '0'
,  `wordid` integer  NOT NULL DEFAULT '0'
,  `sentenceid` integer  NOT NULL DEFAULT '0'
,  PRIMARY KEY (`synsetid`,`wordid`,`sentenceid`)
);
CREATE TABLE `vframesentences` (
  `sentenceid` integer  NOT NULL DEFAULT '0'
,  `sentence` mediumtext
,  PRIMARY KEY (`sentenceid`)
);
CREATE TABLE `adjpositions` (
  `synsetid` integer  NOT NULL DEFAULT '0'
,  `wordid` integer  NOT NULL DEFAULT '0'
,  `position` text  NOT NULL DEFAULT 'a'
,  PRIMARY KEY (`synsetid`,`wordid`)
);
CREATE TABLE `adjpositiontypes` (
  `position` text  NOT NULL
,  `positionname` varchar(24) NOT NULL
,  PRIMARY KEY (`position`)
);
END TRANSACTION;
