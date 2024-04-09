<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
  
	// Define a type for the drop
	type Drop = {
	  id: number;
	  cy: number;
	};
  
	// Use the type in the writable store initialization
	const drops: Writable<Drop[]> = writable([]);
  
	// Function to add a drop
	function addDrop() {
	  drops.update(currentDrops => {
		let newDrop: Drop = {
		  id: Math.random(), // Unique ID for key tracking
		  cy: 0 // Starting y coordinate
		};
		return [newDrop, ...currentDrops];
	  });
	}
  
	// Function to handle the animation end of a drop
	function removeDrop(id: number) {
	  drops.update(currentDrops => {
		return currentDrops.filter(drop => drop.id !== id);
	  });
	}
  </script>
  
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div id="dropper-container" on:click={addDrop}>
	<svg
	  class="dropper"
	  width="200"
	  height="700"
	  viewBox="0 0 50 350"
	  xmlns="http://www.w3.org/2000/svg"
	>
	  <!-- Dropper -->
	  <!-- Bigger --><rect x="15" y="60" width="20" height="90" fill="#ccc" stroke="#707070" stroke-width="1.5" />
	  <!-- Smaller --><rect x="21.5" y="150" width="7.5" height="20" fill="#ccc" stroke="#707070" stroke-width="1.5" />
	  <ellipse cx="25" cy="50" rx="20" ry="22.5" fill="#000" stroke="#00000" stroke-width="1.5"/>
  
	  <!-- Drops -->
	  {#each $drops as drop (drop.id)}
		<circle
		  cx="25"
		  cy="170"
		  r="3"
		  fill="gray"
		  class="drop"
		  on:animationend={() => removeDrop(drop.id)}
		/>
	  {/each}
	</svg>
  </div>
  
  <style>
	@keyframes drop {
	  to { transform: translateY(400px); } /* Adjust the final position based on your UI */
	}
  
	.dropper {
	  position: absolute;
	  left: calc(50% - 180px); /* Adjust so it's left of the probe */
	  top: 170px; /* Adjust so it's at the same height as the probe */
	}
  
	.drop {
	  animation: drop 2s ease-out forwards;
	}
  </style>
  