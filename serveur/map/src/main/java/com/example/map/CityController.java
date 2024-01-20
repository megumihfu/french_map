package com.example.map;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/cities")
public class CityController {
    private static final String JSON_FILE_PATH = "fr-10.json";

    @GetMapping
    public List<City> getAllCities() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            // Utiliser ClassLoader pour charger le fichier depuis le classpath
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream(JSON_FILE_PATH);
            if (inputStream == null) {
                throw new IOException("Cannot find resource: " + JSON_FILE_PATH);
            }
            City[] cities = mapper.readValue(inputStream, City[].class);
            return Arrays.asList(cities);
        } catch (IOException e) {
            e.printStackTrace();
            return null; // Vous devriez gérer l'
        }
    }
}