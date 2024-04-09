<!-- wire.svelte -->
<div class="wire">
    <div class="wire-extension"></div>
</div>

<style>
  .wire {
    position: absolute;
    top: 85px; /* Adjust this to the wire's fixed starting point */
    left: 55%; /* Center the wire horizontally, adjust as needed */
    height: 500px; /* The fixed length of the wire */
    width: 7.5px; /* The thickness of the wire */
    background-color: #606060; /* Wire color */
    transform: translateX(-50%); /* Center the wire horizontally */
    z-index: 1; /* The wire should be behind the console and probe */
  }

  .wire-extension {
    position: absolute;
    top: 0; /* Start at the top of the current wire */
    left: 100%; /* Start where the current wire ends */
    width: 215px; /* The length of the extension to the right */
    height: 7.5px; /* The thickness of the wire, same as the vertical part */
    background-color: #606060; /* Same color as the wire */
    z-index: 1; /* Ensure it is at the same level as the wire */
  }

</style>
