<script lang="ts">
	import { consoleAttachmentPoint } from './helpers/store';
	import { onMount } from 'svelte';
  
	let wireElement: HTMLElement;
	let wireExtensionElement: HTMLElement;
	
	console.log(consoleAttachmentPoint);

	// Reactive update for wire positioning based on console attachment point
	$: if ($consoleAttachmentPoint && wireExtensionElement) {
	  updateWirePosition();
	}
  
	function updateWirePosition() {
	  if (typeof window !== 'undefined') {
		const wireRect = wireElement.getBoundingClientRect();
		const startX = wireRect.right - (wireRect.width / 2); 
  
		// Set the left position to start from the middle of the wire and adjust width to reach the console's x position
		wireExtensionElement.style.left = `${startX}px`;
		wireExtensionElement.style.width = `${$consoleAttachmentPoint.x}px`;
  
		// Ensure the wire extension does not go backwards if the console is to the left of the starting point
		if ($consoleAttachmentPoint.x < startX) {
		  wireExtensionElement.style.transform = 'translateX(0%)';
		} else {
		  wireExtensionElement.style.transform = 'translateX(0%)';
		}
	  }
	}
  
	onMount(() => {
	  if (wireElement && wireExtensionElement) {
		updateWirePosition();
	  }
	});
  </script>
  
  <!-- Wire structure -->
  <div bind:this={wireElement} class="wire"></div>
  <div bind:this={wireExtensionElement} class="wire-extension"></div>

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
		top: 85px;
		right: 0px; /* Start where the current wire ends */
		height: 7.5px; /* The thickness of the wire, same as the vertical part */
		background-color: #606060; /* Same color as the wire */
		z-index: 1; /* Ensure it is at the same level as the wire */
	}
</style>
