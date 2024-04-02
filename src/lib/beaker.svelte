<script lang="ts">
	import { onMount } from 'svelte';
	import { phValueStore as pHValue, checkedStore } from './helpers/store';

	// Assuming the beaker height is known or dynamically determined
	let beakerHeight = 400;
	let beakerWidth = 400;

	// Define your measurements relative to the beaker's height
	let measurements = [
		{ position: beakerHeight / 6, label: '' }, // 1st line (bottom-most)
		{ position: (beakerHeight / 6) * 2, label: '10 mL' }, // 2nd line
		{ position: (beakerHeight / 6) * 3, label: '' }, // 3rd line
		{ position: (beakerHeight / 6) * 4, label: '20 mL' } // 4th line
	];

	$: $checkedStore, updatePHColor($pHValue);

	let color: string = '#e0e1e1';
	function updatePHColor(newPHValue: number) {
		if ($checkedStore) {
			color = getPHColor(newPHValue);
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
			return hex.length == 1 ? '0' + hex : hex;
		};

		return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
	}
</script>

<div class="justify-end items-center flex flex-col size-full">
	<div id="beaker">
		<div id="liquid" />
		{#each measurements as { position, label }}
			<div class="measurement-container" style="--position: {position}px;">
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
		border: 6px solid #000; /* This will create the beaker outline */
		border-radius: 0 0 20px 20px; /* Rounded bottom corners */
		margin: bottom;
		overflow: visible;
	}

	#liquid {
		background-color: var(--liquid-color);
		border-bottom-left-radius: 14px;
		border-bottom-right-radius: 14px;
		bottom: 0;
		position: absolute;
		height: calc(36.6%);
		width: 100%;
	}

	.measurement-line {
		width: 20%; /* Relative to measurement container width */
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
		width: 80px;
		left: 25%;
		bottom: -10px;
		font-size: 20px;
		color: black;
	}
</style>
