<script lang="ts">
    import { onMount } from 'svelte';
	import Label from './components/ui/label/label.svelte';

    const borderWidth = 10;

    // Assuming the beaker height is known or dynamically determined
    let beakerHeight = 400; // Example, adjust based on your actual dynamic value
    let beakerWidth = 400;
    
    let liquidHeight: number = (2/3) * beakerHeight;
    let liquidWidth: number = beakerWidth - (borderWidth * 2);

    // Define your measurements relative to the beaker's height
    let measurements = [
        { position: beakerHeight / 6, label: '' }, // 1st line (bottom-most)
        { position: (beakerHeight / 6) * 2, label: '10 mL' }, // 2nd line
        { position: (beakerHeight / 6) * 3, label: '' }, // 3rd line
        { position: (beakerHeight / 6) * 4, label: '20 mL' }, // 4th line
        { position: (beakerHeight / 6) * 5, label: '' }, // 5th line (top-most, adjust if it goes out of beaker)
    ]; 

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

    function generateBubbles(): Bubble[] {
        return Array.from({ length: 7 }, (): Bubble => ({
        left: Math.random() * 180, // Keep as a number, don't append 'px'
        animationDelay: `${Math.random() * 30}ms`, // String, correctly typed
        animationDuration: `${Math.random() * (1300 - 100) + 100}ms`, // String, correctly typed
        scale: Math.random() * (1.3 - 0.7) + 0.7, // Number, correctly typed
        }));
    }

    let pHValue: number = 7; // Example initial value
    let color: string;

    onMount(() => {
        color = getPHColor(pHValue);
        document.documentElement.style.setProperty('--liquid-color', color);
    });

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
      </div>
    {#each measurements as {position, label}}
        <div class="measurement-container" 
             style="bottom: {position}px;">
            <div class="measurement-line"></div>
            {#if label}
            <div class="measurement-label">{label}</div>
            {/if}
        </div>
    {/each}
    </div>
</div>

<div style="--liquid-color: {color};"></div>


<style lang="css">
:root {
  --liquid-color: #008000; /* Default color, e.g., green for neutral pH */
}

#container {
  height: 600px;
  margin: 50px auto;
  overflow: hidden;
  position: relative;
  width: 400px;
}

#container div { position: absolute; }

#beaker {
  border: 10px solid #FFF;
  border-top: 0;
  border-radius: 0 0 30px 30px;
  height: 400px;
  left: 14px;
  bottom: 0;
  width: 400px;
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
  top: -40px;
  width: 30px;
}

#beaker:before { left: -50px; }
#beaker:after { right: -50px; }

#liquid {
  background-color: var(--liquid-color);
  border: 10px solid #000;
  border-radius: 0 0 20px 20px;
  bottom: 0;
  height: calc(2/3 * 600px);
  overflow: hidden;
  width: calc(100% - 20px);
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
  width: 100px; /* Line width */
  height: 7.5px; /* Line thickness */
  background-color: #000; /* Line color, assuming white */
  position: absolute;
}

.measurement-container {
  position: relative;
  left: 0;
}

.measurement-label {
  position: absolute;
  width: 150px;
  left: 110px;
  top: -15px;
  color: #000;
  font-size: 24px;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>