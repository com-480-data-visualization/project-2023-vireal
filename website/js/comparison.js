const csvArabica = "https://raw.githubusercontent.com/com-480-data-visualization/project-2023-vireal/master/data/coffee_quality/arabica_data_cleaned.csv";
const csvRobusta = "https://raw.githubusercontent.com/com-480-data-visualization/project-2023-vireal/master/data/coffee_quality/robusta_data_cleaned.csv";

d3.csv(csvArabica).then(function (data) {
    loadQualityDBArabica(data, "arabica")
});
d3.csv(csvRobusta).then(function (data) {
    loadQualityDBRobusta(data, "robusta")
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