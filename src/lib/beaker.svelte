<script lang="ts">
  import { onMount } from 'svelte';
  import { phValueStore as pHValue, checkedStore } from './utils/store';

  const borderWidth = 6;

    // Assuming the beaker height is known or dynamically determined
    let beakerHeight = 400;
    let beakerWidth = 400;  
    // let liquidHeight: number = (2/6) * beakerHeight;
    // let liquidWidth: number = beakerWidth - (borderWidth * 2);

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

    $: $checkedStore, updatePHColor($pHValue);

    let color: string;
    let defualtColor = '#e0e1e1';
    function updatePHColor(newPHValue: number) {
      if ($checkedStore) {
        color = getPHColor(newPHValue);
      } else {
        color = defualtColor; // Default or no indicator color
      }
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--liquid-color', color);
      }
    }

    function getPHColor(pHValue: number): string {
    if (pHValue < 0 || pHValue > 14) {
        return defualtColor; // Default or error color
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

    // Fix for values between 6 and 7
    if (6 <= pHValue && pHValue < 7) {
      r = Math.floor(255 * (7 - pHValue)); // Red decreases from 255 to 0
      g = 255; // Green stays at 255
      b = 0; // Blue remains 0
    }
    const toHex = (c: number): string => {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
</script>

<div class="justify-end items-center flex flex-col size-full">
  <div id="beaker">
    <div id="liquid" style="background-color: {color};"></div>
      {#each measurements as {position, label}}
        <div class="measurement-container" 
          style="--position: {position}px;">
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
  height: 40%; /* Relative to container */
  width: 60%;
  position: relative;
  border: 10px solid #000; /* This will create the beaker outline */
  border-top: none; /* Remove top border if you want an open beaker */
  border-radius: 0 0 20px 20px; /* Rounded bottom corners */
  margin: bottom;
  align-items: center;
  display: flex;
  justify-content: center;
  overflow: visible;
}

/* #beaker::before,
#beaker::after {
  content: '';
  display: block;
  position: absolute;
  top: 10px; 
  width: 40px; 
  height: 30px; 
  background: #fff; 
  border: 10px solid #000;
  border-bottom: none;
  border-radius: 50%;
}

#beaker::before {
  left: -5px; 
  transform: translateX(-50%) translateY(-50%); 
  border-right: none;
}

#beaker::after {
  right: -5px; 
  transform: translateX(-50%) translateY(-50%); 
  border-left: none;
} */

#liquid {
  height: calc(36.5%); /* 2/3 of beaker height */
  width: 100%; /* Full width of beaker */
  position: absolute;
  bottom: 0; /* Align to the bottom of the beaker */
  background-color: var(--liquid-color); /* Use the CSS variable for color */
}

.measurement-line {
  width: 25%; /* Relative to measurement container width */
  height: 5px; /* Thickness of the line */
  background-color: #000; /* Line color */
  position: absolute;
  bottom: 0; /* Align to the bottom of measurement container */
}

.measurement-container {
  position: absolute;
  width: 100%; /* Full width of beaker */
  bottom: var(--position); /* Position from bottom, using CSS variable */
  left: 0;
}

.measurement-label {
  position: absolute;
  width: 150px; /* Fixed width */
  left: 28%; /* Position label to the right */
  bottom: -15px; /* Align with the measurement line */
  color: #000; /* Label color */
  font-size: 24px; /* Font size */
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; /* Font family */
}


</style>