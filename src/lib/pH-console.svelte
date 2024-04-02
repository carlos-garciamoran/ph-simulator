<script lang="ts">
	import Button from './components/ui/button/button.svelte';
	import Checkbox from './components/ui/checkbox/checkbox.svelte';
	import Label from './components/ui/label/label.svelte';

	import { checkedStore, phValueStore, probePosition } from './helpers/store';
	import ArrowUp from './icons/arrow-up.svelte';
	import ArrowDown from './icons/arrow-down.svelte';

	// Event dispatcher for custom events
	import { createEventDispatcher } from 'svelte';
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

<div class="border rounded-2xl w-full mx-auto p-6 h-fit flex flex-col gap-3">
	<div class="flex justify-between items-center">
		<p>Current pH</p>
		<span id="phValue" class="bg-secondary rounded-md text-2xl px-3 py-2 font-semibold">
			{$phValueStore.toFixed(2)}
		</span>
	</div>
	<div class="flex items-center gap-2">
		<Checkbox id="indicator-solution" bind:checked={$checkedStore} />
		<Label for="indicator-solution">pH Indicator Solution</Label>
	</div>
	<div class="flex gap-2 mx-auto flex-col w-full justify-center mt-4">
		<Button class="gap-2" on:click={handleRemoveProbe}>
			<ArrowUp />
			Remove probe
		</Button>
		<Button class="gap-2" on:click={handleInsertProbe}>
			<ArrowDown />
			Insert Probe
		</Button>
	</div>
</div>
