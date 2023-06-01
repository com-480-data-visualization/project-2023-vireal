// Load JSON data
d3.json('https://gist.githubusercontent.com/shacheeswadia/a20ba5b62cef306ccc1a8e8857e5316a/raw/0337b16fa8dc4de97263bc0a4ededf935a529c35/migration-data.json')
    .then(function (data) {
        // Creates SVG element
        var svg = d3.select('#canvas2')
            .append('svg')
            .attr('width', width)
            .attr('height', height)

        // Set settings for the map chart
        var map = svg.append('g')
            .attr('class', 'map');

        // Create helper function to create connector series
        var createSeries = function (name, data, color) {
            // Create connector series for destinations and customize them
            var connectorSeries = map.selectAll('.connector')
                .data(data)
                .enter()
                .append('path')
                .attr('class', 'connector')
                .attr('d', function (d) { /* Calculate path coordinates */ })
                .style('fill', color)
                .style('stroke', color)
                .style('stroke-width', 2);

            // Customize other properties of the connector series (hover, markers, labels, etc.)
            // ...

            // Return the connector series
            return connectorSeries;
        };

        // Create dataset in the required format from the data
        var dataSet = data.map(function (d) { return d; });

        // Create 6 series, filtering the data by the amount of migration numbers
        var series1 = createSeries(
            'Less than 16,000',
            dataSet.filter(filterFunction(0, 16000)),
            '#fed693'
        );
        var series2 = createSeries(
            '16,000 to 20,000',
            dataSet.filter(filterFunction(16000, 20000)),
            '#f5ad52'
        );
        var series3 = createSeries(
            '20,000 to 40,000',
            dataSet.filter(filterFunction(20000, 40000)),
            '#3fb8c5'
        );
        var series4 = createSeries(
            '40,000 to 50,000',
            dataSet.filter(filterFunction(40000, 50000)),
            '#1792c0'
        );
        var series5 = createSeries(
            'More than 50,000',
            dataSet.filter(filterFunction(50000, 1000000)),
            '#1c5eaa'
        );

        // Create legend
        var legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', 'translate(0,' + (height - 20) + ')');

        // Customize the legend
        // ...

        // Draw the chart
        // ...
    });

// Helper function to bind data field to the local variable
function filterFunction(val1, val2) {
    if (val2) {
        return function (d) {
            return val1 <= d.total && d.total < val2;
        };
    }
    return function (d) {
        return val1 <= d.total;
    };
}
