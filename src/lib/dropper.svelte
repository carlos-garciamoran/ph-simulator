<script lang="ts">
	import { writable, get, type Writable } from 'svelte/store';

	import { dropVolume } from './helpers/constants';
	import {
		currentDrop,
		currentDropType,
		totalVolume,
		totalDrops,
		menu,
		phValueStore
	} from './helpers/store';
	import type { Drop } from './helpers/types';
	import { get_water_pH } from './helpers/calculations';

	const drops: Writable<Drop[]> = writable([]);

	// Function to add a drop and update the counter
	function addDrop() {
		const currentDropValue = get(currentDrop);
		const currentDropStruct = get(currentDropType);

		totalDrops.update((currentTotal) => {
			if (currentTotal >= 20) {
				console.log('Maximum number of drops reached.');
				return currentTotal; // Return the current count without incrementing
			}

			// Get the type
			if (currentDropStruct === '.01M-HCl' || currentDropStruct === '.1M-HCl') {
				currentDropValue.type = 'HCl';
			} else if (currentDropStruct === '.01M-NaOH' || currentDropStruct === '.1M-NaOH') {
				currentDropValue.type = 'NaOH';
			}

			// Get the molarity count
			if (currentDropStruct === '.01M-HCl' || currentDropStruct === '.01M-NaOH') {
				currentDropValue.concentration = 0.01;
			} else if (currentDropStruct === '.1M-HCl' || currentDropStruct === '.1M-NaOH') {
				currentDropValue.concentration = 0.1;
			}

			// Update the respective stores only if the currentTotal is less than 20
			totalVolume.update((currentVolume) => currentVolume + dropVolume);

			currentDrop.set(currentDropValue);

			// Update the UI
			drops.update((currentDrops) => {
				let newDrop: Drop = {
					id: Math.random(),
					cy: 0 // Starting y coordinate
				};
				return [newDrop, ...currentDrops];
			});

			const newTotalDrops = currentTotal + 1;

			// Update the pH for water
			if ($menu === 'water') {
				const new_pH = get_water_pH(newTotalDrops, $currentDrop);
				phValueStore.set(new_pH);
			}

			return newTotalDrops; // Increment the total drops
		});
	}

	// Function to handle the animation end of a drop
	function removeDrop(id: number) {
		drops.update((currentDrops) => currentDrops.filter((drop) => drop.id !== id));
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- Dropper SVG and animation -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="dropper-container" on:click={addDrop}>
	<svg
		class="dropper"
		width="200"
		height="700"
		viewBox="0 0 50 350"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect
			x="15"
			y="60"
			width="20"
			height="90"
			fill="lightblue"
			stroke="#707070"
			stroke-width="1.5"
		/>
		<rect
			x="21.5"
			y="150"
			width="7.5"
			height="20"
			fill="#ccc"
			stroke="#707070"
			stroke-width="1.5"
		/>
		<ellipse
			cx="25"
			cy="50"
			rx="20"
			ry="22.5"
			fill="deepskyblue"
			stroke="gray"
			stroke-width="1.5"
		/>
		<!-- Drops -->
		{#each $drops as drop (drop.id)}
			<circle
				cx="25"
				cy="170"
				r="3"
				fill="deepskyblue"
				class="drop"
				on:animationend={() => removeDrop(drop.id)}
			/>
		{/each}
	</svg>
</div>

<style>
	@keyframes drop {
		to {
			transform: translateY(450px);
		}
	}

	.dropper {
		position: absolute;
		left: calc(50% - 180px); /* Adjust so it's left of the probe */
		top: 120px; /* Adjust so it's at the same height as the probe */
	}

	.drop {
		animation: drop 2s ease-out forwards;
	}
</style>
