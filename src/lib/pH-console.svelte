<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Play } from 'lucide-svelte';

	import Button from './components/ui/button/button.svelte';
	import Checkbox from './components/ui/checkbox/checkbox.svelte';
	import Label from './components/ui/label/label.svelte';

	import { checkedStore, phValueStore, probePosition } from './helpers/store';

	const dispatch = createEventDispatcher();

	function handleRemoveProbe() {
		probePosition.set(0); // Move the probe up
		dispatch('removeProbe'); // Emit an event for the parent component
	}

	function handleInsertProbe() {
		probePosition.set(1); // Move the probe down
		dispatch('insertProbe'); // Emit an event for the parent component
	}
</script>

<div
	id="ph-meter"
	class="border-2 bg-gray-200 w-full p-6 h-fit flex flex-col gap-5 border-gray-500 shadow-inner"
>
	<div
		class="flex justify-between items-center gap-4 bg-gray-300 shadow-inner rounded-md px-4 py-2"
	>
		<p class="text-lg">pH</p>
		<span class="text-2xl font-semibold">
			<!-- Display the pH value only when the probe is inside the liquid -->
			{$probePosition == 1 && $phValueStore !== undefined ? $phValueStore.toFixed(3) : '--'}
			<!-- {$phValueStore ? $phValueStore.toFixed(2) : '--'} -->
		</span>
	</div>
	<div class="flex items-center gap-2">
		<Checkbox
			disabled={$probePosition === 0}
			id="indicator-solution"
			bind:checked={$checkedStore}
		/>
		<Label for="indicator-solution" class="text-base">pH Indicator Solution</Label>
	</div>
	<div class="flex gap-2 flex-col w-full">
		<Button class="gap-2 text-base justify-between" on:click={handleRemoveProbe}>
			<span class="">Remove probe</span>
			<Play class="fill-white -rotate-90 size-5" />
		</Button>
		<Button class="gap-2 text-base justify-between" on:click={handleInsertProbe}>
			<span class="">Insert Probe</span>
			<Play class="fill-white rotate-90 size-5" />
		</Button>
	</div>
</div>

<style>
	#ph-meter {
		box-shadow:
			0 0 10px rgba(0, 0, 0, 0.05),
			8px 8px 10px rgba(0, 0, 0, 0.5);
		/* -webkit-transform: skewY(-1deg); */
		/* -moz-transform: skewY(-1deg); */
		/* -ms-transform: skewY(-1deg); */
		/* -o-transform: skewY(-1deg); */
		/* transform: skewY(-1deg); */
	}
</style>
