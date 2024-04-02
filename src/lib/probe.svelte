<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	import { probePosition } from './helpers/store';

	// Assuming the probe's starting Y position is 0 (fully raised)
	let startY = 0;
	// The Y position when the probe is fully lowered - change this to match your UI
	let endY = 325;

	// The reactive tweened store for smooth animations
	const probeY = tweened(startY, {
		duration: 500,
		easing: cubicOut
	});

	// Animate the probe moving down
	export function insertProbe() {
		probeY.set(endY); // Assuming 150px is halfway into the liquid
	}

	// Animate the probe moving up
	export function removeProbe() {
		probeY.set(startY);
	}

	// Listen for changes in the probePosition store
	$: $probePosition && insertProbe();
	$: $probePosition === 0 && removeProbe();
</script>

<div id="probe">
	<!-- SVG for the Probe -->
	<svg
		width="100px"
		height="350px"
		viewBox="0 0 100 350"
		xmlns="http://www.w3.org/2000/svg"
		style="transform: translateY({$probeY}px)"
	>
		<!-- Probe Handle -->
		<rect x="30" y="0" width="40" height="150" fill="#c0c0c0" stroke="#707070" stroke-width="3" />
		<!-- Probe Tip -->
		<rect x="40" y="150" width="20" height="160" fill="#808080" stroke="#505050" stroke-width="2" />
		<!-- Probe Sensor -->
		<circle cx="50" cy="295" r="5" fill="#ffffff" stroke="#707070" stroke-width="2" />
	</svg>
</div>

<style>
	#probe {
		position: absolute; /* To position it correctly */
		top: 250px; /* Position above the beaker, adjust as needed */
		left: 55%; /* Start from the center of the container */
		transform: translateX(-50%); /* Center the probe exactly */
		z-index: 10; /* Ensure it's above other elements */
		overflow: visible;
		transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1); /* Easing effect for the probe movement */
	}
</style>
