-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `id_area` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `estado` varchar(200) NOT NULL,
  `eliminado` tinyint DEFAULT NULL,
  `f_create` datetime NOT NULL,
  `f_update` datetime DEFAULT NULL,
  `u_create` varchar(200) NOT NULL,
  `u_update` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_area`),
  UNIQUE KEY `id_area_UNIQUE` (`id_area`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conocimiento`
--

DROP TABLE IF EXISTS `conocimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conocimiento` (
  `id_conocimiento` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `solucion` varchar(200) NOT NULL,
  `usuario` varchar(200) NOT NULL,
  `eliminado` tinyint DEFAULT NULL,
  `f_create` datetime NOT NULL,
  `f_update` datetime DEFAULT NULL,
  `u_create` varchar(200) NOT NULL,
  `u_update` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_conocimiento`),
  UNIQUE KEY `id_conocimiento_UNIQUE` (`id_conocimiento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conocimiento`
--

LOCK TABLES `conocimiento` WRITE;
/*!40000 ALTER TABLE `conocimiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `conocimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_equipo`
--

DROP TABLE IF EXISTS `detalle_equipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_equipo` (
  `id_detalle_equipo` bigint NOT NULL AUTO_INCREMENT,
  `caracteristica` varchar(200) NOT NULL,
  `eliminado` tinyint DEFAULT NULL,
  `f_create` datetime NOT NULL,
  `f_update` datetime DEFAULT NULL,
  `u_create` varchar(200) NOT NULL,
  `u_update` varchar(200) DEFAULT NULL,
  `id_equipo` bigint NOT NULL,
  PRIMARY KEY (`id_detalle_equipo`),
  UNIQUE KEY `id_detalle_equipo_UNIQUE` (`id_detalle_equipo`),
  KEY `FK_equipo_detalle_equipo_idx` (`id_equipo`),
  CONSTRAINT `FK_equipo_detalle_equipo` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id_equipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_equipo`
--

LOCK TABLES `detalle_equipo` WRITE;
/*!40000 ALTER TABLE `detalle_equipo` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_equipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_incidencia`
--

DROP TABLE IF EXISTS `detalle_incidencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_incidencia` (
  `id_detalle_incidencia` bigint NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `eliminado` tinyint DEFAULT NULL,
  `f_create` datetime NOT NULL,
  `f_update` datetime DEFAULT NULL,
  `u_create` varchar(200) NOT NULL,
  `u_update` varchar(200) DEFAULT NULL,
  `usuario_id_usuario` bigint NOT NULL,
  `usuario_tipo_usuario_id_tipo_usuario` bigint NOT NULL,
  `incidencia_id_incidencia` bigint NOT NULL,
  `area_id_area` bigint NOT NULL,
  `conocimiento_id_conocimiento` bigint NOT NULL,
  PRIMARY KEY (`id_detalle_incidencia`,`usuario_id_usuario`,`usuario_tipo_usuario_id_tipo_usuario`,`incidencia_id_incidencia`,`area_id_area`,`conocimiento_id_conocimiento`),
  UNIQUE KEY `id_detalle_incidencia_UNIQUE` (`id_detalle_incidencia`),
  KEY `fk_detalle_incidencia_usuario1_idx` (`usuario_id_usuario`,`usuario_tipo_usuario_id_tipo_usuario`),
  KEY `fk_detalle_incidencia_incidencia1_idx` (`incidencia_id_incidencia`),
  KEY `fk_detalle_incidencia_area1_idx` (`area_id_area`),
  KEY `fk_detalle_incidencia_conocimiento1_idx` (`conocimiento_id_conocimiento`),
  CONSTRAINT `fk_detalle_incidencia_area1` FOREIGN KEY (`area_id_area`) REFERENCES `area` (`id_area`),
  CONSTRAINT `fk_detalle_incidencia_conocimiento1` FOREIGN KEY (`conocimiento_id_conocimiento`) REFERENCES `conocimiento` (`id_conocimiento`),
  CONSTRAINT `fk_detalle_incidencia_incidencia1` FOREIGN KEY (`incidencia_id_incidencia`) REFERENCES `incidencia` (`id_incidencia`),
  CONSTRAINT `fk_detalle_incidencia_usuario1` FOREIGN KEY (`usuario_id_usuario`, `usuario_tipo_usuario_id_tipo_usuario`) REFERENCES `usuario` (`id_usuario`, `tipo_usuario_id_tipo_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_incidencia`
--

LOCK TABLES `detalle_incidencia` WRITE;
/*!40000 ALTER TABLE `detalle_incidencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_incidencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipo`
--

DROP TABLE IF EXISTS `equipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipo` (
  `id_equipo` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) NOT NULL,
  `eliminado` tinyint DEFAULT NULL,
  `f_create` datetime NOT NULL,
  `f_update` datetime DEFAULT NULL,
  `u_create` varchar(200) NOT NULL,
  `u_update` varchar(200) DEFAULT NULL,
  `modelo_id_modelo` bigint NOT NULL,
  PRIMARY KEY (`id_equipo`,`modelo_id_modelo`),
  UNIQUE KEY `id_equipo_UNIQUE` (`id_equipo`),
  KEY `fk_equipo_modelo_idx` (`modelo_id_modelo`),
  CONSTRAINT `fk_equipo_modelo` FOREIGN KEY (`modelo_id_modelo`) REFERENCES `modelo` (`id_modelo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipo`
--

LOCK TABLES `equipo` WRITE;
/*!40000 ALTER TABLE `equipo` DISABLE KEYS */;
INSERT INTO `equipo` VALUES (1,'Equipo 1 - HP',0,'2022-01-23 17:52:02','2022-01-23 17:52:02','rbalbis','rbalbis',1);
/*!40000 ALTER TABLE `equipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incidencia`
--

DROP TABLE IF EXISTS `incidencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incidencia` (
  `id_incidencia` bigint NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime NOT NULL,
  `fecha_finalizacion` datetime DEFAULT NULL,
  `descripcion` varchar(200) NOT NULL,
  `usuario` varchar(200) NOT NULL,
  `nivel_incidencia` varchar(200) NOT NULL,
  `eliminado` tinyint DEFAULT NULL,
  `f_create` datetime NOT NULL,
  `f_update` datetime DEFAULT NULL,
  `u_create` varchar(200) NOT NULL,
  `u_update` varchar(200) DEFAULT NULL,
  `equipo_id_equipo` bigint NOT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  PRIMARY KEY (`id_incidencia`,`equipo_id_equipo`),
  UNIQUE KEY `id_incidencia_UNIQUE` (`id_incidencia`),
  KEY `fk_incidencia_equipo1_idx` (`equipo_id_equipo`),
  CONSTRAINT `fk_incidencia_equipo1` FOREIGN KEY (`equipo_id_equipo`) REFERENCES `equipo` (`id_equipo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incidencia`
--

LOCK TABLES `incidencia` WRITE;
/*!40000 ALTER TABLE `incidencia` DISABLE KEYS */;
INSERT INTO `incidencia` VALUES (1,'2022-01-27 16:34:13','2022-01-30 17:52:02','Incidencia N2 - Problemas de mouse','Desactivado','Alto',0,'2022-01-27 16:34:13','2022-01-27 17:12:10','rbalbis','rbalbis',1,'2022-01-28 17:52:02');
/*!40000 ALTER TABLE `incidencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `id_marca` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `eliminado` tinyint DEFAULT NULL,
  `f_create` datetime NOT NULL,
  `f_update` datetime DEFAULT NULL,
  `u_create` varchar(200) NOT NULL,
  `u_update` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_marca`),
  UNIQUE KEY `id_marca_UNIQUE` (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (4,'HP',0,'2022-01-27 16:03:22','2022-01-27 16:03:22','rbalbis','rbalbis');
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modelo`
--

DROP TABLE IF EXISTS `modelo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modelo` (
  `id_modelo` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `eliminado` tinyint DEFAULT NULL,
  `f_create` datetime NOT NULL,
  `f_update` datetime DEFAULT NULL,
  `u_create` varchar(200) NOT NULL,
  `u_update` varchar(200) DEFAULT NULL,
  `marca_id_marca` bigint NOT NULL,
  PRIMARY KEY (`id_modelo`,`marca_id_marca`),
  UNIQUE KEY `id_modelo_UNIQUE` (`id_modelo`),
  KEY `fk_modelo_marca1_idx` (`marca_id_marca`),
  CONSTRAINT `fk_modelo_marca1` FOREIGN KEY (`marca_id_marca`) REFERENCES `marca` (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modelo`
--

LOCK TABLES `modelo` WRITE;
/*!40000 ALTER TABLE `modelo` DISABLE KEYS */;
INSERT INTO `modelo` VALUES (1,'XC-300',0,'2022-01-23 17:52:02','2022-01-23 17:52:02','rbalbis','rbalbis',4);
/*!40000 ALTER TABLE `modelo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_usuario` (
  `id_tipo_usuario` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) NOT NULL,
  `estado` varchar(200) NOT NULL,
  `eliminado` tinyint DEFAULT NULL,
  `f_create` datetime NOT NULL,
  `f_update` datetime DEFAULT NULL,
  `u_create` varchar(200) NOT NULL,
  `u_update` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_usuario`),
  UNIQUE KEY `id_tipo_usuario_UNIQUE` (`id_tipo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuario`
--

LOCK TABLES `tipo_usuario` WRITE;
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
INSERT INTO `tipo_usuario` VALUES (1,'Administrador','Activo',0,'2022-01-19 01:30:11','2022-01-23 17:51:16','rwillians','rwillians'),(2,'Normal','Activo',0,'2022-01-20 23:16:44','2022-01-26 16:46:39','rbalbis','rbalbis');
/*!40000 ALTER TABLE `tipo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `apellido` varchar(200) NOT NULL,
  `sexo` varchar(200) NOT NULL,
  `telefono` int NOT NULL,
  `estado` varchar(200) NOT NULL,
  `eliminado` tinyint DEFAULT NULL,
  `f_create` datetime NOT NULL,
  `f_update` datetime DEFAULT NULL,
  `u_create` varchar(200) NOT NULL,
  `u_update` varchar(200) DEFAULT NULL,
  `tipo_usuario_id_tipo_usuario` bigint NOT NULL,
  `nickname` varchar(200) NOT NULL,
  PRIMARY KEY (`id_usuario`,`tipo_usuario_id_tipo_usuario`),
  UNIQUE KEY `id_usuario_UNIQUE` (`id_usuario`),
  KEY `fk_usuario_tipo_usuario1_idx` (`tipo_usuario_id_tipo_usuario`),
  CONSTRAINT `fk_usuario_tipo_usuario1` FOREIGN KEY (`tipo_usuario_id_tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (7,'Ricardo','Willians','Hombre',314251,'Activo',0,'2022-01-23 17:52:02','2022-01-23 18:54:53','rwillians','rwillians',2,'rwilliams'),(8,'Ricardo','Balbis','Hombre',625232,'Activo',0,'2022-01-23 17:54:29','2022-01-24 20:28:21','rbalbis','rbalbis',1,'rbalbis');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-28 21:46:17
