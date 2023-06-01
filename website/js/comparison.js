const csvArabica = "https://raw.githubusercontent.com/com-480-data-visualization/project-2023-vireal/master/data/coffee_quality/arabica_data_cleaned.csv";
const csvRobusta = "https://raw.githubusercontent.com/com-480-data-visualization/project-2023-vireal/master/data/coffee_quality/robusta_data_cleaned.csv";
const csvPrice = "https://raw.githubusercontent.com/com-480-data-visualization/project-2023-vireal/master/data/prices_historical/coffee-prices-historical-chart-data.csv";

d3.csv(csvArabica).then(function (data) {
    loadQualityDBArabica(data, "arabica")
});
d3.csv(csvRobusta).then(function (data) {
    loadQualityDBRobusta(data, "robusta")
});
d3.csv(csvPrice).then(function (data) {
    updatePrice(data)
});

loadQualityDBArabica = function (data, name) {
    // Extract the columns we're interested in
    const columns = ["Aroma", "Flavor", "Aftertaste", "Acidity", "Body", "Balance", "Sweetness"];
    const columnData = data.map(function (d) {
        return columns.map(function (column) {
            return parseFloat(d[column]);
        });
    });

    // Compute the means of each column
    const means = columns.map(function (column, i) {
        const values = columnData.map(function (row) {
            return row[i];
        });
        const sum = d3.sum(values);
        return {name: column, mean: (sum / values.length).toFixed(2)};
    });

    console.log(means);
    console.log((means[0].mean - 7) * 100 );
    document.getElementById("aroma_arabica").value = (means[0].mean - 7) * 100 ;
    document.getElementById("taste_arabica").value = (means[2].mean - 7) * 100 ;
    document.getElementById("acidity_arabica").value = (means[3].mean - 7) * 100 ;
    document.getElementById("body_arabica").value = (means[1].mean - 7) * 100 ;
    document.getElementById("balance_arabica").value = (means[5].mean - 7) * 100 ;
    document.getElementById("sweetness_arabica").value = (means[6].mean - 7) * 100 ;

};

loadQualityDBRobusta = function (data, name) {
    // Extract the columns we're interested in
    const columns = ["Aroma", "Flavor", "Aftertaste", "Acidity", "Body", "Balance", "Sweetness"];
    const columnData = data.map(function (d) {
        return columns.map(function (column) {
            return parseFloat(d[column]);
        });
    });

    // Compute the means of each column
    const means = columns.map(function (column, i) {
        const values = columnData.map(function (row) {
            return row[i];
        });
        const sum = d3.sum(values);
        return {name: column, mean: (sum / values.length).toFixed(2)};
    });

    console.log(means);
    console.log((means[0].mean - 7) * 100 );
    document.getElementById("aroma_robusta").value = (means[0].mean - 7) * 100 ;
    document.getElementById("taste_robusta").value = (means[2].mean - 7) * 100 ;
    document.getElementById("acidity_robusta").value = (means[3].mean - 7) * 100 ;
    document.getElementById("body_robusta").value = (means[1].mean - 7) * 100 ;
    document.getElementById("balance_robusta").value = (means[5].mean - 7) * 100 ;
    document.getElementById("sweetness_robusta").value = (means[6].mean - 7) * 100 ;
};

updatePrice = function (data){
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");

    var yearData = {}; // Object to store mean values per year
    data.forEach(function(entry) {
        var year = entry.date.split("-")[0]; // Extract year from the date
        var value = parseFloat(entry.value); // Convert value to a numeric value
        if (!yearData.hasOwnProperty(year)) {
            yearData[year] = []; // Create an array for the year if it doesn't exist
        }
        yearData[year].push(value); // Add value to the year's array
    });

    // Calculate the mean value per year
    var meanData = {};
    for (var year in yearData) {
        var values = yearData[year];
        var sum = values.reduce(function(acc, val) { return acc + val; }, 0);
        var mean = sum / values.length;
        meanData[year] = mean;
    }

// Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        var year = 1973 + parseInt(this.value, 10); // Adjust as needed based on your slider value
        document.getElementById("year").value = year;
        var meanValue = meanData[year];
        if(meanValue < 1){
            var pos = 10;
        }
        else{
            var pos = 10 + (meanValue - 1) * 100;
        }

        document.getElementById("cup").style.backgroundPosition = "0 " + pos + "px";

        // Get the style sheet
        var styleSheet = document.styleSheets[0];

// Find the keyframes rule
        var keyframesRule;
        for (var i = 0; i < styleSheet.cssRules.length; i++) {
            var rule = styleSheet.cssRules[i];
            if (rule.name === 'filling') {
                keyframesRule = rule;
                break;
            }
        }

// Update the background-position values
        if (keyframesRule) {
            var keyframes = keyframesRule.cssRules;

            // Update 0% keyframe
            var zeroPercent = keyframes[0];
            zeroPercent.style.backgroundPosition = "100px " + pos + "px"; // Modify the values as desired

            // Update 50% keyframe
            var fiftyPercent = keyframes[1];
            //fiftyPercent.style.backgroundPosition = '300px 200px'; // Modify the values as desired
        }

    }
}




