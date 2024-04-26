<script lang="ts">
	import { HistoryIcon, Play, UndoIcon } from 'lucide-svelte';

	import Button from './components/ui/button/button.svelte';
	import Checkbox from './components/ui/checkbox/checkbox.svelte';
	import Label from './components/ui/label/label.svelte';
	import { resetValues } from './helpers/reset';
	import { checkedStore, menu, phValueStore, probePosition } from './helpers/store';

	const handleRemove = () => {
		probePosition.set(0);
		checkedStore.set(false);
	};
</script>

<div class="wire-from-console"></div>
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
	<div class="flex items-center gap-2 pt-2">
		<Checkbox
			disabled={$probePosition === 0}
			id="indicator-solution"
			bind:checked={$checkedStore}
		/>
		<Label for="indicator-solution" class="text-base">pH Indicator Solution</Label>
	</div>
	<div class="flex gap-2 items-stretch pt-4">
		<div class="flex flex-col gap-2 w-1/2 2xl:w-3/4">
			<Button class="gap-2 text-base justify-between w-full" on:click={handleRemove}>
				Remove probe
				<Play class="fill-background -rotate-90 size-5 min-w-5" />
			</Button>
			<Button class="gap-2 text-base justify-between w-full" on:click={() => probePosition.set(1)}>
				Insert Probe
				<Play class="fill-background rotate-90 size-5 min-w-5" />
			</Button>
		</div>
		<div class="flex flex-col gap-2 w-1/2 2xl:w-1/4">
			<Button
				class="gap-2 text-base justify-between w-full h-full"
				on:click={() => {
					resetValues();
					menu.set('');
				}}
			>
				Reset
				<HistoryIcon class="text-background size-5 min-w-5" />
			</Button>
			<!-- <Button class="gap-2 text-base justify-between w-full" on:click={() => undefined}>
				Undo
				<UndoIcon class="text-background size-5 min-w-5" />
			</Button> -->
		</div>
	</div>
</div>

<style>
	#ph-meter {
		box-shadow:
			0 0 10px rgba(0, 0, 0, 0.05),
			8px 8px 10px rgba(0, 0, 0, 0.5);
	}

	.wire-from-console {
		position: absolute;
		top: 0px;
		left: 70%; /* Adjust to align the start point on the pH-console */
		height: 40px; /* Height from the pH-console to the top of the page */
		width: 7.5px; /* Thickness of the wire */
		background-color: #606060; /* Color of the wire */
		z-index: 3; /* Ensure the wire is behind other elements if necessary */
	}
</style>
