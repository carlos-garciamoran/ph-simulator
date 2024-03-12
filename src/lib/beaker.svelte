<script lang="ts">
  import { onMount } from 'svelte';
  import { phValueStore as pHValue } from './utils/store';

  const borderWidth = 6;

    // Assuming the beaker height is known or dynamically determined
    let beakerHeight = 400;
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

    $: updatePHColor($pHValue);

    let color: string;
    function updatePHColor(newPHValue: number) {
      color = getPHColor(newPHValue);
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--liquid-color', color);
      }
    }

    function getPHColor(pHValue: number): string {
    if (pHValue < 0 || pHValue > 14) {
        return "#f9fafb"; // Default or error color
    }

    let r: number = 0;
    let g: number = 0;
    let b: number = 0;

    if (pHValue < 3) {
        // Red to Orange
        r = 255;
        g = Math.floor(105 + (150 / 3) * pHValue);
    } else if (pHValue < 6) {
        // Orange to Green
        r = Math.floor(255 - (255 / 3) * (pHValue - 3));
        g = Math.floor(105 + (150 / 3) * (pHValue - 3));
    } else if (pHValue == 7) {
        // Neutral Green
        r = 0;
        g = 255;
        b = 0;
    } else if (pHValue < 11) {
        // Green to Blue
        g = Math.floor(255 - (255 / 4) * (pHValue - 7));
        b = Math.floor((255 / 4) * (pHValue - 7));
    } else {
        // Blue to Purple
        r = Math.floor((255 / 3) * (pHValue - 11));
        g = 0;
        b = 255;
    }

    // Convert RGB to Hex
    const toHex = (c: number): string => {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
</script>

<div class="flex flex-col justify-end h-full">
    <div id="beaker" style="height: {beakerHeight}px; width: {beakerWidth}px; border: {borderWidth}px;">
      <div id="liquid" style="height: {liquidHeight}px; width: {liquidWidth}px;">
        <!-- {#each bubbles as {left, animationDelay, animationDuration, scale}}
            <div class="bubble"
                 style="left: {left}px;
                        animation-delay: {animationDelay};
                        animation-duration: {animationDuration};
                        transform: scale({scale});">
            </div>
        {/each} -->
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
  --liquid-color: #bdbdbd; /* Default color, e.g., green for neutral pH */
}

#beaker {
  border-top: 0;
  border-radius: 0 0 30px 30px;
  left: 15px;
  right: 15px;
  bottom: 0;
  position: relative;
}

#liquid {
  background-color: var(--liquid-color);
  border: 10px solid #000;
  border-radius: 0 0 20px 20px;
  bottom: 0;
  overflow: hidden;
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
  width: calc(100% - 30px); /* Line width relative to the beaker width */
  height: 7.5px; /* Line thickness */
  background-color: #000; /* Line color, assuming black */
  position: absolute;
  bottom: 0; /* Align the line to the bottom of the beaker */
  left: 15px; /* Align the line with the left edge of the beaker */
}

.measurement-container {
  position: relative;
}

.measurement-label {
  position: absolute;
  width: 150px; /* Fixed width */
  left: calc(50% + 35px); /* Position label horizontally at center + 35px from the beaker left edge */
  bottom: 5px; /* Distance from the bottom of the beaker */
  color: #000; /* Label color */
  font-size: 24px; /* Font size */
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; /* Font family */
}
</style>