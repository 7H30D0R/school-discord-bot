/*
Target Server Type    : MYSQL
Target Server Version : 50730
File Encoding         : 65001

Date: 2020-05-14 19:51:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for answers
-- ----------------------------
DROP TABLE IF EXISTS `answers`;
CREATE TABLE `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL DEFAULT '-1',
  `caption` varchar(255) NOT NULL DEFAULT '',
  `correct` tinyint(1) NOT NULL DEFAULT '1',
  `regex` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of answers
-- ----------------------------
INSERT INTO `answers` VALUES ('1', '1', '3.14159', '1', '0');
INSERT INTO `answers` VALUES ('2', '1', '3.14169', '0', '0');
INSERT INTO `answers` VALUES ('3', '1', '3.12423', '0', '0');
INSERT INTO `answers` VALUES ('4', '1', '3.25812', '0', '0');
INSERT INTO `answers` VALUES ('5', '2', 'D', '1', '0');
INSERT INTO `answers` VALUES ('6', '2', 'L', '0', '0');
INSERT INTO `answers` VALUES ('7', '2', 'C', '0', '0');
INSERT INTO `answers` VALUES ('8', '2', 'X', '0', '0');
INSERT INTO `answers` VALUES ('9', '3', '5', '0', '0');
INSERT INTO `answers` VALUES ('10', '3', '6', '0', '0');
INSERT INTO `answers` VALUES ('11', '3', '7', '1', '0');
INSERT INTO `answers` VALUES ('12', '3', '8', '0', '0');
INSERT INTO `answers` VALUES ('13', '4', '1B', '0', '0');
INSERT INTO `answers` VALUES ('14', '4', '1F', '1', '0');
INSERT INTO `answers` VALUES ('15', '4', '3D', '0', '0');
INSERT INTO `answers` VALUES ('16', '4', '2E', '0', '0');
INSERT INTO `answers` VALUES ('17', '5', '3', '0', '0');
INSERT INTO `answers` VALUES ('18', '5', '4', '0', '0');
INSERT INTO `answers` VALUES ('19', '5', '5', '0', '0');
INSERT INTO `answers` VALUES ('20', '5', '6', '1', '0');

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('-1', 'Ingen kategori');
INSERT INTO `categories` VALUES ('1', 'Matematik');

-- ----------------------------
-- Table structure for questions
-- ----------------------------
DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quiz_id` int(11) NOT NULL DEFAULT '-1',
  `caption` varchar(255) NOT NULL DEFAULT '',
  `type` enum('text_input','multiple_choice') NOT NULL DEFAULT 'multiple_choice',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of questions
-- ----------------------------
INSERT INTO `questions` VALUES ('1', '1', 'Hvad er de første 6 cifre i pi?', 'multiple_choice');
INSERT INTO `questions` VALUES ('2', '1', 'Hvad er romertallet for 500?', 'multiple_choice');
INSERT INTO `questions` VALUES ('3', '1', 'Hvor mange sider har et heptagon?', 'multiple_choice');
INSERT INTO `questions` VALUES ('4', '1', 'Hvad er decimal nummeret 31 i hexadecimal?', 'multiple_choice');
INSERT INTO `questions` VALUES ('5', '1', 'Til det nærmeste hele tal, hvor mange radianer er der i en hel cirkel?', 'multiple_choice');

-- ----------------------------
-- Table structure for quizzes
-- ----------------------------
DROP TABLE IF EXISTS `quizzes`;
CREATE TABLE `quizzes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL DEFAULT '',
  `description` text,
  `public` tinyint(1) NOT NULL DEFAULT '1',
  `category_id` int(11) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of quizzes
-- ----------------------------
INSERT INTO `quizzes` VALUES ('1', 'Generel matematik', 'Denne quiz indeholder generelle spørgsmål relaterede til matematik.', '1', '1');
