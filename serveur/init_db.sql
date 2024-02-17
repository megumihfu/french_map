CREATE DATABASE IF NOT EXISTS french_map;
USE french_map;

DROP TABLE IF EXISTS city;

CREATE TABLE city (
    nom VARCHAR(255),
    latitude DOUBLE,
    longitude DOUBLE,
    region VARCHAR(255),
    population INT
) ENGINE=InnoDB AUTO_INCREMENT=2019 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOAD DATA INFILE '/var/lib/mysql-files/fr2.csv' INTO TABLE city 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS;

ALTER TABLE city
ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY FIRST;

DELETE FROM city WHERE region = "Corsica";