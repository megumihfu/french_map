package com.example.map.repository;

import com.example.map.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List; // Assurez-vous d'importer List


public interface CityRepository extends JpaRepository<City, Long> {
    // Méthode pour trouver les villes par nom de région
    List<City> findByRegion(String region);

}



