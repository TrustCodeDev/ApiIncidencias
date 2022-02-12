-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: incidencias
-- ------------------------------------------------------
-- Server version	8.0.27

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
  `nombre` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `eliminado` int DEFAULT '0' COMMENT '1: inactivo 0: activo',
  `f_create` datetime DEFAULT CURRENT_TIMESTAMP,
  `f_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `u_create` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `u_update` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
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
  `descripcion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `solucion` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `eliminado` int DEFAULT '0' COMMENT '1: inactivo 0: activo',
  `f_create` datetime DEFAULT CURRENT_TIMESTAMP,
  `f_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `u_create` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `u_update` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_usuario` bigint NOT NULL,
  PRIMARY KEY (`id_conocimiento`),
  UNIQUE KEY `id_conocimiento_UNIQUE` (`id_conocimiento`),
  KEY `fk_usuario_conocimiento_idx` (`id_usuario`),
  CONSTRAINT `fk_usuario_conocimiento` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
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
  `id_detalle_eqiupo` bigint NOT NULL AUTO_INCREMENT,
  `caracteristica` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `eliminado` int DEFAULT '0' COMMENT '1: inactivo 0: activo',
  `f_create` datetime DEFAULT CURRENT_TIMESTAMP,
  `f_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `u_create` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `u_update` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_equipo` bigint NOT NULL,
  PRIMARY KEY (`id_detalle_eqiupo`),
  UNIQUE KEY `id_detalle_eqiupo_UNIQUE` (`id_detalle_eqiupo`),
  KEY `fk_equipo_idx` (`id_equipo`),
  KEY `fk_equipo_id_DetalleEquipo` (`id_equipo`),
  CONSTRAINT `fk_equipo_detalleEquipo` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id_equipo`)
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
  `eliminado` int DEFAULT '0' COMMENT '1: inactivo 0: activo',
  `f_create` datetime DEFAULT CURRENT_TIMESTAMP,
  `f_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `u_create` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `u_update` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_incidencia` bigint NOT NULL,
  `id_conocimiento` bigint NOT NULL,
  PRIMARY KEY (`id_detalle_incidencia`),
  UNIQUE KEY `id_detalle_incidencia_UNIQUE` (`id_detalle_incidencia`),
  KEY `fk_incidencia_detalleIncidencia_idx` (`id_incidencia`),
  KEY `fk_conocimiento_detalleIncidente_idx` (`id_conocimiento`),
  CONSTRAINT `fk_conocimiento_detalleIncidente` FOREIGN KEY (`id_conocimiento`) REFERENCES `conocimiento` (`id_conocimiento`),
  CONSTRAINT `fk_incidencia_detalleIncidencia` FOREIGN KEY (`id_incidencia`) REFERENCES `incidencia` (`id_incidencia`)
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
  `descripcion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `eliminado` int DEFAULT '0' COMMENT '1: inactivo 0: activo',
  `f_create` datetime DEFAULT CURRENT_TIMESTAMP,
  `f_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `u_create` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `u_update` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_modelo` bigint NOT NULL,
  PRIMARY KEY (`id_equipo`),
  UNIQUE KEY `id_equipo_UNIQUE` (`id_equipo`),
  KEY `fk_modelo_equipo_idx` (`id_modelo`),
  CONSTRAINT `fk_modelo_equipo` FOREIGN KEY (`id_modelo`) REFERENCES `modelo` (`id_modelo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipo`
--

LOCK TABLES `equipo` WRITE;
/*!40000 ALTER TABLE `equipo` DISABLE KEYS */;
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
  `fecha_registro` datetime DEFAULT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_finalizacion` datetime DEFAULT NULL,
  `descripcion` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `nivel_incidencia` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `eliminado` int DEFAULT '0' COMMENT '1: inactivo 0: activo',
  `f_create` datetime DEFAULT CURRENT_TIMESTAMP,
  `f_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `u_create` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `u_update` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_usuario` bigint NOT NULL,
  `id_equipo` bigint NOT NULL,
  `id_area` bigint NOT NULL,
  PRIMARY KEY (`id_incidencia`),
  UNIQUE KEY `id_incidencia_UNIQUE` (`id_incidencia`),
  KEY `fk_usuario_idx` (`id_usuario`),
  KEY `fk_equipo_idx` (`id_equipo`),
  KEY `fk_area_idx` (`id_area`),
  CONSTRAINT `fk_area` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`),
  CONSTRAINT `fk_equipo` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id_equipo`),
  CONSTRAINT `fk_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incidencia`
--

LOCK TABLES `incidencia` WRITE;
/*!40000 ALTER TABLE `incidencia` DISABLE KEYS */;
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
  `nombre` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `eliminado` int DEFAULT '0' COMMENT '1: inactivo 0: activo',
  `f_create` datetime DEFAULT CURRENT_TIMESTAMP,
  `f_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `u_create` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `u_update` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id_marca`),
  UNIQUE KEY `id_marca_UNIQUE` (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (1,'HP',0,'2022-02-05 16:01:45','2022-02-05 16:06:00','rbueno','admin');
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
  `nombre` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `eliminado` int DEFAULT '0' COMMENT '1: inactivo 0: activo',
  `f_create` datetime DEFAULT CURRENT_TIMESTAMP,
  `f_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `u_create` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `u_update` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_marca` bigint NOT NULL,
  PRIMARY KEY (`id_modelo`),
  UNIQUE KEY `id_modelo_UNIQUE` (`id_modelo`),
  KEY `fk_id_marca_idx` (`id_marca`),
  CONSTRAINT `fk_id_marca` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modelo`
--

LOCK TABLES `modelo` WRITE;
/*!40000 ALTER TABLE `modelo` DISABLE KEYS */;
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
  `descripcion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `eliminado` int DEFAULT '0' COMMENT '1: inactivo 0: activo',
  `f_create` datetime DEFAULT CURRENT_TIMESTAMP,
  `f_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `u_create` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `u_update` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id_tipo_usuario`),
  UNIQUE KEY `id_tipo_usuario_UNIQUE` (`id_tipo_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuario`
--

LOCK TABLES `tipo_usuario` WRITE;
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
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
  `nombre` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `apellido` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sexo` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `telefono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `eliminado` int DEFAULT '0' COMMENT '1: inactivo 0: activo\n',
  `f_create` datetime DEFAULT CURRENT_TIMESTAMP,
  `f_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `u_create` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `u_update` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `nickname` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `contrasena` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_tipo_usuario` bigint NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `id_usuario_UNIQUE` (`id_usuario`),
  KEY `fk_tipo_usuario_idx` (`id_tipo_usuario`),
  CONSTRAINT `fk_tipo_usuario` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
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

-- Dump completed on 2022-02-12  0:46:39
