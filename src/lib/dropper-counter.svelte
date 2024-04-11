<script lang="ts">
  import { dropsCounter } from './helpers/store';

  let HClDrops = 0;
  let NaOHDrops = 0;

  // Reactively update the counters whenever the store changes
  $: if ($dropsCounter) {
    HClDrops = $dropsCounter.HCl;
    NaOHDrops = $dropsCounter.NaOH;
  }
</script>

<div class="dropper-counter">
  <h3>Drops Added:</h3>
  <div>
    <p>HCl: {HClDrops} mL</p>
    <p>NaOH: {NaOHDrops} mL</p>
  </div>
</div>
  
  <style>
    .dropper-counter {
      width: 25%;
      border: 2px solid #aaa; /* Match the ph-console border color */
      background-color: #fff; /* A lighter background */
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
      padding: 1rem; /* Consistent padding */
      margin-top: 1rem; /* Space from the above element */
      border-radius: 8px; /* Slight rounding of corners */
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Font similar to ph-console */
    }
  
    .dropper-counter h3 {
      color: #333; /* Dark text for the heading */
      margin-bottom: 0.5rem; /* Space below the heading */
    }
  
    .dropper-counter p {
      color: #555; /* Slightly lighter text for the counter */
      margin: 0.25rem 0; /* Space between counters */
    }
  </style>