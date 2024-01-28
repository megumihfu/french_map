function convertCoordinates(longitude, latitude, minLongitude, maxLongitude, minLatitude, maxLatitude, width, height) {
    const x = ((longitude - minLongitude) / (maxLongitude - minLongitude)) * width;
    const y = ((latitude - minLatitude) / (maxLatitude - minLatitude)) * height;
    return { x, y };
}

// Taille de votre carte SVG
const width = 1000;
const height = 700;

// Création de l'élément SVG
const svg = d3.select("#svg3811")
    .attr("width", width)
    .attr("height", height);

// Exemple de données (remplacez cela par votre logique de récupération de données)
fetch('http://localhost:8080/cities')
    .then(response => response.json())
    .then(data => {
        console.log('Données récupérées avec succès :', data);

        // Trouver les valeurs minimales et maximales
        let minLongitude = Number.MAX_VALUE;
        let maxLongitude = Number.MIN_VALUE;
        let minLatitude = Number.MAX_VALUE;
        let maxLatitude = Number.MIN_VALUE;

        data.forEach(city => {
            minLongitude = Math.min(minLongitude, city.longitude);
            maxLongitude = Math.max(maxLongitude, city.longitude);
            minLatitude = Math.min(minLatitude, city.latitude);
            maxLatitude = Math.max(maxLatitude, city.latitude);
        });

        console.log('minLongitude:', minLongitude);
        console.log('maxLongitude:', maxLongitude);
        console.log('minLatitude:', minLatitude);
        console.log('maxLatitude:', maxLatitude);

        // Ajout des cercles pour chaque ville
        data.forEach(city => {
            const { x, y } = convertCoordinates(city.longitude, city.latitude, minLongitude, maxLongitude, minLatitude, maxLatitude, width, height);

            const circle = svg.append("circle")
                .attr("cx", x)
                .attr("cy", y)
                .attr("r", 5)
                .attr("fill", "red");

            const title = circle.append("title")
                .text(city.nom);
        });
    })
    .catch(error => console.error('Erreur lors de la récupération des données :', error));