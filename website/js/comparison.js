const csvArabica = "https://raw.githubusercontent.com/com-480-data-visualization/project-2023-vireal/master/data/coffee_quality/arabica_data_cleaned.csv";
const csvRobusta = "https://github.com/com-480-data-visualization/project-2023-vireal/blob/master/data/coffee_quality/robusta_data_cleaned.csv";

d3.csv(csvArabica).then(function(data) {loadQualityDB(data,"arabica")});
d3.csv(csvRobusta).then(function(data) {loadQualityDB(data,"robusta")});

loadQualityDB = function(data,name) {
  // Extract the columns we're interested in
  const columns = ["Aroma","Flavor","Aftertaste","Acidity","Body","Balance","Sweetness"];
  const columnData = data.map(function(d) {
    return columns.map(function(column) {
      return parseFloat(d[column]);
    });
  });

  // Compute the means of each column
  const means = columns.map(function(column, i) {
    const values = columnData.map(function(row) {
      return row[i];
    });
    const sum = d3.sum(values);
    return { name: column, mean: (sum / values.length).toFixed(2) };
  });

  // Output the means to a textarea element
  const json_quality = d3.select(name);
  json_quality.text(JSON.stringify(means));
};