<script lang="ts">
	import AcidsMenu from './menus/acids.svelte';
	import BuffersMenu from './menus/buffers.svelte';
	import SaltsMenu from './menus/salts.svelte';
	import HouseholdItemsMenu from './menus/household-items.svelte';
	import MainMenu from './menus/main.svelte';
	import ConcentrationSlider from './concentration-slider.svelte';

	let menu = 'acids/bases';
</script>

<div class="flex flex-col gap-4 justify-between">
	<div class="flex flex-col gap-4">
		<MainMenu bind:value={menu} />
		{#if menu === 'acids/bases'}
			<AcidsMenu />
		{/if}
		{#if menu === 'salts'}
			<SaltsMenu />
		{/if}
		{#if menu === 'buffers'}
			<BuffersMenu />
		{/if}
		{#if menu === 'household-items'}
			<HouseholdItemsMenu />
		{/if}
		{#if menu === 'water'}
			<h1>Water</h1>
		{/if}
	</div>
	<ConcentrationSlider />
</div>
