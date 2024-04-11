<script lang="ts">
	import Console from '$lib/pH-console.svelte';
	import Menus from '$lib/menus.svelte';
	import Beaker from '$lib/beaker.svelte';
	import Probe from '$lib/probe.svelte';
	import Wire from '$lib/wire.svelte';
	import Dropper from '$lib/dropper.svelte';
	import DropperCounter from '@/dropper-counter.svelte';
	import { menu, probePosition } from '@/helpers/store';
	import DropperMenu from '@/menus/dropper-menu.svelte';

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
		
		<Wire />
		<Probe />
		{#if $menu === 'buffers' || $menu === 'water'}
			<div class="flex gap-4">
				<Dropper />
			</div>
		{/if}
		
	</div>
	<div class="console-counter-container">
		<Console on:insertProbe={insertProbe} on:removeProbe={removeProbe} />
		{#if $menu === 'buffers' || $menu === 'water'}
			<div class="flex gap-10 h-fit">
				<DropperMenu />
				<DropperCounter />
			</div>
		{/if}
	</div>
</div>

<style>
	.console-counter-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between; /* This will push the counter to the bottom */
		height: 100%; /* Full height to enable justify-content */
		/* Add any additional styling here */
	}
</style>
