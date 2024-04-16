<script lang="ts">
	import { writable, get, type Writable } from 'svelte/store';

	import { dropVolume } from './helpers/constants';
	import {
		currentDrop,
		currentDropType,
		dropsCounter,
		totalVolume,
		totalDrops
	} from './helpers/store';
	import type { Drop } from './helpers/types';

	const drops: Writable<Drop[]> = writable([]);

	// Function to add a drop and update the counter
	function addDrop() {
		const currentDropValue = get(currentDrop);
		const currentDropStruct = get(currentDropType);

		totalDrops.update((currentTotal) => {
			if (currentTotal < 20) {
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
				dropsCounter.update((counts) => {
					const newCount =
						(counts[currentDropValue.type as keyof typeof counts] || 0) +
						currentDropValue.concentration;
					return { ...counts, [currentDropValue.type]: newCount };
				});

				// Update the UI
				drops.update((currentDrops) => {
					let newDrop: Drop = {
						id: Math.random(),
						cy: 0 // Starting y coordinate
					};
					return [newDrop, ...currentDrops];
				});

				return currentTotal + 1; // Increment the total drops
			} else {
				console.log('Maximum number of drops reached.');
				return currentTotal; // Return the current count without incrementing
			}
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
		<!-- Restored dropper visuals -->
		<rect x="15" y="60" width="20" height="90" fill="#ccc" stroke="#707070" stroke-width="1.5" />
		<rect
			x="21.5"
			y="150"
			width="7.5"
			height="20"
			fill="#ccc"
			stroke="#707070"
			stroke-width="1.5"
		/>
		<ellipse cx="25" cy="50" rx="20" ry="22.5" fill="#000" stroke="#00000" stroke-width="1.5" />
		<!-- Drops -->
		{#each $drops as drop (drop.id)}
			<circle
				cx="25"
				cy="170"
				r="3"
				fill=#c8cfdb
				class="drop"
				on:animationend={() => removeDrop(drop.id)}
			/>
		{/each}
	</svg>
</div>

<style>
	@keyframes drop {
		to {
			transform: translateY(400px);
		} /* Adjust based on UI */
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
