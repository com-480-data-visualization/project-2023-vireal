// Create a div to hold the slider and output
let mapSliderContainer = document.getElementById('map_slider_container');
mapSliderContainer.style.textAlign = 'center';
mapSliderContainer.style.padding = '20px';

// Create slider
let mapSlider = document.createElement('input');
mapSlider.type = 'range';
mapSlider.min = 1990;
mapSlider.max = 2018;
mapSlider.value = 1990;
mapSlider.id = 'mapMyRange';
mapSliderContainer.appendChild(mapSlider);  // Append the slider to the new div

// Create output
let mapOutput = document.createElement('p');
mapOutput.id = 'mapDemo';
mapOutput.innerHTML = `Year: ${mapSlider.value}`;
mapSliderContainer.appendChild(mapOutput);  // Append the output to the new div

window.i_year_map = 1990
// Event listener
mapSlider.addEventListener('input', function() {
    mapOutput.innerHTML = `Year: ${this.value}`;
    window.i_year_map = this.value;
    drawMap()
});

// Get the mainContainer div and insert the new sliderContainer div as its first child
let mapContainer = document.getElementById('map_content');
mapContainer.insertBefore(mapSliderContainer, mapContainer.firstChild);