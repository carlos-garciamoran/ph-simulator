<!-- Wire structure -->
<div class="wire"></div>

<style>
	.wire {
		position: absolute;
		top: 0px; /* Adjust this to the wire's fixed starting point */
		left: 55%; /* Center the wire horizontally, adjust as needed */
		height: 550px; /* The fixed length of the wire */
		width: 7.5px; /* The thickness of the wire */
		background-color: #606060; /* Wire color */
		transform: translateX(-50%); /* Center the wire horizontally */
		z-index: 1; /* The wire should be behind the console and probe */
	}
</style>
