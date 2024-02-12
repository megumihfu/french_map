#!/bin/bash

cp /app/fr2.csv /var/lib/mysql-files/fr2.csv

mysql -uroot -proot << EOF
CREATE DATABASE IF NOT EXISTS french_map;
USE french_map;

CREATE TABLE IF NOT EXISTS city (
    nom VARCHAR(255),
    latitude DOUBLE,
    longitude DOUBLE,
    region VARCHAR(255),
    population INT
);

LOAD DATA INFILE '/var/lib/mysql-files/fr2.csv' INTO TABLE city
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

ALTER TABLE city
ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY FIRST;

DELETE FROM city WHERE region = "Corsica";
EOF
