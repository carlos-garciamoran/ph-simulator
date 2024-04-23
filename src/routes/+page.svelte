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
	import TotalVolume from '@/total-volume.svelte';

	let hasHitBreakpoint = false;
	function handleResize() {
		hasHitBreakpoint = window.innerWidth < 1024;
	}

	// Functions to handle probe animation, based on the events from the Console
	function insertProbe() {
		probePosition.set(1); // Set the store value to indicate the probe should be down
	}

	function removeProbe() {
		probePosition.set(0); // Set the store value to indicate the probe should be up
	}
</script>

<svelte:window on:resize={handleResize} />

{#if hasHitBreakpoint}
	<div class="flex flex-col items-center justify-center h-full">
		<p class="text-2xl">Please use a larger screen to view this simulation.</p>
	</div>
{:else}
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
	</div>
{/if}
