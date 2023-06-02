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

let tooltip = d3.select('#tooltip1')

let baseColorRust = [183, 65, 14]
let baseColorCamel = [154, 123, 86]
let baseColorTreetop = [34, 139, 34]
let alphaStep = 0.05
let colorArrayImport = []
let colorArrayExport = []

for (let i = 0; i < 20; i++) {
    let currentAlpha = Math.max(1 - i * alphaStep, 0);
    colorArrayImport.push(`rgba(${baseColorRust[0]}, ${baseColorRust[1]}, ${baseColorRust[2]}, ${currentAlpha})`)
    colorArrayExport.push(`rgba(${baseColorTreetop[0]}, ${baseColorTreetop[1]}, ${baseColorTreetop[2]}, ${currentAlpha})`)
}


let svg = d3.select("#canvas1");
let rect = svg.node().getBoundingClientRect();
let width = rect.width;
let height = rect.height;

let drawMap = () => {

    let projection = d3.geoRobinson().fitSize([width, height], countryData)
    let path = d3.geoPath().projection(projection)

    svg.selectAll('path')
        .data(countryData.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'country')
        .attr('fill', (countryDataItem) => {
            let name = countryDataItem['properties']['name']
            let importCountry = importData.find((importCountryItem) => {
                return importCountryItem['country_name'] === name
            })
            let exportCountry = exportData.find((exportCountryItem) => {
                return exportCountryItem['country_name'] === name
            })

            if (importCountry) {
                let importTopNumber = importCountry['top_number']
                return colorArrayImport[importTopNumber - 1]

            } else if (exportCountry) {
                let exportTopNumber = exportCountry['top_number']
                return colorArrayExport[exportTopNumber - 1]

            } else {
                return `rgba(${255}, ${255}, ${255}, ${1})`
            }
        })
        .attr('country-name', (countryDataItem) => {
            return countryDataItem['properties']['name']
        })
        .attr('import-export-amount', (countryDataItem) => {
            let name = countryDataItem['properties']['name']
            let importCountry = importData.find((importCountryItem) => {
                return importCountryItem['country_name'] === name
            })
            let exportCountry = importData.find((exportCountryItem) => {
                return exportCountryItem['country_name'] === name
            })

            if (importCountry) {
                return importCountry['average']

            } else if (exportCountry) {
                return importCountry['average']
            } else {
                return 0
            }
        })
        .on('mouseover', function (event, countryDataItem) {
            let name = countryDataItem['properties']['name'];
            let importCountry = importData.find((importCountryItem) => {
                return importCountryItem['country_name'] === name;
            });
            let exportCountry = exportData.find((exportCountryItem) => {
                return exportCountryItem['country_name'] === name;
            });

            let importExportAmount = 0;
            if (importCountry) {
                importExportAmount = importCountry['average'];
            } else if (exportCountry) {
                importExportAmount = exportCountry['average'];
            }

            tooltip.transition()
                .style('visibility', 'visible');
            tooltip.text('Country: ' + name + ', Import/Export Amount: ' + importExportAmount);
        })
        .on('mouseout', (countryDataItem) => {
            tooltip.transition()
                .style('visibility', 'hidden')
        })
}

d3.json(countryURL).then(
    (data, error) => {
        if(error){
            console.log(error)
        }else{
            countryData = topojson.feature(data, data.objects.countries)
            console.log(countryData)

            d3.json(importJSON).then(
                (data, error) => {
                    if(error){
                        console.log(error)
                    }else{
                        importData = data
                        console.log(importData)

                        d3.json(exportJSON).then(
                            (data, error) => {
                                if(error){
                                    console.log(error)
                                }else{
                                    exportData = data
                                    console.log(exportData)
                                    drawMap()
                                }
                            }
                        )
                    }
                }
            )
        }
    }
)