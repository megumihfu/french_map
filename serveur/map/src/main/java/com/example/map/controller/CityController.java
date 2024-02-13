import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CityController {

    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    // Récupère toutes les villes
    @GetMapping("/cities")
    public ResponseEntity<List<City>> getAllCities() {
        List<City> cities = cityService.findAllCities();
        return ResponseEntity.ok(cities);
    }

    // Récupère une ville par son nom
    @GetMapping("/cities/search")
    public ResponseEntity<City> getCityByName(@RequestParam String name) {
        return cityService.findCityByName(name)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Récupère les villes par région
    @GetMapping("/cities/region/{regionName}")
    public ResponseEntity<List<City>> getCitiesByRegion(@PathVariable String regionName) {
        List<City> cities = cityService.findCitiesByRegion(regionName);
        return ResponseEntity.ok(cities);
    }

    // Ajoute une nouvelle ville
    @PostMapping("/cities")
    public ResponseEntity<City> createCity(@RequestBody City city) {
        City savedCity = cityService.saveCity(city);
        return ResponseEntity.ok(savedCity);
    }

    // Met à jour une ville existante
    @PutMapping("/cities/{id}")
    public ResponseEntity<City> updateCity(@PathVariable Long id, @RequestBody City city) {
        return cityService.updateCity(id, city)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Supprime une ville
    @DeleteMapping("/cities/{id}")
    public ResponseEntity<Void> deleteCity(@PathVariable Long id) {
        cityService.deleteCity(id);
        return ResponseEntity.ok().build();
    }
}
