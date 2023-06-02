// Read the CSV file

// Set up the radar chart inside the chart container

// Set up the chart container
var chartContainer = d3.select("#radar-chart").node()

var ctx = chartContainer.getContext('2d');


d3.dsv("|","https://raw.githubusercontent.com/com-480-data-visualization/project-2023-vireal/master/data/filtered_varieties.csv").then(function(csvData) {

  // Parse the CSV data and convert it into an array of objects
  var data = csvData.map(function(d) {
    return {
      Variety: d.Variety,
      Aroma: +d.Aroma,
      Aftertaste: +d.Aftertaste,
      Flavor: +d.Flavor,
      Balance: +d.Balance,
      Sweetness: +d.Sweetness,
      Acidity: +d.Acidity
    };
  });

  var columnNames = data.map(function(d) { return d[Object.keys(d)[0]]; });
  // Populate the selector with the column names
  var selector = d3.select('#dataset-selector');
  selector.selectAll('option')
    .data(columnNames)
    .enter()
    .append('option')
    .text(function(d) { return d; });

  // Register the SVG plugin
  Chart.register({
    id: "svg",
    beforeDraw: function(chart) {
      var ctx = chart.ctx;
      ctx.clearRect(0, 0, chart.width, chart.height);
    },
    beforeInit: function(chart, args, options) {
      options.animation = false;
      options.responsive = false;
      options.plugins = {
        legend: false,
        tooltip: false
      };
      options.devicePixelRatio = 1;
    }
  });

  var chart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: ['Aroma', 'Aftertaste', "Flavor", "Balance", "Sweetness", "Acidity"],
      datasets: []
    },
    options: {
      responsive: true,
      scales: {
        r: {
          grid: {
        color: ['#dbbe91']
      },
          min: 1,
          max: 100,
          ticks: {
            stepSize: 10
          }
        }
      }
    }
  });


// Event listener for the dataset selector
  selector.on('change', function() {
    var selectedValue = selector.property('value');
    var datarow;
    for (let i = 0; i < data.length ; i++) {
        if (data[i].Variety === selectedValue){
            datarow = data[i]
            break;
        }
    }
    chart.data.datasets[0] = {
      label: datarow.Variety,
      data: [datarow.Aroma, datarow.Aftertaste, datarow.Flavor, datarow.Balance, datarow.Sweetness, datarow.Acidity],
      fill: true,
      backgroundColor: "rgba(224, 209, 186, 0.2)",
      borderColor: "#c2a374",
      pointBackgroundColor: "rgba(158, 138, 106, 1)",
      pointBorderColor: "#c2a374",
      pointHoverBackgroundColor: "#c2a374",
      pointHoverBorderColor: "rgba(158, 138, 106, 1)"
    };
      chart.update();
  });
}).catch(function(error) {
  console.log("Error loading CSV file:", error);
});
