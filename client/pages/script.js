document.addEventListener('DOMContentLoaded', function() {
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
    // function getUserCity() {
    //     // Appel à l'API de géolocalisation inversée de GeoNames pour obtenir le nom de la ville
    //     fetch(`http://api.geonames.org/findNearbyPlaceNameJSON?lat=${userLatitude}&lng=${userLongitude}&username=demo`)
    //         .then(response => response.json())
    //         .then(data => {
    //             // Analyser la réponse pour obtenir le nom de la ville
    //             const cityName = data.geonames[0].name;
    
    //             // Afficher le nom de la ville sur la page
    //             const userCityElement = document.getElementById('user-city');
    //             if (userCityElement) {
    //                 userCityElement.textContent = `Vous êtes à ${cityName}`;
    //                 userCityElement.style.display = 'block';
    //             } else {
    //                 console.error("L'élément user-city n'existe pas dans le DOM.");
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Erreur lors de la récupération de la ville de l\'utilisateur:', error);
    //         });
    // }
    
    // Appel de la fonction pour récupérer la position de l'utilisateur
    // getUserCity();
    
    // Afficher la position de l'utilisateur sur la carte
    function showUserLocation(position) {
        userLatitude = position.coords.latitude;
        userLongitude = position.coords.longitude;
    
        // Appel à l'API de géolocalisation inversée pour obtenir le nom de la ville
        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${userLatitude}&lon=${userLongitude}&limit=1&appid=d4086e6a6b02ceb76c524da872107b58
        `)
            .then(response => response.json())
            .then(data => {
                // Analyser la réponse pour obtenir le nom de la ville
                const cityName = data[0].name;
    
                // Afficher le nom de la ville sur la page
                const distanceElement = document.getElementById('user-distance');
                if (distanceElement) {
                    distanceElement.textContent = `Vous êtes à : ${cityName}`;
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
                .attr("fill", "#FFFFCC")
                .on("click", function(d) {
            // Récupérer les informations de la ville
            const cityName = d.name;
            const cityRegion = d.region;
            const cityPopulation = d.population;
            const cityDistance = calculateDistance(userLatitude, userLongitude, d.latitude, d.longitude);
    
            // Mettre à jour le contenu de l'élément city-info avec les informations de la ville
            const cityInfoElement = document.getElementById('city-info2');
            cityInfoElement.innerHTML = `
                <h2>Information sur la ville sélectionnée </h2>
                <h3>${cityName}</h3>
                <p>Région: ${cityRegion}</p>
                <p>Population: ${cityPopulation}</p>
                <p>Distance: ${cityDistance} km</p>`;
        })
        .append("title")
        .text(d => `${d.name}, ${d.region}, Population: ${d.population}`);
    
        });
    
    
    function handleRegionClick(d) {
        const event = d3.event;
        const regionId = event.target.id;
        const regionName = event.target.getAttribute('name');
    
        fetch(`http://localhost:8080/cities?region=${regionName}`)
            .then(response => response.json())
            .then(allCities => {
                console.log(allCities)
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
    
    // d3.selectAll('path').on('click', handleRegionClick);
    // var circle = d3.selectAll(".circle");

    // circle.on("mouseenter", function() {
    //     d3.select(this).attr("fill", "#FF0000");
    // }) .on("mouseleave", function() {
    //     d3.select(this).attr("fill", "#8B0000");
    // });

    function updateCityList(cities) {
        const listElement = document.getElementById('list');
        listElement.innerHTML = `<h2>Résultats de la recherche</h2><ul id="citiesList"></ul>`;
        const citiesList = document.getElementById('citiesList');
        cities.forEach(city => {
            const cityItem = document.createElement('li');
            cityItem.textContent = city.name;
            citiesList.appendChild(cityItem);
        });
    }

    document.getElementById('search-btn').addEventListener('click', function() {
        const cityName = document.getElementById('search-input').value;
        if (cityName) {
            // Supprimer tous les cercles bleus existants de la carte SVG
            svg.selectAll(".pin").remove();
    
            fetch(`http://localhost:8080/cities`)
                .then(response => response.json())
                .then(data => {
                    console.log("data " + data)
                    const city = data.find(city => city.name.toLowerCase() === cityName.toLowerCase());
                    if (!city) {
                        console.log("entered")
                        document.getElementById('city-info').innerHTML = 'Aucune ville trouvée.';
                        return;
                    }
    
                    const distance = calculateDistance(userLatitude, userLongitude, city.latitude, city.longitude);
    
                    const cityInfoHTML = `
                        <h2>Informations:</h2>
                        <h3>${city.name}</h3>
                        <p>Latitude: ${city.latitude}</p>
                        <p>Longitude: ${city.longitude}</p>
                        <p>Région: ${city.region}</p>
                        <p>Population: ${city.population.toLocaleString()}</p>
                        <p>Distance de votre position: ${distance} km</p>
                    `;
                    document.getElementById('city-info').innerHTML = cityInfoHTML;
    
                    const { x, y } = convertCoordinates(city.longitude, city.latitude, width, height);
                        svg.append("path")
                        .attr("d", "M12 0c-5.514 0-10 4.486-10 10 0 6.109 9.225 13.197 9.501 13.445.147.15.348.238.561.238s.414-.088.561-.238c.276-.248 9.439-7.336 9.439-13.445 0-5.514-4.486-10-10-10zm0 14c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z")
                        .attr("fill", "red")
                        .classed("pin", true)
                        .attr("transform", `translate(${xScale(city.longitude)}, ${yScale(city.latitude)})`)
                        .append("title")
                        .text(city.name);
    
                    const populationFilter = document.getElementById('population-filter').value;
                    const distanceFilter = parseFloat(document.getElementById('distance-filter').value);
    
                    let filteredCities = data;

    
                    // Filtrer par population si une option est sélectionnée
                    if (populationFilter !== "0") {
                        const [minPopulation, maxPopulation] = populationFilter.split("-");
                        console.log("minPopulation " + minPopulation)
                        console.log("maxPopulation " + maxPopulation)
                        filteredCities = filteredCities.filter(city => { 
                            console.log(city)
                            if (maxPopulation) {
                                return city.population >= parseInt(minPopulation) && city.population <= parseInt(maxPopulation);
                            } else {
                                return city.population >= parseInt(minPopulation);
                            }
                        });
                        console.log(filteredCities);
                    } else if (populationFilter === "15000+") {
                        filteredCities = filteredCities.filter(city => city.population >= 15000);
                        console.log("15000+=", filteredCities);
                    }
    
                    // Filtrer par distance si une option est sélectionnée
                    if (distanceFilter !== 0) {
                        const cityPosition = { latitude: city.latitude, longitude: city.longitude };
                        filteredCities = filteredCities.filter(city => {
                            const cityDistance = calculateDistance(cityPosition.latitude, cityPosition.longitude, city.latitude, city.longitude);
                            return parseFloat(cityDistance) <= distanceFilter;
                        });
                    }
    
                    console.log(filteredCities)
                    // Mettre à jour l'affichage avec les résultats filtrés
                    updateCityList(filteredCities);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des villes:', error);
                });
        }
    });
    
});