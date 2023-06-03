let importFlowJSON = "https://raw.githubusercontent.com/com-480-data-visualization/project-2023-vireal/master/data/map_data/export_flow_data.json"
let importFlowData

let tooltip2 = d3.select('#map_tooltip2');
let svg2 = d3.select("#map_canvas2");
let element2 = document.getElementById("map_canvas2");
let height2 = element.clientHeight;
let width2 = element.clientWidth;
window.addEventListener("resize", function() {
    height2 = element2.clientHeight;
    width2 = element2.clientWidth;
    drawFlowMap();
});

let camelColor = #C19A6B

function drawFlowMap() {

    svg2.selectAll('path').remove();
    let projection = d3.geoRobinson().fitSize([width2, height2], countryData)
    let path = d3.geoPath().projection(projection)

    svg2.selectAll('path')
        .data(countryData.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'country')
        .attr('fill', (countryDataItem) => {
            const [name, isImport, isExport] = getCountryNameAndData(countryDataItem)

            if (isImport === 0 && isExport === 0) {
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
            const [name, importQuantity, exportQuantity] = getCountryNameAndData(countryDataItem)
            tooltip.transition()
                .style('visibility', 'visible');
            tooltip.html('Country: <span class="map_country_name">' + name + '</span>. Import amount: ' + Math.trunc(importQuantity).toLocaleString() + ' tonnes. Export amount: ' + Math.trunc(exportQuantity).toLocaleString() + ' tonnes');
        })
        .on('mouseout', (countryDataItem) => {
            tooltip.transition()
                .style('visibility', 'hidden')
        })
}




function createLegend(colorsArray, label, id){
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