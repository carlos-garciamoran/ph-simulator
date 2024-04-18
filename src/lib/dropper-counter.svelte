<script lang="ts">
	import MenuCard from './components/menu-card.svelte';
	import { dropsCounter } from './helpers/store';
</script>

<MenuCard title="Drops Counter" className="w-full">
	<div class="flex flex-col">
		<p>HCl: {$dropsCounter.HCl}</p>
		<p>NaOH: {$dropsCounter.NaOH}</p>
	</div>
</MenuCard>
