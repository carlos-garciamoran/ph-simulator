<script lang="ts">
	import { probeY } from './helpers/probe';
</script>

<div id="probe" style="transform: translateY({$probeY}px);">
	<!-- SVG for the Probe -->
	<svg width="100px" height="550px" viewBox="0 0 100 350" xmlns="http://www.w3.org/2000/svg">
		<!-- Pattern for Stripes -->
		<pattern id="stripes" patternUnits="userSpaceOnUse" width="4" height="4">
			<path
				d="M-1, 1 12, -2
				 M0,4 14,-4
				 M3,5 12,-2"
				style="stroke:#707070; stroke-width:1"
			/>
		</pattern>

		<!-- Probe Handle -->
		<rect x="30" y="0" width="40" height="200" fill="#c0c0c0" stroke="#707070" stroke-width="3" />
		<!-- Handle with Stripes -->
		<rect
			x="17.5"
			y="10"
			width="65"
			height="30"
			fill="url(#stripes)"
			stroke="#707070"
			stroke-width="2"
		/>
		<!-- Probe Tip -->
		<rect x="40" y="200" width="20" height="150" fill="#808080" stroke="#505050" stroke-width="2" />
		<!-- Probe Sensor -->
		<circle cx="50" cy="360" r="10" fill="#ffffff" stroke="#707070" stroke-width="2" />
	</svg>
</div>

<style>
	#probe {
		position: absolute; /* To position it correctly */
		top: 130px; /* Position above the beaker, adjust as needed */
		left: 50%; /* Center from the middle of the container */
		transform: translateX(-50%); /* Ensure the probe is centered horizontally */
		z-index: 10; /* Ensure it's above other elements */
		overflow: visible;
		transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1); /* Smooth transition for movement */
	}
</style>
