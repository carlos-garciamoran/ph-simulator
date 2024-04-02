<script lang="ts">
	import ConcentrationSlider from './concentration-slider.svelte';
	import { menu } from './helpers/store';
	import AcidsMenu from './menus/acids.svelte';
	import BuffersMenu from './menus/buffers.svelte';
	import HouseholdItemsMenu from './menus/household-items.svelte';
	import MainMenu from './menus/main.svelte';
	import SaltsMenu from './menus/salts.svelte';
</script>

<div class="flex flex-col gap-4 justify-between">
	<div class="flex flex-col gap-4">
		<MainMenu bind:value={$menu} />
		{#if $menu === 'acids/bases'}
			<AcidsMenu />
		{:else if $menu === 'salts'}
			<SaltsMenu />
		{:else if $menu === 'buffers'}
			<BuffersMenu />
		{:else if $menu === 'household-items'}
			<HouseholdItemsMenu />
		{:else if $menu === 'water'}
			<h1>Water</h1>
		{/if}
	</div>
	{#if $menu !== 'water' && $menu !== 'household-items'}
		<ConcentrationSlider />
	{/if}
</div>
