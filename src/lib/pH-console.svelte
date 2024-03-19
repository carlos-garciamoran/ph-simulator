<script lang="ts">
	import Button from "./components/ui/button/button.svelte";
	import Checkbox from "./components/ui/checkbox/checkbox.svelte";
	import ArrowUp from "./icons/arrow-up.svelte";
	import ArrowDown from "./icons/arrow-down.svelte";
	import Label from "./components/ui/label/label.svelte";
	import { phValueStore, checkedStore } from '@/utils/store';

	let checked = false;

	// TODO: implement
	function handleRemoveProbe() {
		console.log("Probe removed");
	}
	function handleInsertProbe() {
		console.log("Probe removed");
	}
</script>

<div class="border rounded-2xl w-full mx-auto p-6 h-fit flex flex-col gap-3">
	<div class="flex justify-between items-center">
		<p>Current pH</p>
		<span id="phValue" class="bg-secondary rounded-md text-2xl px-3 py-2 font-semibold">
			{$phValueStore}
		</span>
	</div>
	<div class="flex items-center gap-2">
		<Checkbox id="indicator-solution" bind:checked={$checkedStore} />
		<Label for="indicator-solution">pH Indicator Solution</Label>
	</div>
	<div class="flex gap-2 mx-auto flex-col w-full justify-center mt-4">
		<Button class="gap-2" on:click={handleRemoveProbe}>
			Remove probe
			<svelte:component this={ArrowUp} />
		</Button>
		<Button class="gap-2" on:click={handleInsertProbe}>
			Insert Probe
			<svelte:component this={ArrowDown} />
		</Button>
	</div>
</div>
