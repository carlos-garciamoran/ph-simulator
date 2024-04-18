<script lang="ts">
	import MenuCard from './components/menu-card.svelte';
	import { totalDrops, currentDropType } from './helpers/store';
</script>

<MenuCard title="Drops Counter" className="w-full">
	{#if $currentDropType.endsWith("HCl")}
		<p>HCl: {$totalDrops}</p>
	{:else}
		<p>NaOH: {$totalDrops}</p>
	{/if}
</MenuCard>
