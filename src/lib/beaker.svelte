<script>
    let color = 'green'
</script>

<div id="container">
    <div id="beaker">
      <div id="liquid">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
      </div>
      <div class="measurement-container" style="bottom: -25px">
          <div class="measurement-line"></div>
        </div>
        <div class="measurement-container" style="bottom: 0px; right">
          <div class="measurement-line"></div>
          <div class="measurement-label" style="bottom: 45px; right: -110px; font-family: Arial, sans-serif; font-size: 18px;">
            10 mL</div>
        </div>
        <div class="measurement-container" style="bottom: 25px">
          <div class="measurement-line"></div>
        </div>
        <div class="measurement-container" style="bottom: 50px">
          <div class="measurement-line"></div>
          <div class="measurement-label" style="bottom: 45px; right: -110px; font-family: Arial, sans-serif; font-size: 18px;">
            20 mL</div>
        </div>
        <div class="measurement-container" style="bottom: 75px">
          <div class="measurement-line"></div>
    </div>
  </div>
</div>

<div style='--color:{color};'></div>

<style>
    #container {
  height: 270px;
  margin: 50px auto;
  overflow: hidden;
  position: relative;
  width: 248px;
}

#container div { position: absolute; }

#beaker {
  border: 10px solid #FFF;
  border-top: 0;
  border-radius: 0 0 30px 30px;
  height: 200px;
  left: 14px;
  bottom: 0;
  width: 200px;
  position: relative;
}

#beaker:before,
#beaker:after {
  border: 10px solid #FFF;
  border-bottom: 0;
  border-radius: 30px 30px 0 0;
  content: '';
  height: 30px;
  position: absolute;
  top: -40px;
  width: 30px;
}

#beaker:before { left: -50px; }
#beaker:after { right: -50px; }

#liquid {
  background-color: var(--color);
  border: 10px solid #000;
  border-radius: 0 0 20px 20px;
  bottom: 0;
  height: 170px;
  overflow: hidden;
  width: 180px;
}

#liquid:after {
  background-color: rgba(255, 255, 255, 0.25);
  bottom: -10px;
  content: '';
  height: 200px;
  left: -40px;
  position: absolute;
  transform: rotate(30deg);
  -webkit-transform: rotate(15deg);
  width: 110px;
}

#liquid .bubble {
  -webkit-animation-name: bubble;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  background-color: rgba(255, 255, 255, 0.2);
  bottom: 0;
  border-radius: 10px;
  height: 20px;
  width: 20px;
}

@-webkit-keyframes bubble {
  0% { bottom: 0; }

   50% {
     background-color: rgba(255, 255, 255, 0.2);
      bottom: 80px;
   }

   100% {
     background-color: rgba(255, 255, 255, 0);
      bottom: 160px;
   }
}

/* @for $i from 1 through 7 {
  .bubble:nth-child(#{$i}) {
    left: random(180) * 1px;
    -webkit-animation-delay: random() * 30ms;
    -webkit-animation-duration: (random(10) + 3) * 100ms;
    -webkit-transform: scale((random(10) + 3)/10);
  }
} */

.measurement-line {
  position: absolute;
  bottom: 50px; /* Adjust as needed */
  left: 0; /* Adjust to position the line on the left side */
  width: 50px; /* Line width */
  height: 5px; /* Line thickness */
  background-color: #FFF; /* Line color, assuming white */
}

.measurement-container {
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
}

.measurement-label {
  position: absolute;
  margin-left: 5px; /* Space between line and text */
  color: #FFF; /* Text color */
  font-size: 12px; /* Adjust size as needed */
}
</style>