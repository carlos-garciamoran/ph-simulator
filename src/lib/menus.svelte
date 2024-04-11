<script lang="ts">
	import ConcentrationSlider from './concentration-slider.svelte';
	import { menu } from './helpers/store';
	import AcidsMenu from './menus/acids.svelte';
	import BuffersMenu from './menus/buffers.svelte';
	import DropperMenu from './menus/dropper-menu.svelte';
	import HouseholdItemsMenu from './menus/household-items.svelte';
	import MainMenu from './menus/main.svelte';
	import SaltsMenu from './menus/salts.svelte';
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
			<!-- <DropperMenu /> -->
			<ConcentrationSlider type="acid" />
			<ConcentrationSlider type="base" />
		{:else if $menu === 'household-items'}
			<HouseholdItemsMenu />
		{:else if $menu === 'water'}
			<!-- <DropperMenu /> -->
		{/if}
	</div>
</div>
