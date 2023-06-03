let countryURL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"
let importJSON = "https://raw.githubusercontent.com/com-480-data-visualization/project-2023-vireal/master/data/map_data/map_yearly_imports.json"
let exportJSON = "https://raw.githubusercontent.com/com-480-data-visualization/project-2023-vireal/master/data/map_data/map_yearly_exports.json"
let importFlowJSON = "https://raw.githubusercontent.com/com-480-data-visualization/project-2023-vireal/master/data/map_data/export_flow_data.json"

let countryData
let importData
let exportData
let importFlowData

let tooltip = d3.select('#map_tooltip2');
let svg = d3.select("#map_canvas2");
let rect = svg.node().getBoundingClientRect();
let width = rect.width;
let height = rect.height;

let camelColor = #C19A6B
let treetopColorScale = d3.scaleLinear()
    .domain([1, 10])
    .range(["#b3d09c", "#167e3b"]);
let treetopColors = Array.from({length: 10}, (_, i) => treetopColorScale(i + 1));


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


function drawFlowMap() {

    svg.selectAll('path').remove();
    console.log(camelColor)

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
            tooltip.html('Country: <span class="map_country_name">' + name + '</span>. Import amount: ' + Math.trunc(importQuantity).toLocaleString() + ' tonnes. Export amount: ' + Math.trunc(exportQuantity).toLocaleString() + ' tonnes');
        })
        .on('mouseout', (countryDataItem) => {
            tooltip.transition()
                .style('visibility', 'hidden')
        })
}

async function loadFlowData() {
    try {
        let countryResponse = await d3.json(countryURL);
        countryData = topojson.feature(countryResponse, countryResponse.objects.countries);
        console.log(countryData);

        importData = await d3.json(importJSON);
        console.log(importData);

        exportData = await d3.json(exportJSON);
        console.log(exportData);

        importFlowData = await d3.json(importFlowJSON);
        console.log(importFlowData);

        console.log("HEY")
        drawFlowMap();
    } catch (error) {
        console.log(error);
    }
}

loadFlowData();


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

const legendContainer = document.getElementById('legend_container2');
legendContainer.appendChild(createLegend(treetopColors, 'producers', 'legend_map2'));