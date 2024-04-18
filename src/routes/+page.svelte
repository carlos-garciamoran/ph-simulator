<script lang="ts">
	import Console from '$lib/pH-console.svelte';
	import Menus from '$lib/menus.svelte';
	import Beaker from '$lib/beaker.svelte';
	import Probe from '$lib/probe.svelte';
	import Wire from '$lib/wire.svelte';
	import Dropper from '$lib/dropper.svelte';
	import DropperCounter from '@/dropper-counter.svelte';
	import { menu, probePosition, hasError } from '@/helpers/store';
	import DropperMenu from '@/menus/dropper-menu.svelte';
	import TotalVolume from '@/total-volume.svelte';

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
	<div class="beaker-column">
		<Beaker />
		<!-- <Wire /> -->
		<Probe />
		{#if $menu === 'buffers' || $menu === 'water'}
			<Dropper />
		{/if}
	</div>
	<div class="flex flex-col justify-between h-full">
		<Console on:insertProbe={insertProbe} on:removeProbe={removeProbe} />
		<div class="flex gap-2 2xl:gap-4 h-fit">
			{#if $menu === 'buffers' || $menu === 'water'}
				<DropperMenu />
				<DropperCounter />
				<TotalVolume />
			{:else}
				<div class="w-full" />
				<TotalVolume />
			{/if}
		</div>
	</div>
	{#if $hasError == true}
		<div>
			<p>Error! Buffer capacity exceeded!</p>
		</div>
	{/if}
</div>

<style>
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
	}

	@media (min-width: 1024px) {
		/* Tailwind's lg breakpoint */
		.grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 3rem;
		}
	}

	.beaker-column {
		margin-bottom: 20px;
	}
</style>
