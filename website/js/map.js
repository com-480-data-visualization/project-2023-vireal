let countryURL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"
let importJSON = "https://raw.githubusercontent.com/com-480-data-visualization/project-2023-vireal/master/data/map_data/map_yearly_imports.json"
let exportJSON = "https://raw.githubusercontent.com/com-480-data-visualization/project-2023-vireal/master/data/map_data/map_yearly_exports.json"
let importDecilesJSON = "https://raw.githubusercontent.com/com-480-data-visualization/project-2023-vireal/master/data/map_data/map_deciles_imports.json"
let exportDecilesJSON = "https://raw.githubusercontent.com/com-480-data-visualization/project-2023-vireal/master/data/map_data/map_deciles_exports.json"

let countryData
let importData
let exportData
let importDecilesData
let exportDecilesData

let tooltip = d3.select('#map_tooltip1')
let svg = d3.select("#map_canvas1");
let element = document.getElementById("map_canvas1");
let height = element.clientHeight;
let width = element.clientWidth;
window.addEventListener("resize", function() {
    height = element.clientHeight;
    width = element.clientWidth;
    drawMap();
});

const thresholds = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

let camelColorScale = d3.scaleLinear()
    .domain([1, 10])
    .range(["#f1c9ae", "#7e3909"]);
let camelColors = Array.from({length: 10}, (_, i) => camelColorScale(i + 1));
const camelColorGenerator = d3.scaleThreshold()
    .domain(thresholds)
    .range(camelColors);

let treetopColorScale = d3.scaleLinear()
    .domain([1, 10])
    .range(["#b3d09c", "#167e3b"]);
let treetopColors = Array.from({length: 10}, (_, i) => treetopColorScale(i + 1));
const treetopColorGenerator = d3.scaleThreshold()
    .domain(thresholds)
    .range(treetopColors);



function findDecile(data, year, value) {
    // First, sort the data for the specified year in ascending order
    const sortedData = data.sort((a, b) => a[year] - b[year]);

    // Then, find the interval where your value fits in
    for (let i = 0; i < sortedData.length - 1; i++) {
        if (sortedData[i][year] <= value && value < sortedData[i + 1][year]) {
            return sortedData[i].decile;
        }
    }

    // If the value is larger than the largest value in the data, return the decile of the last entry
    if (value >= sortedData[sortedData.length - 1][year]) {
        return sortedData[sortedData.length - 1].decile;
    }

    return 0.0;
}

function getCountryNameAndMetrics(countryDataItem) {
    let name = countryDataItem['properties']['name']
    let importCountry = importData.find((importCountryItem) => {
        return importCountryItem['country_name'] === name
    })
    let exportCountry = exportData.find((exportCountryItem) => {
        return exportCountryItem['country_name'] === name
    })

    let importQuantity = 0
    let exportQuantity = 0
    if (importCountry) {
        importQuantity = importCountry[window.i_year_map]
    }
    if (exportCountry) {
        exportQuantity = exportCountry[window.i_year_map]
    }

    if (name === "United States of America") {
        name = "USA"
    }

    return [name, importQuantity, exportQuantity]
}


function drawMap() {

    svg.selectAll('path').remove();

    let projection = d3.geoRobinson().fitSize([width, height], countryData)
    let path = d3.geoPath().projection(projection)

    svg.selectAll('path')
        .data(countryData.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'country')
        .attr('fill', (countryDataItem) => {
            const [name, importQuantity, exportQuantity] = getCountryNameAndMetrics(countryDataItem)

            if (importQuantity === 0 && exportQuantity === 0) {
                return `rgba(${255}, ${255}, ${255}, ${1})`
            } else if (exportQuantity > 0) {
                return treetopColorGenerator(findDecile(exportDecilesData, window.i_year_map, exportQuantity))
            } else {
                return camelColorGenerator(findDecile(importDecilesData, window.i_year_map, importQuantity))
            }
        })
        .attr('country-name', (countryDataItem) => {
            return countryDataItem['properties']['name']
        })
        .on('mouseover', function (event, countryDataItem) {
            const [name, importQuantity, exportQuantity] = getCountryNameAndMetrics(countryDataItem)
            tooltip.transition()
                .style('visibility', 'visible');
            if (importQuantity > 0) {
                tooltip.html('Country: <span class="map_country_name">' + name + '</span>. Import amount: ' + Math.trunc(importQuantity).toLocaleString() + ' tonnes');
            } else if (exportQuantity > 0) {
                tooltip.html('Country: <span class="map_country_name">' + name + '</span>. Export amount: ' + Math.trunc(exportQuantity).toLocaleString() + ' tonnes');
            } else {
                tooltip.html('Country: <span class="map_country_name">' + name);
            }

        })
        .on('mouseout', () => {
            tooltip.transition()
                .style('visibility', 'hidden')
        })
}

async function loadData() {
    try {
        let countryResponse = await d3.json(countryURL);
        countryData = topojson.feature(countryResponse, countryResponse.objects.countries);
        importData = await d3.json(importJSON);
        exportData = await d3.json(exportJSON);
        importDecilesData = await d3.json(importDecilesJSON);
        exportDecilesData = await d3.json(exportDecilesJSON);

        drawMap();
    } catch (error) {
        console.log(error);
    }
}

loadData();



function createLegend(colorsArray, label, id) {
    const legendMap = document.createElement('div');
    legendMap.id = id;
    legendMap.className = 'legend_map';

    colorsArray.slice().reverse().forEach((color, index) => {
        const colorElement = document.createElement('div');
        colorElement.style.backgroundColor = color;
        colorElement.style.width = '20px';
        colorElement.style.height = '20px';
        colorElement.style.display = 'inline-block';
        colorElement.style.marginRight = '5px';

        const labelElement = document.createElement('span');
        labelElement.textContent = `Top ${index + 1}0% ${label} `;

        const item = document.createElement('div');
        item.appendChild(colorElement);
        item.appendChild(labelElement);

        legendMap.appendChild(item);
    });

    return legendMap;
}

const legendContainer = document.getElementById('legend_container');
legendContainer.appendChild(createLegend(camelColors, 'consumers', 'legend_map1'));
legendContainer.appendChild(createLegend(treetopColors, 'producers', 'legend_map2'));

