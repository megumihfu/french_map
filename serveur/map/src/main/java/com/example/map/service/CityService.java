package com.example.map.service;

import com.example.map.entity.City;
import com.example.map.repository.CityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {

    private final CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<City> getAllCities() {
        return cityRepository.findAll();
    }
    public List<City> findAllCities() {
        return cityRepository.findAll();
    }

    // Trouver les villes par nom de région
    public List<City> findCitiesByRegion(String region) {
        return cityRepository.findByRegion(region);
    }

}
