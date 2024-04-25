<script lang="ts">
	import ConcentrationSlider from './concentration-slider.svelte';
	import { menu, phValueStore, selectedSolutionStore } from './helpers/store';
	import AcidsMenu from './menus/acids.svelte';
	import BuffersMenu from './menus/buffers.svelte';
	import HouseholdItemsMenu from './menus/household-items.svelte';
	import MainMenu from './menus/main.svelte';
	import SaltsMenu from './menus/salts.svelte';

	$: if ($menu) {
		if ($menu === 'water') {
			$phValueStore = 7;
			selectedSolutionStore.set('Water');
		}
	}
</script>

<div class="flex flex-col gap-4 justify-between">
	<div class="flex flex-col gap-4">
		<MainMenu bind:value={$menu} />
		{#if $menu === 'acids/bases'}
			<AcidsMenu />
			<ConcentrationSlider type="normal" />
		{:else if $menu === 'salts'}
			<SaltsMenu />
			<ConcentrationSlider type="normal" />
		{:else if $menu === 'buffers'}
			<BuffersMenu />
			<ConcentrationSlider type="acid" />
			<ConcentrationSlider type="base" />
		{:else if $menu === 'household-items'}
			<HouseholdItemsMenu />
		{/if}
	</div>
</div>
