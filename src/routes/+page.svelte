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

<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 size-full p-6 lg:p-10">
	<Menus />
	<div>
		<Beaker />
		<Wire />
		<Probe />
		{#if $menu === 'buffers' || $menu === 'water'}
			<Dropper />
		{/if}
	</div>
	<div class="flex flex-col justify-between h-full">
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
	}

	@media (max-width: 640px) {
		.console-counter-container {
			flex-direction: row; /* Or 'column' if that fits better */
		}
	}

	/* page.svelte */
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Adjust min size as needed */
		gap: 1rem;
		padding: 1rem;
	}

	@media (min-width: 640px) {
		/* Tailwind's sm breakpoint */
		.grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem;
		}
		.console-counter-container {
			flex-direction: row; /* Or 'column' if that fits better */
		}
	}

	@media (min-width: 1024px) {
		/* Tailwind's lg breakpoint */
		.grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 3rem;
		}
	}
</style>
