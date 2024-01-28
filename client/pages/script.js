function convertCoordinates(longitude, latitude, width, height) {
    const x = (longitude + 180) * (width / 360);
    const y = (90 - latitude) * (height / 180);
    return { x, y };
}

const width = 1400;
const height = 1200;

const svg = d3.select("#svg2")
    .attr("width", width)
    .attr("height", height);

fetch('http://localhost:8080/cities')
    .then(response => response.json())
    .then(data => {
        console.log('Données récupérées avec succès :', data);

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

    const xScale = d3.scaleLinear()
    .domain([minLongitude, maxLongitude])
    .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([minLatitude, maxLatitude])
        .range([height, 0]);

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.longitude))
        .attr("cy", d => yScale(d.latitude))
        .attr("r", 5)
        .attr("fill", "red")
        .append("title")
        .text(d => d.nom);
    })
    .catch(error => console.error('Erreur lors de la récupération des données :', error));