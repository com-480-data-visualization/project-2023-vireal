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
        plugins: {
            legend: {
        display: false // Hide the legend
      }
    },
      responsive: true,
     scales: {
  r: {
    grid: {
      color: '#d9bc90', // Set the color of the grid lines
      lineWidth: 4, // Set the thickness of the grid lines
    },
    min: 1,
    max: 100,
    ticks: {
      fontSize: 20,
      stepSize: 10
    },
    pointLabels: {
        display: true,
          fontSize: 120,
          fontStyle: 'bold',
          color: ['#593a25','#593a25','#593a25','#593a25','#593a25','#593a25'] // Set different colors for each label
        }
  },
}
    }
  });

  chart.data.datasets[0] = {
      label: "Select a Variety",
      data: [0,0,0,0,0,0],
      fill: true,
      backgroundColor: "rgba(255, 250, 240, 0.4)",
      borderColor: "#c2a374",
      pointBackgroundColor: "rgba(158, 138, 106, 1)",
      pointBorderColor: "#c2a374",
      pointHoverBackgroundColor: "#c2a374",
      pointHoverBorderColor: "rgba(158, 138, 106, 1)"
    };
      chart.update();


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
      backgroundColor: "rgba(255, 250, 240, 0.4)",
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

var s = document.getElementById("dataset-selector");
var varietyTxt = document.getElementById("variety_name");
s.addEventListener('change', function() {
    if (s.value === "Other") {
         varietyTxt.textContent = " Average of other varieties in the database";
    } else {
        varietyTxt.textContent = "Taste profile of the " +s.value+ " variety";
    }

});

