var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value
document.getElementById("cup").style.backgroundPosition = "0 0";

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
    document.getElementById("cup").style.backgroundPosition = "0 0";
}

