<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pipette</title>
<style>
  body, html {
    height: 100%;
    margin: 0;
  }

  .container {
    position: relative;
    height: 50%; /* Make the container take half the height of the window */
  }

  .pipette {
    width: 50px;
    height: 200px;
    background-color: white; /* White background */
    border: 2px solid black; /* Black border */
    border-radius: 25px; /* Half of the width */
    position: absolute;
    top: 50%; /* Center vertically */
    left: 50%; /* Center horizontally */
    transform-origin: center; /* Set the transformation origin to the center */
    transform: translate(-50%, -50%) rotate(90deg); /* Rotate 90 degrees clockwise */
  }
</style>
</head>
<body>

<div class="container">
  <div class="pipette" id="pipette"></div>
</div>

<script>
  // JavaScript to handle click event on the pipette
  document.addEventListener('DOMContentLoaded', function() {
    const pipette = document.getElementById('pipette');
    
    pipette.addEventListener('click', function() {
      // Change color of the pipette when clicked
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      pipette.style.backgroundColor = randomColor;
    });
  });
</script>

</body>
</html>
