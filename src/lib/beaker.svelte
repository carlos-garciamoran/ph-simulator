<script lang="ts">
	import SubscriptLabel from './components/subscript-label.svelte';
	import { defaultColor } from './helpers/constants';
	import {
		concentration,
		checkedStore,
		menu,
		phValueStore,
		selectedSolutionStore
	} from './helpers/store';

	let beakerHeight = 400;

	// Define your measurements relative to the beaker's height
	let measurements = [
		{ position: beakerHeight / 6, label: '' }, // 1st line (bottom-most)
		{ position: (beakerHeight / 6) * 2, label: '10 mL' }, // 2nd line
		{ position: (beakerHeight / 6) * 3, label: '' }, // 3rd line
		{ position: (beakerHeight / 6) * 4, label: '20 mL' } // 4th line
	];

	let measurementPositions = {
		'10mL': '25%',
		'20mL': '75%'
	};

	// Reactive statement to update the color
	$: color = $checkedStore ? getPHColor($phValueStore) : defaultColor;

	// Update the --liquid-color variable whenever the 'color' variable changes
	$: if (typeof document !== 'undefined') {
		document.documentElement.style.setProperty('--liquid-color', color);
	}

	function getPHColor(pHValue: number): string {
		if (pHValue < 0 || pHValue > 14) {
			return defaultColor; // Default or error color
		}

		let r = 0;
		let g = 0;
		let b = 0;

		if (pHValue <= 2) {
			// Red
			r = 255;
			g = 0;
			b = 0;
		} else if (pHValue <= 6) {
			// Transition from red to yellow
			r = 255; // Red stays at max
			g = Math.floor((255 * (pHValue - 2)) / 4); // Green ramps up from 0 to 255
			b = 0; // Blue stays at 0
		} else if (pHValue < 8) {
			// Yellow to Green
			r = Math.floor(255 - (255 * (pHValue - 6)) / 2); // Red decreases to 0
			g = 255; // Green stays at max
		} else if (pHValue <= 11) {
			// Green to Blue
			r = 0; // Red is 0
			g = Math.floor(255 - (255 * (pHValue - 8)) / 3); // Green decreases to 0
			b = Math.floor((255 * (pHValue - 8)) / 3); // Blue ramps up to max
		} else {
			// Blue to Purple
			r = Math.floor((127 * (pHValue - 11)) / 3); // Red ramps up to a mid-value
			g = 0; // Green is 0
			b = 255; // Blue stays at max
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

<div class=" relative flex justify-center items-center h-8 -top-4">
	<!-- TODO: label under beaker should give full description of contents including whether is it strong, weak, or the Ka, etc. -->
	<p>
		<SubscriptLabel title={$selectedSolutionStore} />
		{!!$concentration && $selectedSolutionStore && $menu !== 'water' ? `${$concentration}M` : ''}
	</p>
</div>

<div style="--liquid-color: {color};"></div>

<style lang="css">
	:root {
		--liquid-color: #e0e1e1; /* Default color */
	}

	#beaker {
		width: 20vw; /* Adjust the width based on the viewport width */
		height: 60vw; /* Height is twice the width to maintain a 1:2 aspect ratio */
		max-height: 400px; /* Maximum height can be set to prevent it from getting too tall */
		position: relative;
		border: 6px solid black;
		border-radius: 0 0 20px 20px;
		top: -20px;
	}

	#liquid {
		position: absolute;
		background-color: var(--liquid-color);
		border-bottom-left-radius: 14px;
		border-bottom-right-radius: 14px;
		bottom: 0;
		height: calc(100% / 6 * 2 + 6px);
		width: 100%;
	}

	.measurement-line {
		width: 20%; /* Relative to measurement container width */
		height: 5px; /* Thickness of the line */
		background-color: black; /* Line color */
		position: absolute;
		bottom: 0; /* Align to the bottom of measurement container */
	}

	.measurement-container {
		position: absolute;
		width: 100%;
		bottom: var(--position); /* Position from bottom, using CSS variable */
		left: 0;
	}

	.measurement-label {
		position: absolute;
		width: 80px;
		left: 25%;
		bottom: -10px;
		font-size: 1.25em;
		color: black;
	}
</style>
