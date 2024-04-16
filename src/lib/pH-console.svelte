<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { HistoryIcon, Play, UndoIcon } from 'lucide-svelte';

	import Button from './components/ui/button/button.svelte';
	import Checkbox from './components/ui/checkbox/checkbox.svelte';
	import Label from './components/ui/label/label.svelte';

	import { checkedStore, menu, phValueStore, probePosition } from './helpers/store';
	import { resetValues } from './helpers/reset';
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
			{$probePosition === 1 && !!$phValueStore
				? $menu === 'household-items'
					? $phValueStore.toFixed(2)
					: $phValueStore.toFixed(3)
				: '--'}
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
	<div class="flex gap-2">
		<div class="flex flex-col gap-2 w-3/4">
			<Button class="gap-2 text-base justify-between w-full" on:click={() => probePosition.set(0)}>
				Remove probe
				<Play class="fill-background -rotate-90 size-5" />
			</Button>
			<Button class="gap-2 text-base justify-between w-full" on:click={() => probePosition.set(1)}>
				Insert Probe
				<Play class="fill-background rotate-90 size-5" />
			</Button>
		</div>
		<div class="flex flex-col gap-2 w-1/4">
			<Button class="gap-2 text-base justify-between w-full" on:click={() => resetValues()}>
				Reset
				<HistoryIcon class="text-background size-5" />
			</Button>
			<Button class="gap-2 text-base justify-between w-full" on:click={() => undefined}>
				Undo
				<UndoIcon class="text-background size-5" />
			</Button>
		</div>
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
