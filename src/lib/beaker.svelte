<script lang="ts">
    import { onMount } from 'svelte';

    let pHValue: number = 7; // Example initial value
    let color: string;

    interface Bubble {
        left: number;
        animationDelay: string;
        animationDuration: string;
        scale: number;
  }

    let bubbles: Bubble[] = [];

    onMount(() => {
        bubbles = generateBubbles();
    });

    onMount(() => {
        color = getPHColor(pHValue);
        document.documentElement.style.setProperty('--liquid-color', color);
    });

    function generateBubbles(): Bubble[] {
        return Array.from({ length: 7 }, (): Bubble => ({
        left: Math.random() * 180, // Keep as a number, don't append 'px'
        animationDelay: `${Math.random() * 30}ms`, // String, correctly typed
        animationDuration: `${Math.random() * (1300 - 100) + 100}ms`, // String, correctly typed
        scale: Math.random() * (1.3 - 0.7) + 0.7, // Number, correctly typed
        }));
    }


    function getPHColor(pHValue: number): string {
        if (pHValue < 0 || pHValue > 14) {
            return "#FFFFFF"; // Default or error color
        }
        if (pHValue < 3) {
            return "#FF0000"; // Red
        } else if (pHValue < 6) {
            return "#FFA500"; // Orange
        } else if (pHValue < 7) {
            return "#FFFF00"; // Yellow
        } else if (pHValue === 7) {
            return "#008000"; // Green
        } else if (pHValue < 9) {
            return "#0000FF"; // Blue
        } else {
            return "#800080"; // Purple
        }
    }
    
    // // Update the CSS variable with the calculated color
    // // document.documentElement.style.setProperty('--liquid-color', color);
    </script>

<div id="container">
    <div id="beaker">
      <div id="liquid">
        {#each bubbles as {left, animationDelay, animationDuration, scale}}
            <div class="bubble"
                 style="left: {left}px;
                        animation-delay: {animationDelay};
                        animation-duration: {animationDuration};
                        transform: scale({scale});">
            </div>
        {/each}
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

<div style="--liquid-color: {color};"></div>


<style lang="css">
:root {
  --liquid-color: #008000; /* Default color, e.g., green for neutral pH */
}

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
  border: 10px solid #000;
  border-bottom: 0;
  border-radius: 30px 30px 0 0;
  content: '';
  height: 30px;
  position: absolute;
  top: -8000px;
  width: 30px;
}

#beaker:before { left: -50px; }
#beaker:after { right: -50px; }

#liquid {
  background-color: var(--liquid-color);
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
  transform: rotate(15deg);
  width: 110px;
}

#liquid .bubble {
  animation-name: bubble;
  animation-name: bubble;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  background-color: rgba(255, 255, 255, 0.2);
  bottom: 0;
  border-radius: 10px;
  height: 20px;
  width: 20px;
}

@keyframes bubble {
    0% { 
        bottom: 0; 
        opacity: 1;
    }

    50% {
      background-color: rgba(255, 255, 255, 0.2);
      bottom: 80px;
    }

    100% {
      background-color: rgba(255, 255, 255, 0);
      bottom: 100%;
      opacity: 0;
    }
  }

.measurement-line {
  position: absolute;
  bottom: 50px; /* Adjust as needed */
  left: 0; /* Adjust to position the line on the left side */
  width: 50px; /* Line width */
  height: 5px; /* Line thickness */
  background-color: #000; /* Line color, assuming white */
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
  color: #000; /* Text color */
  font-size: 12px; /* Adjust size as needed */
}
</style>