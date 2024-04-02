<script lang="ts">
	import Console from '$lib/pH-console.svelte';
	import Menus from '$lib/menus.svelte';
	import Beaker from '$lib/beaker.svelte';
	import Probe from '@/probe.svelte';
	import { probePosition } from '@/helpers/store';

	// Functions to handle probe animation, based on the events from the Console
	function insertProbe() {
		probePosition.set(1); // Set the store value to indicate the probe should be down
	}

	function removeProbe() {
		probePosition.set(0); // Set the store value to indicate the probe should be up
	}
</script>

<div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 size-full p-6 lg:p-10">
	<Menus />
	<div class="">
		<Beaker />
		<!-- <Dropper /> -->
		<Probe />
	</div>
	<Console on:insertProbe={insertProbe} on:removeProbe={removeProbe} />
</div>
