let countryURL2 = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"
let importFlowJSON = "https://raw.githubusercontent.com/com-480-data-visualization/project-2023-vireal/master/data/map_data/export_flow_data.json"
let exportJSON2 = "https://raw.githubusercontent.com/com-480-data-visualization/project-2023-vireal/master/data/map_data/map_yearly_exports.json"
let importFlowData
let countryData2
let exportData2

let tooltip2 = d3.select('#map_tooltip2');
let svg2 = d3.select("#map_canvas2");

let element2 = document.getElementById("map_canvas2");
let height2 = element2.clientHeight;
let width2 = element2.clientWidth;
window.addEventListener("resize", function() {
    height2 = element2.clientHeight;
    width2 = element2.clientWidth;
    drawFlowMap();
});

let treetopColorScale2 = d3.scaleLinear()
    .domain([1, 10])
    .range(["#b3d09c", "#167e3b"]);
let treetopColors2 = Array.from({length: 10}, (_, i) => treetopColorScale2(i + 1));

let availableList = false
let currentExportList = []

function getCountryNameAndData(countryDataItem) {
    let name = countryDataItem['properties']['name']
    let importCountry = importFlowData.find((importFlowCountryItem) => {
        return importFlowCountryItem['country_name'] === name
    })
    let exportCountry = exportData2.find((exportCountryItem) => {
        return exportCountryItem['country_name'] === name
    })

    let isImport = 0
    let exportCountries = []
    if (importCountry) {
        isImport = 1
        for (var i = 1; i <= 10; i++) {
            exportCountries.push(importCountry[i]);
        }
    }
    let isExport = 0;
    if(exportCountry) {
        isExport = 1;
    }



    if (name === "United States of America") {
        name = "USA"
    }

    return [name, isImport, isExport, exportCountries]
}


function drawFlowMap() {

    svg2.selectAll('path').remove();
    let projection = d3.geoRobinson().fitSize([width2, height2], countryData2)
    let path = d3.geoPath().projection(projection)

    svg2.selectAll('path')
        .data(countryData.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'country')
        .attr('fill', () => {
            return `rgba(${255}, ${255}, ${255}, ${1})`
        })
        .attr('country-name', (countryDataItem) => {
            return countryDataItem['properties']['name']
        })
        .on('mouseover', function (event, countryDataItem) {
            const [name, isImport, isExport, exportList] = getCountryNameAndData(countryDataItem)
            tooltip2.transition()
                .style('visibility', 'visible');
            if(isExport === 1) {
                tooltip2.html('Country: <span class="map_country_name">' + name + ' (exporter)');
            } else {
                tooltip2.html('Country: <span class="map_country_name">' + name);
            }
            if(isImport === 1) {
                let i = 0
                exportList.forEach(function(country) {
                    let color = treetopColors2[treetopColors2.length - 1 -i]
                    i += 1
                    svg2.selectAll('path')
                        .filter(function(d) { return d.properties.name === country; })
                        .attr('fill', color);
                })
                currentExportList = exportList
                availableList = true
                createLegend2(treetopColors2, 'exporter', 'legend_map_2')
            }
        })
        .on('mouseout', function () {
            d3.select(this)
                .attr('fill', `rgba(${255}, ${255}, ${255}, ${1})`);
            tooltip2.transition()
                .style('visibility', 'hidden')
            currentExportList.forEach(function(country) {
                svg2.selectAll('path')
                    .filter(function(d) { return d.properties.name === country; })
                    .attr('fill', `rgba(${255}, ${255}, ${255}, ${1})`);
            })
            availableList = false
            createLegend2(treetopColors2, 'exporter', 'legend_map_2')
        })
}


async function loadFlowData() {
    try {
        let countryResponse = await d3.json(countryURL2);
        countryData2 = topojson.feature(countryResponse, countryResponse.objects.countries);
        exportData2 = await d3.json(exportJSON2);
        importFlowData = await d3.json(importFlowJSON);
        drawFlowMap();
    } catch (error) {
        console.log(error);
    }
}

loadFlowData();


function createLegend2(colorsArray, label, id){
    let legendMap = document.getElementById(id);
    if (!legendMap) {
        // Create only if it doesn't exist
        legendMap = document.createElement('div');
        legendMap.id = id;
        legendMap.className = 'legend_map_2';
    } else {
        // If it already exists, clear its contents
        while (legendMap.firstChild) {
            legendMap.removeChild(legendMap.firstChild);
        }
    }

    colorsArray.slice().reverse().forEach((color, index) => {
        const colorElement = document.createElement('div');
        colorElement.style.backgroundColor = color;
        colorElement.style.width = '20px';
        colorElement.style.height = '20px';
        colorElement.style.display = 'inline-block';
        colorElement.style.marginRight = '5px';

        const labelElement = document.createElement('span');
        if (availableList) {
            labelElement.textContent = `Top ${index+1}: ${currentExportList[index]}`;
        } else {
            labelElement.textContent = `Top ${index + 1}0% ${label} `;
        }

        const item = document.createElement('div');
        item.appendChild(colorElement);
        item.appendChild(labelElement);

        legendMap.appendChild(item);
    });

    return legendMap;
}

const legendContainer2 = document.getElementById('legend_container2');
const newLegend = createLegend2(treetopColors2, 'exporter', 'legend_map_2');
legendContainer2.appendChild(newLegend);
