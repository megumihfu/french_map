function convertCoordinates(longitude, latitude, width, height) {
    const x = (longitude + 180) * (width / 360);
    const y = (90 - latitude) * (height / 180);
    return { x, y };
}

const width = 995;
const height = 960;

const svg = d3.select("#svg3811")
    .attr("width", width)
    .attr("height", height);

fetch('http://localhost:8080/cities')
    .then(response => response.json())
    .then(data => {
        console.log('Données récupérées correctement :', data);

    let minLongitude = -5; 
    let maxLongitude = 10; 
    let minLatitude = 41; 
    let maxLatitude = 51;
    
    const xScale = d3.scaleLinear()
        .domain([minLongitude, maxLongitude])
        .range([49, width]);
    
    const yScale = d3.scaleLinear()
        .domain([minLatitude, maxLatitude])
        .range([height, 57]);

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
    .catch(error => console.error('Erreur de recup des données :', error));