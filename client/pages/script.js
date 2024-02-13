function convertCoordinates(longitude, latitude, width, height) {
    const x = (longitude + 180) * (width / 360);
    const y = (90 - latitude) * (height / 180);
    return { x, y };
}

const width = 995;
const height = 960;
let xScale, yScale;
let userLatitude, userLongitude; // variables pour stocker la position de l'utilisateur

const svg = d3.select("#svg3811")
    .attr("width", width)
    .attr("height", height);

// Fonction pour calculer la distance entre deux points géographiques en kilomètres
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // rayon de la Terre en km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d.toFixed(2); // distance arrondie à 2 décimales
}

// Récupérer la position de l'utilisateur
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showUserLocation);
    } else {
        alert("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }
}
// Fonction pour récupérer la ville de l'utilisateur
function getUserCity() {
    // Appel à l'API de géolocalisation inversée de GeoNames pour obtenir le nom de la ville
    fetch(`http://api.geonames.org/findNearbyPlaceNameJSON?lat=${userLatitude}&lng=${userLongitude}&username=demo`)
        .then(response => response.json())
        .then(data => {
            // Analyser la réponse pour obtenir le nom de la ville
            const cityName = data.geonames[0].name;

            // Afficher le nom de la ville sur la page
            const userCityElement = document.getElementById('user-city');
            if (userCityElement) {
                userCityElement.textContent = `Vous êtes à ${cityName}`;
                userCityElement.style.display = 'block';
            } else {
                console.error("L'élément user-city n'existe pas dans le DOM.");
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la ville de l\'utilisateur:', error);
        });
}

// Appel de la fonction pour récupérer la position de l'utilisateur
getUserCity();

// Afficher la position de l'utilisateur sur la carte
// Afficher la position de l'utilisateur sur la carte
function showUserLocation(position) {
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;

    // Appel à l'API de géolocalisation inversée pour obtenir le nom de la ville
    fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${userLatitude}&lon=${userLongitude}&limit=1&appid=YOUR_API_KEY`)
        .then(response => response.json())
        .then(data => {
            // Analyser la réponse pour obtenir le nom de la ville
            const cityName = data[0].name;

            // Afficher le nom de la ville sur la page
            const distanceElement = document.getElementById('user-distance');
            if (distanceElement) {
                distanceElement.textContent = `Vous êtes à ${cityName}`;
                distanceElement.style.display = 'block';
            } else {
                console.error("L'élément user-distance n'existe pas dans le DOM.");
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la ville de l\'utilisateur:', error);
        });
}


// Appel de la fonction pour récupérer la position de l'utilisateur
getUserLocation();

fetch('http://localhost:8080/cities')
    .then(response => response.json())
    .then(data => {
        console.log('Données récupérées avec succès :', data);

        //const mainCities = ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Montpellier", "Strasbourg", "Bordeaux", "Lille", "Rennes", "Reims", "Toulon", "Grenoble", "Dijon", "Angers"];
        // const displayCities = data.filter(city => mainCities.includes(city.name));
        // console.log(displayCities);

        let minLongitude = -5;
        let maxLongitude = 10;
        let minLatitude = 41;
        let maxLatitude = 51;

        xScale = d3.scaleLinear()
            .domain([minLongitude, maxLongitude])
            .range([49, width]);

        yScale = d3.scaleLinear()
            .domain([minLatitude, maxLatitude])
            .range([height, 57]);

            svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.longitude))
            .attr("cy", d => yScale(d.latitude))
            .attr("r", 3)
            .attr("fill", "red")
            .append("title")
            .text(d => `${d.name}, ${d.region}, Population: ${d.population}`); // Assurez-vous que les données sont correctement utilisées ici
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
    });






function handleRegionClick(d) {
    const event = d3.event;
    const regionId = event.target.id;
    const regionName = event.target.getAttribute('name');

    fetch(`http://localhost:8080/cities?region=${regionName}`)
        .then(response => response.json())
        .then(allCities => {
            const citiesInRegion = allCities.filter(city => city.region === regionName);
            citiesInRegion.sort((a, b) => a.name.localeCompare(b.name));

            const listElement = document.getElementById('list');
            listElement.innerHTML = `<h2>Villes en ${regionName}</h2><ul id="citiesList"></ul>`;
            const citiesList = document.getElementById('citiesList');
            citiesInRegion.forEach(city => {
                const cityItem = document.createElement('li');
                cityItem.textContent = city.name;
                citiesList.appendChild(cityItem);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des villes:', error);
        });
}

d3.selectAll('path').on('click', handleRegionClick);

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search-btn').addEventListener('click', function() {
        const cityName = document.getElementById('search-input').value;
        if (cityName) {
            // Supprimer tous les cercles bleus existants de la carte SVG
            svg.selectAll("circle.blue-circle").remove();

            fetch(`http://localhost:8080/cities`)
                .then(response => response.json())
                .then(data => {
                    const city = data.find(city => city.name.toLowerCase() === cityName.toLowerCase());
                    if (!city) {
                        document.getElementById('city-info').innerHTML = 'Aucune ville trouvée.';
                        return;
                    }

                    const distance = calculateDistance(userLatitude, userLongitude, city.latitude, city.longitude);

                    const cityInfoHTML = `
                        <h3>${city.name}</h3>
                        <p>Latitude: ${city.latitude}</p>
                        <p>Longitude: ${city.longitude}</p>
                        <p>Région: ${city.region}</p>
                        <p>Population: ${city.population.toLocaleString()}</p>
                        <p>Distance de votre position: ${distance} km</p>
                    `;
                    document.getElementById('city-info').innerHTML = cityInfoHTML;

                    // Ajouter le nouveau cercle avec la classe blue-circle pour identifier les points bleus
                    const { x, y } = convertCoordinates(city.longitude, city.latitude, width, height);
                    svg.append("circle")
                        .attr("cx", xScale(city.longitude))
                        .attr("cy", yScale(city.latitude))
                        .attr("r", 3)
                        .attr("fill", "blue")
                        .classed("blue-circle", true) // Ajouter la classe blue-circle
                        .append("title")
                        .text(city.name);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des villes:', error);
                });
        }
    });
});
// Fonction pour gérer le clic sur la carte
function handleMapClick(event) {
    const [clickedX, clickedY] = d3.mouse(this); // Récupérer les coordonnées du point cliqué
    const clickedLongitude = xScale.invert(clickedX); // Convertir les coordonnées en longitude
    const clickedLatitude = yScale.invert(clickedY); // Convertir les coordonnées en latitude

    // Appel à l'API de géolocalisation inversée pour obtenir le nom de la ville
    fetch(`http://api.geonames.org/findNearbyPlaceNameJSON?lat=${clickedLatitude}&lng=${clickedLongitude}&username=demo`)
        .then(response => response.json())
        .then(data => {
            const cityName = data.geonames[0].name; // Récupérer le nom de la ville depuis la réponse de l'API
            alert(`La ville à cet emplacement est : ${cityName}`); // Afficher le nom de la ville dans une boîte de dialogue
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la ville:', error);
        });
}

// Ajouter un gestionnaire de clic sur l'élément SVG pour gérer les clics sur la carte
svg.on('click', handleMapClick);


